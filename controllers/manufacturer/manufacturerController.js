import asyncHandler from 'express-async-handler';
import Registration from '../../models/registration/Registration.js';
import registrationController from '../registration/registrationController.js';
import Manufacturer from '../../models/manufacturer/Manufacturer.js';
import Item from '../../models/item/Item.js';
import { mfrDataTransform } from '../../config/utils.js';
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
  delete: (res, manufacturer, dependencies) =>
    res.render('deleteForm', {
      entityType: 'manufacturer',
      entityName: manufacturer.company.name,
      entityUrl: manufacturer.url,
      entityId: manufacturer.id,
      dependencies,
    }),
};

const find = {
  allManufacturers: () => Manufacturer.find({}, 'company.name').sort({ name: 1 }).exec(),
  manufacturer: (mfrId) => Manufacturer.findById(mfrId).exec(),
  products: (mfrId) => Item.find({ manufacturer: mfrId }).exec(),
  registration: (mfrId) => Registration.findOne({ acceptedEntityId: mfrId }).exec(),
};

const manufacturerController = {
  getList: asyncHandler(async (req, res, next) => {
    const manufacturers = await find.allManufacturers();
    render.list(res, manufacturers);
  }),
  getDetail: asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const manufacturer = await find.manufacturer(id);
    const registration = await find.registration(id);
    const products = await find.products(id);
    const productLinks = products.map((prod) => ({ name: prod.name, url: prod.url }));
    render.detail(res, manufacturer, productLinks, registration?.url);
  }),
  getDelete: asyncHandler(async (req, res, next) => {
    const manufacturer = await find.manufacturer(req.params.id);
    const registration = await find.registration(req.params.id);
    const products = await find.products(req.params.id);
    const dependencies = [];
    if (registration)
      dependencies.push({ type: 'Registration', name: 'Registration', url: registration.url, id: registration.id });
    products.forEach((prod) => dependencies.push({ type: 'Item', name: prod.name, url: prod.url, id: prod.id }));
    render.delete(res, manufacturer, dependencies);
  }),
  getUpdate: asyncHandler(async (req, res, next) => {
    const manufacturer = await find.manufacturer(req.params.id);
    registrationController.renderForm(res, {
      ...mfrDataTransform.modelToRegistration(manufacturer),
      title: 'Update Manufacturer',
      state: 'authUpdate',
      entityType: 'manufacturer',
      entityId: manufacturer.id,
    });
  }),
};
export default manufacturerController;
