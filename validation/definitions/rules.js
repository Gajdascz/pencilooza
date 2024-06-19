// #region Definition Utils
const genericMessages = {
  inRange: (min, max, unit = null) => `Must be between ${min} and ${max}${unit ? ` ${unit}` : ''}`,
  inProvidedOptions: () => `Must be one of the provided options`,
  hasFormat: (formatStr) => `Must be in the format ${formatStr}`,
  includes: (requirements) => `Must include ${requirements}`,
};
const errorMessage = (fieldSelector, message) => ({ errorMessage: `${fieldSelector}___${message}` });
const escapeRemove = {
  escape: true,
  customSanitizer: {
    options: (str) => str.replace(/&[^\s;]+;/g, ''),
  },
};

const getOptional = (is = false) => (is ? { options: { nullable: true, checkFalsy: true } } : false);

// #endregion

// #region Rule Definitions
const strByLength = (fieldSelector, { min = -Infinity, max = Infinity, optional = false } = {}) => ({
  trim: true,
  isLength: { options: { min, max } },
  ...getOptional(optional),
  ...errorMessage(fieldSelector, genericMessages.inRange(min, max, 'characters')),
  ...escapeRemove,
});
const strByFormat = (fieldSelector, formatStrRegEx, formatStrExample, { optional = false } = {}) => {
  const rules = {
    trim: true,
    matches: {
      options: formatStrRegEx,
      ...errorMessage(fieldSelector, genericMessages.hasFormat(formatStrExample)),
    },
    ...escapeRemove,
  };
  if (optional) return { optional: { options: { nullable: true, checkFalsy: true } }, ...rules };
  return rules;
};
const strBySelection = (fieldSelector, providedOptions, { optional = false } = {}) => ({
  ...getOptional(optional),
  isIn: { options: [providedOptions], ...errorMessage(fieldSelector, genericMessages.inProvidedOptions()) },
});
const numberByRange = (fieldSelector, { min = -Infinity, max = Infinity, optional = false } = {}) => ({
  trim: true,
  ...getOptional(optional),
  isInt: { options: { min, max } },
  ...errorMessage(fieldSelector, genericMessages.inRange(min, max)),
  ...escapeRemove,
});

const email = (fieldSelector, { optional = false } = {}) => ({
  trim: true,
  isEmail: true,
  ...getOptional(optional),
  ...errorMessage(fieldSelector, genericMessages.hasFormat('name@domain.ext')),
  ...escapeRemove,
});
const phone = (fieldSelector, { optional = false } = {}) => ({
  trim: true,
  ...getOptional(optional),
  isLength: { options: { min: 10, max: 12 }, ...errorMessage(fieldSelector, genericMessages.inRange(10, 12)) },
  ...escapeRemove,
});
const website = (fieldSelector, { optional = false } = {}) => ({
  trim: true,
  optional: optional ? { options: { nullable: true, checkFalsy: true } } : false,
  ...getOptional(optional),
  isURL: {
    options: { protocols: ['https'], require_protocol: true, validate_length: true },
    ...errorMessage(fieldSelector, genericMessages.includes('https protocol and a valid length')),
  },
});

const shorthandReference = (fieldSelector, { min = 3, max = 10, optional = false } = {}) => ({
  trim: true,
  toUpperCase: true,
  ...getOptional(optional),
  isLength: {
    options: { min, max },
    ...errorMessage(fieldSelector, genericMessages.inRange(min, max, 'characters')),
  },
  custom: {
    options: (str) => /^[A-Za-z]+$/.test(str),
    ...errorMessage(fieldSelector, genericMessages.includes('only alphabetic characters')),
  },
  ...escapeRemove,
});

const ein = (fieldSelector, { optional = false } = {}) =>
  strByFormat(fieldSelector, [/^\d{2}-\d{7}$/], 'XX-XXXXXXX', { optional });

const countryCode = (fieldSelector, { optional = false } = {}) => ({
  trim: true,
  isISO31661Alpha2: true,
  ...getOptional(optional),
  ...errorMessage(fieldSelector, genericMessages.hasFormat('ISO 031661 Alpha-2, eg. US')),
  ...escapeRemove,
});

const postalCode = (fieldSelector, { optional = false } = {}) => ({
  trim: true,
  // express-validator isPostalCode kept throwing error "Invalid locale 'undefined'" despite setting it to 'any'
  ...getOptional(optional),
  matches: {
    options: [/^[\d-]{3,10}$/],
    ...errorMessage(fieldSelector, genericMessages.inRange(3, 10, 'digits')),
  },
  ...escapeRemove,
});
// #endregion

export {
  strByLength,
  strByFormat,
  strBySelection,
  numberByRange,
  email,
  phone,
  website,
  shorthandReference,
  ein,
  countryCode,
  postalCode,
};
