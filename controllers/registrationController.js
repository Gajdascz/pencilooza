import asyncHandler from 'express-async-handler';
import Registration from '../models/registration/Registration.js';
import { DateTime } from 'luxon';

const registrationController = {
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
};

export default registrationController;
