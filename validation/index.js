import asyncHandler from 'express-async-handler';
import { checkSchema, validationResult } from 'express-validator';
import schemaMfrRegistration from './definitions/schemaMfrRegistration.js';

const schemas = {
  manufacturer: schemaMfrRegistration,
};
const parseValidationErrors = (errorsArray) =>
  errorsArray.reduce((acc, err) => {
    const [selector, errorMsg] = err.msg.split('___');
    acc.push({ selector, msg: errorMsg });
    return acc;
  }, []);

const validateRegistrationMiddleware = asyncHandler(async (req, res, next) => {
  const schemaKey = req.body.entityType?.trim().toLowerCase();
  const schema = schemas[schemaKey];
  if (!schema) throw new Error(`Validation Schema: ${schemaKey} not found`);
  await Promise.all(checkSchema(schema).map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.errors = parseValidationErrors(errors.array());
    return res.status(400).json({ errors: req.errors });
  }
  return next();
});

const validateRegistrationDirect = async (req) => {
  try {
    const schemaKey = req.body.entityType?.trim().toLowerCase();
    const schema = schemas[schemaKey];
    if (!schema) throw new Error(`Validation Schema: ${schemaKey} not found`);
    await Promise.all(checkSchema(schema).map((validation) => validation.run(req)));
    const errors = validationResult(req);
    return errors.isEmpty ? { success: true } : { success: false, errors: errors.array() };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
};

export { validateRegistrationMiddleware, validateRegistrationDirect };
