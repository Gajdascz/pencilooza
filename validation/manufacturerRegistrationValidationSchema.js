import { REP_ROLES, COMPANY_STRUCTURES } from '../public/javascripts/utils/constants.js';

const escapeRemove = {
  escape: true,
  customSanitizer: {
    options: (str) => str.replace(/^&.*;$/i, ''),
  },
};

const manufacturerRegistrationValidationSchema = {
  repFirstName: {
    trim: true,
    isLength: { options: { min: 3, max: 50 } },
    errorMessage: 'repFirstName___First name must be between 3 and 50 characters.',
    ...escapeRemove,
  },
  repLastName: {
    trim: true,
    isLength: { options: { min: 3, max: 50 } },
    errorMessage: 'repLastName___Last name must be between 3 and 50 characters.',
    ...escapeRemove,
  },
  repRole: {
    isIn: { options: [REP_ROLES] },
    errorMessage: 'repRole___Role must be one of the provided options.',
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
    isLength: { options: { min: 3, max: 10 } },
    custom: {
      options: (str) => /[^\d]/.test(str),
    },
    errorMessage:
      'companyRef___Company References must be between 3 and 10 characters and include at least one letter',
    ...escapeRemove,
  },
  companyStructure: {
    isIn: { options: [COMPANY_STRUCTURES] },
    errorMessage: 'companyStructure___Company Structure must be one of the provided options.',
    ...escapeRemove,
  },
  yearFounded: {
    trim: true,
    isInt: { options: { min: 0, max: new Date().getFullYear() } },
    errorMessage: `yearFounded___Year must be between 0 and ${new Date().getFullYear()}`,
    ...escapeRemove,
  },
  ein: {
    trim: true,
    matches: {
      options: [/^\d{2}-\d{7}$/],
      errorMessage: 'ein___EIN must be in the format XX-XXXXXXX',
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
    errorMessage: 'countryCode___Country must be in 2 letter format (ISO 031661 Alpha-2), eg. US',
    ...escapeRemove,
  },
  state: {
    trim: true,
    isLength: { options: { min: 2 } },
    optional: true,
    errorMessage: 'state___State/Province/Region must be at least 2 characters.',
    ...escapeRemove,
  },
  postalCode: {
    trim: true,
    // express-validator isPostalCode kept throwing error "Invalid locale 'undefined'" despite setting it to 'any'
    matches: {
      options: [/^[\d-]{3,10}$/],
      errorMessage: 'postalCode___Postal Code must be between 3 and 10 digits.',
    },
    ...escapeRemove,
  },
  city: {
    trim: true,
    isLength: { options: { min: 2, max: 50 } },
    errorMessage: 'city___City must be between 2 and 50 characters.',
    ...escapeRemove,
  },
  street: {
    trim: true,
    isLength: { options: { min: 3, max: 100 } },
    errorMessage: 'street___Street must be between 3 and 100 characters.',
    ...escapeRemove,
  },
  extension: {
    trim: true,
    isLength: { options: { min: 1, max: 50 } },
    optional: true,
    errorMessage: 'extension___Location Extension must be between 1 and 50 characters.',
    ...escapeRemove,
  },
  email: {
    trim: true,
    isEmail: true,
    errorMessage: 'email___Invalid Email Address.',
    ...escapeRemove,
  },
  phone: {
    trim: true,
    customSanitizer: {
      options: (value) => {
        console.log(value);
        return value.replace(/-/g, '');
      },
    },
    matches: {
      options: [/^\d{10,15}$/],
      errorMessage: 'phone___Phone number must be between 10 and 15 digits.',
    },
    escape: true,
  },
  website: {
    trim: true,
    isURL: { options: { protocols: ['https'], require_protocol: true } },
    isLength: { options: { min: 3, max: 50 } },
    optional: true,
    errorMessage: 'website___Invalid web address, must contain https protocol.',
  },
  note: {
    trim: true,
    optional: true,
    ...escapeRemove,
  },
};

export default manufacturerRegistrationValidationSchema;
