import mongoose from 'mongoose';
import ContactSchema from './schemas/Contact.js';
const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
  description: { type: String, required: true, maxLength: 250, minLength: 3 },
  contact: ContactSchema,
  timeCreated: { type: Date, default: Date.now() },
  timeUpdated: { type: Date, default: Date.now() },
});

ManufacturerSchema.pre('save', function (next) {
  this.timeUpdated = Date.now();
  next();
});

ManufacturerSchema.virtual('url').get(function () {
  return `/inventory/${this._id}`;
});

export default mongoose.model('Manufacturer', ManufacturerSchema);
