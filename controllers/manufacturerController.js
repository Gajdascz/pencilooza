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
};

const structureRegistrationData = (req) => {
  // prettier-ignore
  const {
        repFirstName, repLastName, repRole,
        companyName, companyStructure, ein, yearFounded, companyDescription,
        countryCode, state, postalCode, city, street, extension,
        email, phone, website,
        note
      } = req.body;
  req.body = {
    rep: { firstName: repFirstName, lastName: repLastName, role: repRole },
    company: {
      name: companyName,
      structure: companyStructure,
      ein,
      yearFounded,
      description: companyDescription,
    },
    location: { countryCode, state, postalCode, city, street, extension },
    contact: { email, phone, website },
    other: { note },
  };
};

const manufacturerController = {
  list: asyncHandler(async (req, res, next) => {
    const manufacturers = await Manufacturer.find({}, 'name').sort({ name: 1 }).exec();
    render.list(res, manufacturers);
  }),
  detail: asyncHandler(async (req, res, next) => {
    const {
      name,
      ref,
      description,
      contact: contactSchema,
    } = await Manufacturer.findById(req.params.id).exec();
    const contact = contactSchema.toObject();
    const products = await Promise.all(await Item.find({ manufacturer: req.params.id }).exec());
    const productLinks = products.map((product) => ({ name: product.name, url: product.url }));
    render.detail(res, { name, ref, description, contact, productLinks });
  }),
  getCreate: asyncHandler(async (req, res, next) => render.create(res)),
  postCreate: [
    checkSchema(manufacturerRegistrationValidationSchema),
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      structureRegistrationData(req);
      const registration = new Registration({ type: 'manufacturer', data: req.body });
      const { company, contact, location, rep, other } = registration.data[0];
      if (!errors.isEmpty()) {
        console.log(errors);
        render.create(res, {
          repFirstName: rep.firstName,
          repLastName: rep.lastName,
          companyName: company.name,
          yearFounded: company.yearFounded,
          ein: company.ein,
          companyDescription: company.description,
          state: location.state,
          postalCode: location.postalCode,
          city: location.city,
          street: location.street,
          extension: location.extension,
          email: contact.email,
          phone: contact.phone,
          website: contact.website,
          note: other.note,
          errors: errors.array(),
        });
      } else {
        await registration.save();
        console.log('Saved', registration.company);
        res.redirect('/');
      }
    }),
  ],
  getDelete: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  postDelete: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  getUpdate: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  postUpdate: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
};
export default manufacturerController;
