import { REP_ROLES, COMPANY_STRUCTURES, PROFILE_TYPES } from '../../../public/javascripts/utils/constants.js';
const escapeRemove = {
  escape: true,
  customSanitizer: {
    options: (str) => str.replace(/&[^\s;]+;/g, ''),
  },
};

const registrationFormValidationSchema = {
  profileType: {
    isIn: { options: [PROFILE_TYPES] },
    errorMessage: 'registrationType___Must be one of the provided options',
  },
  repFirstName: {
    trim: true,
    isLength: { options: { min: 3, max: 50 } },
    errorMessage: 'repFirstName___Must be between 3 and 50 characters',
    ...escapeRemove,
  },
  repLastName: {
    trim: true,
    isLength: { options: { min: 3, max: 50 } },
    errorMessage: 'repLastName___Must be between 3 and 50 characters',
    ...escapeRemove,
  },
  repRole: {
    isIn: { options: [REP_ROLES] },
    errorMessage: 'repRole___Must be one of the provided options',
    ...escapeRemove,
  },
  companyName: {
    trim: true,
    isLength: { options: { min: 1, max: 50 } },
    errorMessage: 'companyName___Company name must be between 1 and 50 characters',
    ...escapeRemove,
  },
  companyRef: {
    trim: true,
    toUpperCase: true,
    isLength: {
      options: { min: 3, max: 10 },
      errorMessage: 'companyRef___Must be between 3 and 10 characters',
    },
    custom: {
      options: (str) => /[^\d]/.test(str),
      errorMessage: 'companyRef___Must include at least one letter',
    },
    ...escapeRemove,
  },
  companyStructure: {
    isIn: { options: [COMPANY_STRUCTURES] },
    errorMessage: 'companyStructure___Must be one of the provided options',
    ...escapeRemove,
  },
  yearFounded: {
    trim: true,
    isInt: { options: { min: 0, max: new Date().getFullYear() } },
    errorMessage: `yearFounded___Must be between 0 and ${new Date().getFullYear()}`,
    ...escapeRemove,
  },
  ein: {
    trim: true,
    matches: {
      options: [/^\d{2}-\d{7}$/],
      errorMessage: 'ein___Must be in the format XX-XXXXXXX',
    },
    optional: true,
    ...escapeRemove,
  },
  companyDescription: {
    trim: true,
    optional: true,
    ...escapeRemove,
  },
  countryCode: {
    trim: true,
    isISO31661Alpha2: true,
    errorMessage: 'countryCode___Must be in 2 letter format (ISO 031661 Alpha-2), eg. US',
    ...escapeRemove,
  },
  state: {
    trim: true,
    isLength: { options: { min: 2 } },
    optional: true,
    errorMessage: 'state___Must be at least 2 characters',
    ...escapeRemove,
  },
  postalCode: {
    trim: true,
    // express-validator isPostalCode kept throwing error "Invalid locale 'undefined'" despite setting it to 'any'
    matches: {
      options: [/^[\d-]{3,10}$/],
      errorMessage: 'postalCode___Must be between 3 and 10 digits',
    },
    ...escapeRemove,
  },
  city: {
    trim: true,
    isLength: { options: { min: 2, max: 50 } },
    errorMessage: 'city___Must be between 2 and 50 characters',
    ...escapeRemove,
  },
  street: {
    trim: true,
    isLength: { options: { min: 3, max: 100 } },
    errorMessage: 'street___Must be between 3 and 100 characters',
    ...escapeRemove,
  },
  extension: {
    trim: true,
    isLength: { options: { min: 1, max: 50 } },
    optional: true,
    errorMessage: 'extension___Must be between 1 and 50 characters',
    ...escapeRemove,
  },
  email: {
    trim: true,
    isEmail: true,
    errorMessage: 'email___Must be in format name@domain.ext',
    ...escapeRemove,
  },
  phone: {
    trim: true,
    customSanitizer: { options: (value) => value.replace(/-/g, '') },
    matches: {
      options: [/^\d{10,15}$/],
      errorMessage: 'phone___Must be between 10 and 15 digits',
    },
    escape: true,
  },
  website: {
    trim: true,
    isURL: {
      options: { protocols: ['https'], require_protocol: true, validate_length: true },
      errorMessage: 'website___Must contain https protocol and be a valid length. eg https://example.com',
    },
    optional: true,
  },
  note: {
    trim: true,
    optional: true,
    ...escapeRemove,
  },
};

export default registrationFormValidationSchema;
