import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import { DateTime } from 'luxon';
import { body } from 'express-validator';

import { COUNTRY_ALPHA2, COMPANY_ROLES, COMPANY_STRUCTURES } from '../../config/constants.js';
import Registration from '../../models/registration/Registration.js';
import { validateRegistrationMiddleware } from '../../validation/index.js';
import { dataTransform } from '../../config/utils.js';

const render = {
  form: (res, data = {}) =>
    res.render('registrationForm', {
      countryCodes: COUNTRY_ALPHA2,
      repRoles: COMPANY_ROLES,
      companyStructures: COMPANY_STRUCTURES,
      ...data,
    }),
  confirmation: (registration, res) =>
    res.render('registrationConfirmation', {
      formId: registration._id,
      name: registration.data?.repFirstName ?? registration.data.companyName,
      statusLink: registration.url,
    }),
  detail: (registration, res) => {
    const renderDataSections = dataTransform[registration.type].registrationToModel(registration.data);
    if (!renderDataSections)
      return res.status(404).json({ msg: `Unable to find dataTransform of type: ${registration.type}` });
    return res.render('registrationDetail', {
      id: registration.id,
      type: registration.type,
      status: registration.status,
      createdAt: new DateTime(registration.createdAt).toLocaleString(DateTime.DATETIME_MED),
      dataSections: renderDataSections,
      dataLink: registration.dataLink,
      rejectionReason: registration.rejectionReason,
    });
  },
};

const registrationController = {
  renderForm: (res, data) => render.form(res, data),
  getCreate: asyncHandler(async (req, res, next) =>
    render.form(res, {
      title: `Register`,
      entityType: req.params.type,
    })
  ),
  postCreate: [
    validateRegistrationMiddleware,
    asyncHandler(async (req, res, next) => {
      console.log(req.body);
      const registration = new Registration({ type: req.params.type, data: req.body });
      if (req.errors?.length > 0) render.form(res, { ...registration.data, errors: req.errors });
      else {
        await registration.save();
        res.redirect(`/registration/confirmation/${registration._id}`);
      }
    }),
  ],
  getConfirmation: asyncHandler(async (req, res, next) => {
    const registration = await Registration.findById(req.params.id).exec();
    render.confirmation(registration, res);
  }),
  findRegistration: [
    body('registrationSearchQuery').trim(),
    asyncHandler(async (req, res, next) => {
      const id = req.body.registrationSearchQuery;
      if (!id || !mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'Invalid Registration ID' });
      return res.redirect(`/registration/${id}`);
    }),
  ],
  getDetail: asyncHandler(async (req, res, next) => {
    const registration = await Registration.findById(req.params.id).exec();
    if (!registration) {
      res.status(404);
      throw new Error(`Registration with ID: ${req.params.id} not found`);
    } else render.detail(registration, res);
  }),
  getUpdate: asyncHandler(async (req, res, next) => {
    const registration = await Registration.findById(req.params.id).exec();
    if (!registration) throw new Error(`Failed to find registration with id: ${req.params.id}`);
    else
      render.form(res, {
        ...registration.data,
        entityType: 'registration',
        entityId: registration.id,
        errors: req.errors,
        state: 'noAuthUpdate',
      });
  }),
};

export default registrationController;
