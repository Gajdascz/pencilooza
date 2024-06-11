import asyncHandler from 'express-async-handler';

import Registration from '../../models/registration/Registration.js';
import mongoose from 'mongoose';

const codes = {
  registered: (what, res, redirect = null) =>
    res.status(201).json({ msg: `${what} was registered.`, redirect }),
  notFound: (what, res, redirect = null) =>
    res.status(404).json({ msg: `${what} not found`, redirect }),
  error: (what, res, redirect = null) => res.status(500).json({ msg: `Error: ${what}`, redirect }),
  rejected: (what, res, redirect = null) =>
    res.status(200).json({ msg: `${what} Rejected`, redirect }),
  notImplemented: (what, res, redirect = null) =>
    res.status(503).json({ msg: `${what} not implemented`, redirect }),
  deleted: (what, res, redirect = null) =>
    res.status(200).json({ msg: `${what} has been deleted.`, redirect }),
};

const entityHandlers = {
  delete: asyncHandler(async (req, res, next) => {
    const { entityId, entityType, entityDependencies } = req.body;
    const dependencies = JSON.parse(entityDependencies);
    const entity = await mongoose.model(entityType).findById(entityId);
    if (!entity) return codes.notFound(`${entityType} with id: ${entityId}`);
    if (dependencies.length > 0) {
      await Promise.all(
        dependencies.map(async (dep) => await mongoose.model(dep.type).findByIdAndDelete(dep.id))
      );
    }
    await entity.deleteOne();
    return codes.deleted(entityType, res, '/');
  }),
  create: asyncHandler(async (type, data) => {
    const Model = mongoose.model(type);
    const entity = new Model(data);
    await entity.save();
    return entity;
  }),
};

// Encapsulates registration review logic
const registrationHandlers = {
  accept: asyncHandler(async (registration, res) => {
    const entity = entityHandlers.create(registration.type, registration.data);
    registration.status = 'accepted';
    registration.dataLink = entity.url;
    await registration.save();
    return codes.registered(
      `${registration.type.charAt(0).toUpperCase() + registration.type.slice(1)}`,
      res
    );
  }),
  reject: asyncHandler(async (registration, rejectionReason, res) => {
    registration.status = 'rejected';
    registration.rejectionReason = rejectionReason || 'No reason provided';
    await registration.save();
    return codes.rejected(`${registration.type} Registration`, res);
  }),
  review: asyncHandler(async (req, res, next) => {
    const { registrationId, registrationCommand, rejectionReason } = req.body;
    const registration = await Registration.findById(registrationId).exec();
    if (!registration) return codes.notFound(`Registration with id: ${registrationId}`, res);
    if (registrationCommand === 'accept') return registrationHandlers.accept(registration, res);
    if (registrationCommand === 'reject')
      return registrationHandlers.reject(registration, rejectionReason, res);
    return codes.error(`${registrationCommand} not found.`);
  }),
};

// Used by adminController to provide authenticated command execution.
const adminCommands = new Map([
  ['reviewRegistration', registrationHandlers.review],
  ['deleteEntity', entityHandlers.delete],
]);

export default adminCommands;
