import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import { DateTime } from 'luxon';
import { body, validationResult } from 'express-validator';

import { COUNTRY_ALPHA2, COMPANY_ROLES, COMPANY_STRUCTURES } from '../../config/constants.js';
import Application from '../../models/Application.js';
import { validateApplicationMiddleware } from '../../validation/index.js';
import { dataTransform, getListEntityLabel, capitalize, setRes } from '../../config/utils.js';

const render = {
  list: (res, applications) => {
    const statusSortMap = { pending: 0, accepted: 1, rejected: 2 };
    const entities = applications
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
    return res.render('list', { title: 'All Applications', entities });
  },
  form: (res, data = {}) => {
    if (!data.dataKey) throw new Error(`dataKey required to render application form: ${data.title}`);
    res.render('applicationForm', {
      countryCodes: COUNTRY_ALPHA2,
      repRoles: COMPANY_ROLES,
      companyStructures: COMPANY_STRUCTURES,
      ...data,
    });
  },
  confirmation: (res, application) =>
    res.render('applicationConfirmation', {
      formId: application._id,
      name: application.data?.repFirstName ?? application.data.companyName,
      statusLink: application.url,
    }),
  detail: (res, application) => {
    const renderDataSections = dataTransform[application.type].formToModel(application.data);
    if (!renderDataSections)
      return res.status(404).json({ msg: `Unable to find dataTransform of type: ${application.type}` });
    res.render('applicationDetail', {
      id: application.id,
      type: application.type,
      status: application.status,
      createdAt: new DateTime(application.createdAt).toLocaleString(DateTime.DATETIME_MED),
      dataSections: renderDataSections,
      dataLink: application.dataLink,
      rejectionReason: application.rejectionReason,
    });
  },
  delete: (res, id) => {
    res.render('deleteForm', {
      entityType: 'application',
      entityName: 'Application',
      entityId: id,
    });
  },
  update: (res, application) => {
    render.form(res, {
      ...application.data,
      title: 'Update Application',
      entityType: 'application',
      entityId: application.id,
      dataKey: application.type,
      isUpdate: true,
    });
  },
  updateReq: (res, reqBody = {}) => {
    render.form(res, {
      title: 'Update Application',
      isUpdate: true,
      ...reqBody,
    });
  },
};

const applicationController = {
  renderForm: (res, data) => render.form(res, data),
  getList: asyncHandler(async (req, res, next) => {
    const manufacturers = await Application.find({});
    render.list(res, manufacturers);
  }),
  getCreate: asyncHandler(async (req, res, next) =>
    render.form(res, {
      title: `${capitalize(req.params.type)} Application`,
      dataKey: req.params.type,
      entityType: req.params.type,
    })
  ),
  postCreate: [
    validateApplicationMiddleware,
    asyncHandler(async (req, res, next) => {
      if (!req.body.success)
        return render.form(res, { ...req.body, title: `${capitalize(req.params.type)} Application` });
      const application = new Application({ type: req.params.type, data: req.body });
      await application.save();
      return res.redirect(`/application/confirmation/${application._id}`);
    }),
  ],
  getConfirmation: asyncHandler(async (req, res, next) => {
    const application = await Application.findById(req.params.id).exec();
    if (!application) {
      res.status(404);
      throw new Error(`Unable to find application with id: ${req.params.id}`);
    }
    render.confirmation(res, application);
  }),
  findApplication: [
    body('applicationSearchQuery').trim(),
    asyncHandler(async (req, res, next) => {
      const id = req.body.applicationSearchQuery;
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid Application ID');
      }
      return res.redirect(`/application/${id}`);
    }),
  ],
  getDetail: asyncHandler(async (req, res, next) => {
    const application = await Application.findById(req.params.id).exec();
    if (!application) {
      res.status(404);
      throw new Error(`Application with ID: ${req.params.id} not found`);
    } else render.detail(res, application);
  }),
  getUpdate: asyncHandler(async (req, res, next) => {
    const application = await Application.findById(req.params.id).exec();
    if (!application) throw new Error(`Failed to find application with id: ${req.params.id}`);
    else render.update(res, application);
  }),
  postUpdate: asyncHandler(async (req, res, next) => {
    render.updateReq(res, { ...req.body, errors: JSON.parse(req.body.errors) });
  }),
  getDelete: asyncHandler(async (req, res, next) => render.delete(res, req.params.id)),
  getValidate: [
    validateApplicationMiddleware,
    asyncHandler(async (req, res, next) => {
      let code;
      if (req.body.success) code = 200;
      else if (req.body.errors.length > 0) code = 400;
      return setRes(res, code, { errors: req.body.errors, success: req.body.success, data: req.body });
    }),
  ],
};

export default applicationController;
