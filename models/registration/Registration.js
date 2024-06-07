import mongoose from 'mongoose';

import ManufacturerRegistrationSchema from './schemas/ManufacturerRegistration.js';
import ItemRegistrationSchema from './schemas/ItemRegistration.js';

const Schema = mongoose.Schema;

const RegistrationSchema = new Schema(
  {
    type: { type: String, enum: ['manufacturer', 'item'], required: true },
    data: { type: [ManufacturerRegistrationSchema, ItemRegistrationSchema], required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

RegistrationSchema.virtual('url').get(function () {
  return `/inventory/form-status/${this._id}`;
});

export default mongoose.model('Registration', RegistrationSchema);
