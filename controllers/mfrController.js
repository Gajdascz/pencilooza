import asyncHandler from 'express-async-handler';

import mfr from '../models/manufacturer/Mfr.js';

const mfrController = {
  mfrList: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  mfrDetail: asyncHandler(async (req, res, next) => {
    res.send('TBI');
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
