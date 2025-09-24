import asyncHandler from 'express-async-handler';
import { checkSchema, validationResult } from 'express-validator';
import schemaMfrApplication from './definitions/schemaMfrApplication.js';

const schemas = {
  manufacturer: schemaMfrApplication,
};
const parseValidationErrors = (errorsArray) =>
  errorsArray.reduce((acc, err) => {
    const [selector, errorMsg] = err.msg.split('___');
    acc.push({ selector, msg: errorMsg });
    return acc;
  }, []);

const validateApplicationMiddleware = asyncHandler(async (req, res, next) => {
  const schemaKey = req.body.dataKey?.trim().toLowerCase();
  const schema = schemas[schemaKey];
  if (!schema)
    throw new Error(`Validation Schema with schemaKey: ${schemaKey} not found (validateApplicationMiddleware)`);
  await Promise.all(checkSchema(schema).map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) req.body.errors = parseValidationErrors(errors.array());
  else req.body.success = true;
  return next();
});

const validateApplicationDirect = async (req) => {
  try {
    const schemaKey = req.body.dataKey?.trim().toLowerCase();
    const schema = schemas[schemaKey];
    if (!schema)
      throw new Error(`Validation Schema with schemaKey: ${schemaKey} not found (validateApplicationDirect)`);
    await Promise.all(checkSchema(schema).map((validation) => validation.run(req)));
    const errors = validationResult(req);
    return errors.isEmpty() ? { success: true } : { success: false, errors: parseValidationErrors(errors.array()) };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
};

export { validateApplicationMiddleware, validateApplicationDirect };
