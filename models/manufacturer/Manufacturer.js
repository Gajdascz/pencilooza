import mongoose from 'mongoose';
import ContactSchema from './schemas/Contact';
const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
  description: { type: String, required: true, maxLength: 250, minLength: 3 },
  contact: ContactSchema,
  time_created: { type: Date, default: Date.now() },
  time_updated: { type: Date, default: Date.now() },
});

ManufacturerSchema.pre('save', function (next) {
  this.time_updated = Date.now();
  next();
});

ManufacturerSchema.virtual('url').get(function () {
  return `/inventory/${this._id}`;
});

export default mongoose.model('Manufacturer', ManufacturerSchema);
