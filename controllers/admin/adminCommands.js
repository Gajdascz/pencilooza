import asyncHandler from 'express-async-handler';

import Registration from '../../models/registration/Registration.js';
import mongoose from 'mongoose';
import { capitalize, dataTransform } from '../../config/utils.js';
import { validateRegistrationDirect } from '../../validation/index.js';

const getMongooseModel = (modelName) => mongoose.model(capitalize(modelName));

const formToModelData = (key, data) => dataTransform[key]?.formToModel(data);

const codes = {
  registered: (what, res, redirect = null, payload = {}) =>
    res.status(201).json({ msg: `${what} was registered.`, redirect, payload }),
  notFound: (what, res, redirect = null, payload = {}) =>
    res.status(404).json({ msg: `${what} not found.`, redirect, payload }),
  invalid: (what, res, redirect = null, payload = {}) =>
    res.status(400).json({ msg: `${what} is invalid.`, redirect, payload }),
  error: (what, res, redirect = null, payload = {}) =>
    res.status(500).json({ msg: `Error: ${what}`, redirect, payload }),
  rejected: (what, res, redirect = null, payload = {}) =>
    res.status(200).json({ msg: `${what} has been rejected.`, redirect, payload }),
  notImplemented: (what, res, redirect = null, payload = {}) =>
    res.status(503).json({ msg: `${what} not implemented.`, redirect, payload }),
  deleted: (what, res, redirect = null, payload = {}) =>
    res.status(200).json({ msg: `${what} has been deleted.`, redirect, payload }),
  updated: (what, res, redirect = null, payload = {}) =>
    res.status(200).json({ msg: `${what} has been updated.`, redirect, payload }),
};

const entityHandlers = {
  delete: asyncHandler(async (req, res, next) => {
    const { entityId, entityType } = req.body;
    const EntityModel = getMongooseModel(entityType);
    const entity = await EntityModel.findById(entityId).exec();
    if (!entity) return codes.notFound(`${entityType} with id: ${entityId}`);
    await entity.deleteOne().exec();
    return codes.deleted(entityType, res, '/');
  }),
  create: async (entityType, entityData) => {
    const EntityModel = getMongooseModel(entityType);
    const entity = new EntityModel(entityData);
    await entity.save();
    return entity;
  },
  update: asyncHandler(async (req, res, next) => {
    const result = await validateRegistrationDirect(req, res, next);
    if (!result.success)
      return codes.invalid('Form Validation', res, `/manufacturer/${req.body.entityId}/update`, {
        errors: result.errors,
        fieldData: req.body,
      });
    const { entityType, entityId, dataKey } = req.body;
    ['entityType', 'entityId', 'dataKey'].forEach((property) => delete req.body[property]);
    const EntityModel = getMongooseModel(entityType);
    if (!EntityModel) return codes.error(`Failed to find entity model of type: ${entityType}`);
    let modelData;
    if (EntityModel.modelName === 'Registration') modelData = { data: req.body };
    else modelData = formToModelData(dataKey, req.body);
    const updatedEntity = await EntityModel.findByIdAndUpdate(entityId, modelData, {
      new: true,
      runValidators: true,
    }).exec();
    if (!updatedEntity) return codes.error(`Failed to update entity model with id: ${entityId}`);
    return codes.updated(entityType, res, updatedEntity.url);
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
      return codes.registered(registration.type, res);
    } catch (err) {
      return codes.error(err, res);
    }
  },
  reject: async (registration, rejectionReason, res) => {
    try {
      registration.status = 'rejected';
      registration.rejectionReason = rejectionReason || 'No reason provided';
      await registration.save();
      return codes.rejected(registration.type, res);
    } catch (err) {
      return codes.rejected(`${registration.type} Registration. Caught: ${err}`, res);
    }
  },
  review: asyncHandler(async (req, res, next) => {
    const { registrationId, registrationCommand, rejectionReason } = req.body;
    const registration = await Registration.findById(registrationId).exec();
    if (!registration) return codes.notFound(`Registration with id: ${registrationId}`, res);
    if (registrationCommand === 'accept') return await registrationHandlers.accept(registration, res);
    if (registrationCommand === 'reject') return await registrationHandlers.reject(registration, rejectionReason, res);
    return codes.error(`${registrationCommand} not found.`);
  }),
};

// Used by adminController to provide authenticated command execution.
const adminCommands = new Map([
  ['reviewRegistration', registrationHandlers.review],
  ['deleteEntity', entityHandlers.delete],
  ['updateEntity', entityHandlers.update],
]);

export default adminCommands;
