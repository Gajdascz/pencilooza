import asyncHandler from 'express-async-handler';

import Application from '../../src/models/Application.js';
import mongoose from 'mongoose';
import { capitalize, dataTransform, setRes } from '../../config/utils.js';
import { validateApplicationDirect } from '../../src/validation/index.js';
const getMongooseModel = (modelName) => mongoose.model(capitalize(modelName));

const formToModelData = (key, data) => dataTransform[key]?.formToModel(data);

const entityHandlers = {
  create: async (entityType, entityData) => {
    const EntityModel = getMongooseModel(entityType);
    const entity = new EntityModel(entityData);
    await entity.save();
    return entity;
  },
  delete: asyncHandler(async (req, res, next) => {
    const { entityId, entityType } = req.body;
    const EntityModel = getMongooseModel(entityType);
    const entity = await EntityModel.findById(entityId).exec();
    if (!entity) return setRes(res, 404, { alert: `${entityType} with id: ${entityId} could not be found` });
    await entity.deleteOne().exec();
    return setRes(res, 200, { alert: `${entityType} successfully deleted`, redirect: '/' });
  }),
  update: asyncHandler(async (req, res, next) => {
    const result = await validateApplicationDirect(req, res, next);
    if (!result.success)
      return setRes(res, 400, {
        redirect: `/${req.body.entityType}/update/${req.body.entityId}`,
        errors: result.errors,
        data: req.body,
      });
    const { entityType, entityId, dataKey } = req.body;
    ['entityType', 'entityId', 'dataKey'].forEach((property) => delete req.body[property]);
    const EntityModel = getMongooseModel(entityType);
    if (!EntityModel) return setRes(res, 404, { alert: `Failed to find entity model of type: ${entityType}` });
    let modelData;
    if (EntityModel.modelName === 'Application') modelData = { data: req.body };
    else modelData = formToModelData(dataKey, req.body);
    const updatedEntity = await EntityModel.findByIdAndUpdate(entityId, modelData, {
      new: true,
      runValidators: true,
    }).exec();
    return setRes(res, 200, { alert: `${entityType} successfully updated`, redirect: updatedEntity.url });
  }),
};

// Encapsulates application review logic
const applicationHandlers = {
  accept: async (application, res) => {
    try {
      const modelData = formToModelData(application.type, application.data);
      const entity = await entityHandlers.create(application.type, modelData);
      if (!entity) throw new Error(`Invalid entity created in applicationHandlers.accept`);
      application.status = 'accepted';
      application.dataLink = entity.url;
      application.acceptedEntityId = entity.id;
      await application.save();
      return setRes(res, 201, {
        alert: 'Application successfully accepted',
        redirect: entity.url,
      });
    } catch (err) {
      return setRes(res, 500, { alert: 'Error accepting application', errors: [err] });
    }
  },
  reject: async (application, rejectionReason, res) => {
    try {
      application.status = 'rejected';
      application.rejectionReason = rejectionReason || 'No reason provided';
      await application.save();
      return setRes(res, 200, { alert: `${application.type} application successfully rejected` });
    } catch (err) {
      return setRes(res, 500, { alert: `Error rejecting application`, errors: [err] });
    }
  },
  review: asyncHandler(async (req, res, next) => {
    const { applicationId, applicationCommand, rejectionReason } = req.body;
    const application = await Application.findById(applicationId).exec();
    if (!application) return setRes(res, 404, { alert: `Application with id: ${applicationId} could not be found` });
    if (applicationCommand === 'accept') return await applicationHandlers.accept(application, res);
    if (applicationCommand === 'reject') return await applicationHandlers.reject(application, rejectionReason, res);
    return setRes(res, 404, { alert: `${applicationCommand} not found.` });
  }),
};

// Used by adminController to provide authenticated command execution.
const adminCommands = new Map([
  ['reviewApplication', applicationHandlers.review],
  ['deleteEntity', entityHandlers.delete],
  ['updateEntity', entityHandlers.update],
]);

export default adminCommands;
