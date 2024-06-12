import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import { DateTime } from 'luxon';
import { body } from 'express-validator';
import Registration from '../models/registration/Registration.js';
import { COUNTRY_ALPHA2, REP_ROLES, COMPANY_STRUCTURES } from '../public/javascripts/utils/constants.js';

const render = {
  form: (res, data = {}) =>
    res.render('registrationForm', {
      countryCodes: COUNTRY_ALPHA2,
      repRoles: REP_ROLES,
      companyStructures: COMPANY_STRUCTURES,
      ...data,
    }),
  confirmation: (registration, res) =>
    res.render('registrationConfirmation', {
      formId: registration._id,
      name: registration.data?.rep?.firstName,
      statusLink: registration.url,
    }),
  detail: (registration, res) =>
    res.render('registrationStatus', {
      id: registration._id,
      type: registration.type,
      status: registration.status,
      createdAt: new DateTime(registration.createdAt).toLocaleString(DateTime.DATETIME_MED),
      dataSections: registration.data,
      dataLink: registration.dataLink,
      rejectionReason: registration.rejectionReason,
    }),
};

const registrationController = {
  getForm: (res, data) => render.form(res, data),
  getCreate: asyncHandler(async (req, res, next) => render.form(res, { registrationType: req.registrationType })),
  getConfirmation: asyncHandler(async (req, res, next) => {
    const registration = await Registration.findById(req.params.id).exec();
    render.confirmation(registration, res);
  }),
  findRegistration: [
    body('registrationSearchQuery').trim(),
    asyncHandler(async (req, res, next) => {
      const id = req.body.statusQuery;
      if (!id || !mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'Invalid Registration ID' });
      registrationController.getDetail();
      const registration = await Registration.findById(id).exec();
      if (!registration) return res.status(404).json({ msg: `Registration with ID: ${id} not found` });
      return res.redirect(registration.url);
    }),
  ],
  getDetail: asyncHandler(async (req, res, next) => {
    const registration = await Registration.findById(req.params.id).exec();
    if (!registration) return res.status(404).json({ msg: `Registration with ID: ${req.params.id} not found` });
    else render.detail(registration, res);
  }),
  getUpdate: asyncHandler(async (req, res, next) => {
    const registration = new Registration({ type: req.body.registrationType, data: req.body, _id: req.params.id });
    if (req.errors?.length > 0)
      render.form(res, {
        ...registration.data,
        registrationType: registration.type,
        errors: req.errors,
        isUpdate: true,
      });
    else {
      await Registration.findByIdAndUpdate(req.params.id, registration);
      res.redirect(`/registration/confirmation/${registration._id}`);
    }
  }),
  deleteRegistration: asyncHandler(async (req, res, next) => {
    Registration.findByIdAndDelete(req.params.id);
  }),
};

export default registrationController;
