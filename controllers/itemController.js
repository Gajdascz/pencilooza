import asyncHandler from 'express-async-handler';

import Item from '../models/item/Item.js';
import Mfr from '../models/manufacturer/Mfr.js';

const itemController = {
  index: asyncHandler(async (req, res, next) => {
    res.render('index', {
      title: 'Home',
    });
  }),
  itemList: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  itemDetail: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  itemGetCreate: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  itemPostCreate: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  itemGetDelete: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  itemPostDelete: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  itemGetUpdate: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  itemPostUpdate: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
};
export default itemController;
