import asyncHandler from 'express-async-handler';

import Registration from '../../models/registration/Registration.js';
import mongoose from 'mongoose';
import { capitalize, dataTransform, setRes } from '../../config/utils.js';
import { validateRegistrationDirect } from '../../validation/index.js';
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
    const result = await validateRegistrationDirect(req, res, next);
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
    if (EntityModel.modelName === 'Registration') modelData = { data: req.body };
    else modelData = formToModelData(dataKey, req.body);
    const updatedEntity = await EntityModel.findByIdAndUpdate(entityId, modelData, {
      new: true,
      runValidators: true,
    }).exec();
    if (!updatedEntity) return setRes(res, 500, { alert: `Error updating ${entityType} with id ${entityId}` });
    return setRes(res, 200, { alert: `${entityType} successfully updated`, redirect: updatedEntity.url });
  }),
};

// Encapsulates registration review logic
const registrationHandlers = {
  accept: async (registration, res) => {
    try {
      const modelData = formToModelData(registration.type, registration.data);
      const entity = await entityHandlers.create(registration.type, modelData);
      if (!entity) throw new Error(`Invalid entity created in registrationHandlers.accept`);
      registration.status = 'accepted';
      registration.dataLink = entity.url;
      registration.acceptedEntityId = entity.id;
      await registration.save();
      return setRes(res, 201, {
        alert: 'Registration successfully accepted',
        redirect: entity.url,
      });
    } catch (err) {
      return setRes(res, 500, { alert: 'Error accepting registration', errors: [err] });
    }
  },
  reject: async (registration, rejectionReason, res) => {
    try {
      registration.status = 'rejected';
      registration.rejectionReason = rejectionReason || 'No reason provided';
      await registration.save();
      return setRes(res, 200, { alert: `${registration.type} successfully rejected` });
    } catch (err) {
      return setRes(res, 500, { alert: `Error rejecting registration`, errors: [err] });
    }
  },
  review: asyncHandler(async (req, res, next) => {
    const { registrationId, registrationCommand, rejectionReason } = req.body;
    const registration = await Registration.findById(registrationId).exec();
    if (!registration) return setRes(res, 404, { alert: `Registration with id: ${registrationId} could not be found` });
    if (registrationCommand === 'accept') return await registrationHandlers.accept(registration, res);
    if (registrationCommand === 'reject') return await registrationHandlers.reject(registration, rejectionReason, res);
    return setRes(res, 404, { alert: `${registrationCommand} not found.` });
  }),
};

// Used by adminController to provide authenticated command execution.
const adminCommands = new Map([
  ['reviewRegistration', registrationHandlers.review],
  ['deleteEntity', entityHandlers.delete],
  ['updateEntity', entityHandlers.update],
]);

export default adminCommands;
