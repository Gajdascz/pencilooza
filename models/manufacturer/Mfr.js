import mongoose from 'mongoose';
import ContactSchema from './schemas/Contact.js';

const Schema = mongoose.Schema;

const MfrSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
  ref: { type: String, required: true, maxLength: 10, minLength: 3 },
  description: { type: String, required: true, maxLength: 250, minLength: 3 },
  contact: ContactSchema,
  timeCreated: { type: Date, default: Date.now() },
  timeUpdated: { type: Date, default: Date.now() },
});

MfrSchema.pre('save', function (next) {
  this.timeUpdated = Date.now();
  next();
});

MfrSchema.virtual('url').get(function () {
  return `/inventory/manufacturer/${this._id}`;
});

export default mongoose.model('Mfr', MfrSchema);
