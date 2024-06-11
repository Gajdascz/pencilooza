import asyncHandler from 'express-async-handler';

import {
  COUNTRY_ALPHA2,
  REP_ROLES,
  COMPANY_STRUCTURES,
} from '../public/javascripts/utils/constants.js';

import Manufacturer from '../models/manufacturer/Manufacturer.js';
import Item from '../models/item/Item.js';
import Registration from '../models/registration/Registration.js';

import { checkSchema, validationResult } from 'express-validator';
import manufacturerRegistrationValidationSchema from '../validation/manufacturerRegistrationValidationSchema.js';

const render = {
  list: (res, manufacturers) =>
    res.render('manufacturerList', { title: 'All Manufacturers', manufacturers }),
  detail: (res, data = {}) => res.render('manufacturerDetail', data),
  create: (res, data = {}) =>
    res.render('manufacturerRegisterForm', {
      title: 'Manufacturer Registration',
      countryCodes: COUNTRY_ALPHA2,
      repRoles: REP_ROLES,
      companyStructures: COMPANY_STRUCTURES,
      ...data,
    }),
  delete: (res, data = {}) => res.render('deleteForm', data),
};

const structureRegistrationData = (req) => {
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

const find = {
  allManufacturers: async () => Manufacturer.find({}, 'company.name').sort({ name: 1 }).exec(),
  manufacturer: async (mfrId) => Manufacturer.findById(mfrId).exec(),
  products: async (mfrId) => Item.find({ manufacturer: mfrId }).exec(),
  manufacturerAndProducts: async (mfrId) =>
    Promise.all([find.manufacturer(mfrId), find.products(mfrId)]),
};

const manufacturerController = {
  list: asyncHandler(async (req, res, next) => {
    const manufacturers = await find.allManufacturers();
    render.list(res, manufacturers);
  }),
  detail: asyncHandler(async (req, res, next) => {
    const [manufacturer, products] = await find.manufacturerAndProducts(req.params.id);
    const { company, contact, other } = manufacturer;
    const productLinks = products.map((product) => ({ name: product.name, url: product.url }));
    render.detail(res, {
      id: req.params.id,
      company,
      contact,
      fullAddress: manufacturer.fullAddress,
      repInfo: manufacturer.repInfo,
      note: other.note,
      productLinks,
    });
  }),
  getCreate: asyncHandler(async (req, res, next) => render.create(res)),
  postCreate: [
    checkSchema(manufacturerRegistrationValidationSchema),
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      structureRegistrationData(req);
      const registration = new Registration({ type: 'manufacturer', data: req.body });
      const { company, contact, location, rep, other } = registration.data;
      const { selectors, errorMsgs } = errors.array().reduce(
        (acc, err) => {
          const [selector, errorMsg] = err.msg.split('___');
          acc.selectors.push(selector);
          acc.errorMsgs.push(errorMsg);
          return acc;
        },
        { selectors: [], errorMsgs: [] }
      );
      if (!errors.isEmpty()) {
        render.create(res, {
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
          selectors,
          errorMsgs,
        });
      } else {
        await registration.save();
        res.redirect(`/inventory/registration-confirmation/${registration._id}`);
      }
    }),
  ],
  getDelete: asyncHandler(async (req, res, next) => {
    const [manufacturer, products] = await find.manufacturerAndProducts(req.params.id);
    const productData = products.map((product) => ({
      name: product.name,
      url: product.url,
      type: 'Item',
      id: product.id,
    }));
    render.delete(res, {
      entityName: manufacturer.company.name,
      entityUrl: manufacturer.url,
      entityId: manufacturer.id,
      entityType: 'Manufacturer',
      dependencies: productData,
    });
  }),
  getUpdate: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  postUpdate: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
};
export default manufacturerController;
