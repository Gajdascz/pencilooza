import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import { DateTime } from 'luxon';
import { body } from 'express-validator';
import Registration from '../models/registration/Registration.js';

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
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'Invalid Registration ID' });
      }
      const registration = await Registration.findById(id).exec();
      if (!registration) {
        return res.status(404).json({ msg: `Registration with ID: ${id} not found` });
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
      dataLink: registration.dataLink,
      rejectionReason: registration.rejectionReason,
    });
  }),
};

export default registrationController;
