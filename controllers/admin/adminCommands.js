import asyncHandler from 'express-async-handler';

import Registration from '../../models/registration/Registration.js';
import Manufacturer from '../../models/manufacturer/Manufacturer.js';
// import Item from '../../models/item/Item.js';

const codes = {
  registered: (what, res) => res.status(201).json({ msg: `${what} was registered.` }),
  notFound: (what, res) => res.status(404).json({ msg: `${what} not found` }),
  error: (what, res) => res.status(500).json({ msg: `Error: ${what}` }),
  rejected: (what, res) => res.status(200).json({ msg: `${what} Rejected` }),
  notImplemented: (what, res) => res.status(503).json({ msg: `${what} not implemented` }),
};

// Encapsulates registration review logic
const registrationHandlers = {
  addItem: asyncHandler(async (registration = null, res) =>
    codes.notImplemented('Item registration', res)
  ),
  addManufacturer: asyncHandler(async (registration, res) => {
    const { company, contact, location, rep, other } = registration.data;
    const manufacturer = await new Manufacturer({ company, contact, location, rep, other }).save();
    registration.status = 'accepted';
    registration.dataLink = manufacturer.url;
    await registration.save();
    return codes.registered('Manufacturer', res);
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
    if (registrationCommand === 'accept') {
      if (registration.type === 'manufacturer')
        return registrationHandlers.addManufacturer(registration, res);
      else if (registration.type === 'item') return registrationHandlers.addItem(registration, res);
    } else if (registrationCommand === 'reject')
      return registrationHandlers.reject(registration, rejectionReason, res);
    return codes.error('Error reviewing registration');
  }),
};

// Used by adminController to provide authenticated command execution.
const adminCommands = new Map([['reviewRegistration', registrationHandlers.review]]);

export default adminCommands;
