import asyncHandler from 'express-async-handler';
import find from './utils/find.js';
import { mapProductLinks, reverseStructuredFormData, validateForm } from './utils/helpers.js';
import Registration from '../../models/registration/Registration.js';
import registrationController from '../registrationController.js';
import { COUNTRY_ALPHA2, REP_ROLES, COMPANY_STRUCTURES } from '../../public/javascripts/utils/constants.js';

const render = {
  list: (res, manufacturers) => res.render('manufacturerList', { title: 'All Manufacturers', manufacturers }),
  detail: (res, manufacturer, productLinks, registrationLink) =>
    res.render('manufacturerDetail', {
      id: manufacturer.id,
      company: manufacturer.company,
      contact: manufacturer.contact,
      fullAddress: manufacturer.fullAddress,
      repInfo: manufacturer.repInfo,
      note: manufacturer.other.note,
      productLinks,
      registrationLink,
    }),
  form: (res, data = {}) =>
    res.render('registrationForm', {
      countryCodes: COUNTRY_ALPHA2,
      repRoles: REP_ROLES,
      companyStructures: COMPANY_STRUCTURES,
      ...data,
    }),
  formFilled: (res, manufacturer, { errors = [], isUpdate = false }) => {
    const { rep, company, contact, location, other } = manufacturer;
    res.render('registrationForm', {
      registrationType: 'Manufacturer',
      repFirstName: rep.firstName,
      repLastName: rep.lastName,
      repRole: rep.role,
      repRoles: REP_ROLES,
      companyName: company.name,
      companyStructure: company.structure,
      companyStructures: COMPANY_STRUCTURES,
      companyRef: company.ref,
      yearFounded: company.yearFounded,
      ein: company.ein,
      companyDescription: company.description,
      countryCode: location.countryCode,
      countryCodes: COUNTRY_ALPHA2,
      state: location.state,
      postalCode: location.postalCode,
      city: location.city,
      street: location.street,
      extension: location.extension,
      email: contact.email,
      phone: contact.phone,
      website: contact.website,
      note: other.note,
      errors,
      isUpdate,
    });
  },
  delete: (res, manufacturer, dependencies) =>
    res.render('deleteForm', {
      entityType: 'Manufacturer',
      entityName: manufacturer.company.name,
      entityUrl: manufacturer.url,
      entityId: manufacturer.id,
      dependencies,
    }),
};

const manufacturerController = {
  list: asyncHandler(async (req, res, next) => {
    const manufacturers = await find.allManufacturers();
    render.list(res, manufacturers);
  }),
  detail: asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const manufacturer = await find.manufacturer(id);
    const registration = await find.registration(id);
    const products = await find.products(id);
    render.detail(res, manufacturer, mapProductLinks(products), registration?.url);
  }),
  getCreate: asyncHandler(async (req, res, next) =>
    registrationController.getForm(res, { title: 'Register Manufacturer' })
  ),
  postCreate: [
    validateForm,
    asyncHandler(async (req, res, next) => {
      const registration = new Registration({ type: 'Manufacturer', data: req.body });
      if (req.errors?.length > 0) render.formFilled(res, registration.data, { errors: req.errors });
      else {
        await registration.save();
        res.redirect(`/registration/confirmation/${registration._id}`);
      }
    }),
  ],
  getDelete: asyncHandler(async (req, res, next) => {
    const manufacturer = await find.manufacturer(req.params.id);
    const registration = await find.registration(req.params.id);
    const products = await find.products(req.params.id);
    const dependencies = [{ type: 'Registration', name: 'Registration', url: registration.url, id: registration.id }];
    products.forEach((prod) => dependencies.push({ type: 'Item', name: prod.name, url: prod.url, id: prod.id }));
    render.delete(res, manufacturer, dependencies);
  }),
  getUpdate: asyncHandler(async (req, res, next) => {
    const manufacturer = await find.manufacturer(req.params.id);
    registrationController.getForm(res, { ...reverseStructuredFormData(manufacturer), isUpdate: true });
  }),
  postUpdate: [
    validateForm,
    asyncHandler(async (req, res, next) => {
      const registration = new Registration({ type: 'Manufacturer', data: req.body, _id: req.params.id });
      if (req.errors?.length > 0) render.formFilled(res, registration.data, { errors: req.errors, isUpdate: true });
      else {
        await Registration.findByIdAndUpdate(req.params.id, registration);
        res.redirect(`/registration/${registration._id}`);
      }
    }),
  ],
};
export default manufacturerController;
