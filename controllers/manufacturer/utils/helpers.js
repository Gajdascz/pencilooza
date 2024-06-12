import { checkSchema, validationResult } from 'express-validator';
import registrationFormValidationSchema from './registrationFormValidationSchema.js';

const structureFormData = (req) => {
  // prettier-ignore
  const {
        repFirstName, repLastName, repRole,
        companyName, companyRef, companyStructure, ein, yearFounded, companyDescription,
        countryCode, state, postalCode, city, street, extension,
        email, phone, website,
        note
      } = req.body;
  req.body = {
    rep: { firstName: repFirstName, lastName: repLastName, role: repRole },
    company: {
      name: companyName,
      structure: companyStructure,
      ref: companyRef,
      ein,
      yearFounded,
      description: companyDescription,
    },
    location: { countryCode, state, postalCode, city, street, extension },
    contact: { email, phone, website },
    other: { note },
  };
};

const reverseStructuredFormData = (mfr) => {
  const { rep, company, contact, location, other } = mfr;
  return {
    repFirstName: rep.firstName,
    repLastName: rep.lastName,
    repRole: rep.role,
    companyName: company.name,
    companyStructure: company.structure,
    companyRef: company.ref,
    yearFounded: company.yearFounded,
    ein: company.ein,
    companyDescription: company.description,
    countryCode: location.countryCode,
    state: location.state,
    postalCode: location.postalCode,
    city: location.city,
    street: location.street,
    extension: location.extension,
    email: contact.email,
    phone: contact.phone,
    website: contact.website,
    note: other.note,
  };
};

const mapProductLinks = (products) => products.map((prod) => ({ name: prod.name, url: prod.url }));

const parseValidationErrors = (errorsArray) =>
  errorsArray.reduce((acc, err) => {
    const [selector, errorMsg] = err.msg.split('___');
    acc.push({ selector, msg: errorMsg });
    return acc;
  }, []);

const validateForm = async (req, res, next) => {
  await Promise.all(checkSchema(registrationFormValidationSchema).map((validation) => validation.run(req)));
  const errors = validationResult(req);
  structureFormData(req);
  if (!errors.isEmpty()) req.errors = parseValidationErrors(errors.array());
  return next();
};

export { structureFormData, mapProductLinks, parseValidationErrors, validateForm, reverseStructuredFormData };
