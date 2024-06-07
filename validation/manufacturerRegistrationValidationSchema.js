import { REP_ROLES, COMPANY_STRUCTURES } from '../public/javascripts/utils/constants.js';

const manufacturerRegistrationValidationSchema = {
  repFirstName: {
    trim: true,
    isLength: { options: { min: 3, max: 50 } },
    errorMessage: 'repFirstName_Invalid first name.',
    escape: true,
  },
  repLastName: {
    trim: true,
    isLength: { options: { min: 3, max: 50 } },
    errorMessage: 'repLastName_Invalid last name.',
    escape: true,
  },
  repRole: {
    isIn: { options: [REP_ROLES] },
    errorMessage: 'repRole_Invalid rep role.',
    escape: true,
  },
  companyName: {
    trim: true,
    isLength: { options: { min: 1, max: 50 } },
    errorMessage: 'companyName_Invalid company name.',
    escape: true,
  },
  companyStructure: {
    isIn: { options: [COMPANY_STRUCTURES] },
    errorMessage: 'companyStructure_Invalid company structure.',
    escape: true,
  },
  yearFounded: {
    trim: true,
    isInt: { options: { min: 0, max: new Date().getFullYear() } },
    errorMessage: 'yearFounded_Invalid year founded.',
    escape: true,
  },
  ein: {
    trim: true,
    matches: {
      options: [/^\d{2}-\d{7}$/],
      errorMessage: 'ein_EIN must be in the format XX-XXXXXXX',
    },
    optional: true,
    escape: true,
  },
  companyDescription: {
    trim: true,
    optional: true,
    escape: true,
  },
  countryCode: {
    trim: true,
    isISO31661Alpha2: true,
    errorMessage: 'countryCode_Country must be in 2 letter format (ISO 031661 Alpha-2), eg. US',
    escape: true,
  },
  state: {
    trim: true,
    isLength: { options: { min: 2 } },
    optional: true,
    errorMessage: 'state_Invalid State/Province/Region.',
    escape: true,
  },
  postalCode: {
    trim: true,
    // express-validator isPostalCode kept throwing error "Invalid locale 'undefined'" despite setting it to 'any'
    matches: {
      options: [/^\d{3,10}$/],
      errorMessage: 'postalCode_Invalid Postal Code. Must be between 3 and 10 digits.',
    },
    escape: true,
  },
  city: {
    trim: true,
    isLength: { options: { min: 2, max: 50 } },
    errorMessage: 'city_Invalid city.',
    escape: true,
  },
  street: {
    trim: true,
    isLength: { options: { min: 3, max: 100 } },
    errorMessage: 'street_Invalid street address.',
    escape: true,
  },
  extension: {
    trim: true,
    isLength: { options: { min: 1, max: 50 } },
    optional: true,
    errorMessage: 'extension_Invalid location extension.',
    escape: true,
  },
  email: {
    trim: true,
    isEmail: true,
    isLength: { options: { min: 3, max: 50 } },
    errorMessage: 'email_Invalid email address.',
    escape: true,
  },
  phone: {
    trim: true,
    customSanitizer: {
      options: (value) => value.replace(/-/g, ''),
    },
    replace: { valuesFrom: ['-'], valueTo: '' },
    matches: {
      options: [/^\d{10,15}$/],
      errorMessage: 'phone_Phone number must be between 10 and 15 digits.',
    },
    escape: true,
  },
  website: {
    trim: true,
    isURL: { options: { protocols: ['https'], require_protocol: true } },
    isLength: { options: { min: 3, max: 50 } },
    optional: true,
    errorMessage: 'website_Invalid web address. Must contain https protocol.',
  },
  note: {
    trim: true,
    optional: true,
    escape: true,
  },
};

export default manufacturerRegistrationValidationSchema;
