import asyncHandler from 'express-async-handler';

import Mfr from '../models/manufacturer/Mfr.js';
import Item from '../models/item/Item.js';

const mfrController = {
  mfrList: asyncHandler(async (req, res, next) => {
    const mfrs = await Mfr.find({}, 'name').sort({ name: 1 }).exec();
    res.render('manufacturerList', { title: 'All Manufacturers', mfrs });
  }),
  mfrDetail: asyncHandler(async (req, res, next) => {
    const { name, ref, description, contact } = await Mfr.findById(req.params.id).exec();
    const products = await Promise.all(await Item.find({ manufacturer: req.params.id }).exec());
    const productLinks = products.map((product) => ({ name: product.name, url: product.url }));
    console.log(productLinks);
    res.render('manufacturerDetail', {
      name,
      ref,
      description,
      contact: contact.toObject(),
      productLinks,
    });
  }),
  mfrGetCreate: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  mfrPostCreate: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  mfrGetDelete: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  mfrPostDelete: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  mfrGetUpdate: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  mfrPostUpdate: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
};
export default mfrController;
