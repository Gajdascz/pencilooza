const capitalize = (str = '') => (str === '' ? '' : `${str.charAt(0).toUpperCase()}${str.slice(1)}`);

const mfrFormToModel = (formData) => {
  // prettier-ignore
  const {
        repFirstName, repLastName, repRole,
        companyName, companyRef, companyStructure, ein, yearFounded, companyDescription,
        countryCode, state, postalCode, city, street, extension,
        email, phone, website,
        note
      } = formData;
  return {
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
const mfrModelToForm = (modelData) => {
  const { rep, company, contact, location, other } = modelData;
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

const mfrDataTransform = {
  formToModel: (data) => mfrFormToModel(data),
  modelToForm: (data) => mfrModelToForm(data),
};

const dataTransform = {
  manufacturer: {
    formToModel: (data) => mfrFormToModel(data),
    modelToForm: (data) => mfrModelToForm(data),
  },
};

const getListEntityLabel = (textClassPairs) => textClassPairs.map((p) => ({ spanText: p[0], className: p[1] }));

export { capitalize, getListEntityLabel, dataTransform, mfrDataTransform };
