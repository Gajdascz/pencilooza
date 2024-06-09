import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import { DateTime } from 'luxon';
import { body, validationResult } from 'express-validator';

import Registration from '../models/registration/Registration.js';
import Manufacturer from '../models/manufacturer/Manufacturer.js';
import Item from '../models/item/Item.js';

const registrationController = {
  getConfirmation: asyncHandler(async (req, res, next) => {
    const registration = await Registration.findById(req.params.id).exec();
    res.render('registrationConfirmation', {
      formId: registration._id,
      name: registration.data.rep.firstName,
      statusLink: registration.url,
    });
  }),
  findStatus: [
    body('registrationQuery').trim(),
    asyncHandler(async (req, res, next) => {
      const id = req.body.registrationQuery;
      console.log(id);
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Registration ID' });
      }
      const registration = await Registration.findById(id).exec();
      if (!registration) {
        return res.status(404).json({ message: `Registration with ID: ${id} not found` });
      }
      return res.redirect(registration.url);
    }),
  ],
  getStatus: asyncHandler(async (req, res, next) => {
    const registration = await Registration.findById(req.params.id).exec();
    res.render('registrationStatus', {
      id: registration._id,
      type: registration.type,
      status: registration.status,
      createdAt: new DateTime(registration.createdAt).toLocaleString(DateTime.DATETIME_MED),
      dataSections: registration.data,
    });
  }),
  updateStatus: [
    body('registrationId').trim(),
    body('adminPassword').trim(),
    asyncHandler(async (req, res, next) => {
      const { adminPassword, registrationId, registrationAction } = req.body;
      if (adminPassword === process.env.ADMIN_ACTION_PASSWORD) {
        const registration = await Registration.findById(registrationId).exec();
        if (!registration)
          return res
            .status(404)
            .json({ message: `Registration with ID: ${registrationId} not found` });
        if (registrationAction === 'accept') {
          if (registration.type === 'manufacturer') {
            try {
              registration.status = 'accepted';
              const { company, contact, location, rep, other } = registration.data;
              await new Manufacturer({ company, contact, location, rep, other }).save();
              await registration.save();
              return res.status(201).json({ message: `Manufacturer registered.` });
            } catch (err) {
              return res.status(400).json({ message: `Failed to register Manufacturer: ${err}` });
            }
          }
        }
      } else return res.status(401).json({ message: 'Invalid Admin Password' });
    }),
  ],
};
export default registrationController;
