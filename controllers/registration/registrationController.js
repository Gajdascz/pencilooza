import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import { DateTime } from 'luxon';
import { body, validationResult } from 'express-validator';

import { COUNTRY_ALPHA2, COMPANY_ROLES, COMPANY_STRUCTURES } from '../../config/constants.js';
import Registration from '../../models/registration/Registration.js';
import { validateRegistrationMiddleware } from '../../validation/index.js';
import { dataTransform, getListEntityLabel, capitalize, setRes } from '../../config/utils.js';

const render = {
  list: (res, registrations) => {
    const statusSortMap = { pending: 0, accepted: 1, rejected: 2 };
    const entities = registrations
      .sort((a, b) => statusSortMap[a.status] - statusSortMap[b.status])
      .map((reg) => {
        const labelSegments = [
          [reg.id, `${reg.status}-hover`],
          [
            ` --> ${reg.status}${reg.status === 'accepted' ? ` ✔` : reg.status === 'rejected' ? ` X` : ''}`,
            reg.status,
          ],
        ];
        return { url: reg.url, label: getListEntityLabel(labelSegments) };
      });
    return res.render('list', { title: 'All Registrations', entities });
  },
  form: (res, data = {}) => {
    if (!data.dataKey) throw new Error(`dataKey required to render registration form: ${data.title}`);
    res.render('registrationForm', {
      countryCodes: COUNTRY_ALPHA2,
      repRoles: COMPANY_ROLES,
      companyStructures: COMPANY_STRUCTURES,
      ...data,
    });
  },
  confirmation: (res, registration) =>
    res.render('registrationConfirmation', {
      formId: registration._id,
      name: registration.data?.repFirstName ?? registration.data.companyName,
      statusLink: registration.url,
    }),
  detail: (res, registration) => {
    const renderDataSections = dataTransform[registration.type].formToModel(registration.data);
    if (!renderDataSections)
      return res.status(404).json({ msg: `Unable to find dataTransform of type: ${registration.type}` });
    res.render('registrationDetail', {
      id: registration.id,
      type: registration.type,
      status: registration.status,
      createdAt: new DateTime(registration.createdAt).toLocaleString(DateTime.DATETIME_MED),
      dataSections: renderDataSections,
      dataLink: registration.dataLink,
      rejectionReason: registration.rejectionReason,
    });
  },
  delete: (res, id) => {
    res.render('deleteForm', {
      entityType: 'registration',
      entityName: 'Registration',
      entityId: id,
    });
  },
  update: (res, registration) => {
    render.form(res, {
      ...registration.data,
      title: 'Update Registration',
      entityType: 'registration',
      entityId: registration.id,
      dataKey: registration.type,
      isUpdate: true,
    });
  },
  updateReq: (res, reqBody = {}) => {
    render.form(res, {
      title: 'Update Registration',
      isUpdate: true,
      ...reqBody,
    });
  },
};

const registrationController = {
  renderForm: (res, data) => render.form(res, data),
  getList: asyncHandler(async (req, res, next) => {
    const manufacturers = await Registration.find({});
    render.list(res, manufacturers);
  }),
  getCreate: asyncHandler(async (req, res, next) =>
    render.form(res, {
      title: `Register ${capitalize(req.params.type)}`,
      dataKey: req.params.type,
      entityType: req.params.type,
    })
  ),
  postCreate: [
    validateRegistrationMiddleware,
    asyncHandler(async (req, res, next) => {
      if (!req.body.success) return render.form(res, { ...req.body, title: 'Register Manufacturer' });
      const registration = new Registration({ type: req.params.type, data: req.body });
      await registration.save();
      return res.redirect(`/registration/confirmation/${registration._id}`);
    }),
  ],
  getConfirmation: asyncHandler(async (req, res, next) => {
    const registration = await Registration.findById(req.params.id).exec();
    if (!registration) {
      res.status(404);
      throw new Error(`Unable to find registration with id: ${req.params.id}`);
    }
    render.confirmation(res, registration);
  }),
  findRegistration: [
    body('registrationSearchQuery').trim(),
    asyncHandler(async (req, res, next) => {
      const id = req.body.registrationSearchQuery;
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid Registration ID');
      }
      return res.redirect(`/registration/${id}`);
    }),
  ],
  getDetail: asyncHandler(async (req, res, next) => {
    const registration = await Registration.findById(req.params.id).exec();
    if (!registration) {
      res.status(404);
      throw new Error(`Registration with ID: ${req.params.id} not found`);
    } else render.detail(res, registration);
  }),
  getUpdate: asyncHandler(async (req, res, next) => {
    const registration = await Registration.findById(req.params.id).exec();
    if (!registration) throw new Error(`Failed to find registration with id: ${req.params.id}`);
    else render.update(res, registration);
  }),
  postUpdate: asyncHandler(async (req, res, next) => {
    render.updateReq(res, { ...req.body, errors: JSON.parse(req.body.errors) });
  }),
  getDelete: asyncHandler(async (req, res, next) => render.delete(res, req.params.id)),
  getValidate: [
    validateRegistrationMiddleware,
    asyncHandler(async (req, res, next) => {
      let code;
      if (req.body.success === 1) code = 200;
      if (req.body.errors.length > 0) code = 400;
      return setRes(res, code, { errors: req.body.errors, data: req.body });
    }),
  ],
};

export default registrationController;
