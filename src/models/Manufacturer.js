import mongoose from 'mongoose';
import { COMPANY_STRUCTURES, COMPANY_ROLES } from '../config/constants.js';

const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema(
  {
    company: {
      name: { type: String, required: true, maxLength: 100, minLength: 3 },
      ref: { type: String, required: true, maxLength: 10, minLength: 3, unique: true },
      structure: { type: String, enum: COMPANY_STRUCTURES, required: true },
      yearFounded: { type: Number, min: 0, max: new Date().getFullYear(), required: true },
      ein: { type: String, minLength: 10, maxLength: 10, required: false },
      description: { type: String, required: true, maxLength: 250, minLength: 3 },
    },
    contact: {
      email: { type: String, minLength: 3, maxLength: 50, required: true },
      phone: { type: String, minLength: 10, maxLength: 12, required: true },
      website: { type: String, minLength: 3, maxLength: 50, required: false },
    },
    location: {
      countryCode: { type: String, minLength: 2, maxLength: 2, required: true },
      state: { type: String, minLength: 2, maxLength: 50, required: true },
      postalCode: { type: String, minLength: 2, maxLength: 12, required: true },
      city: { type: String, minLength: 1, maxLength: 50, required: true },
      street: { type: String, minLength: 3, maxLength: 100, required: true },
      extension: { type: String, minLength: 1, maxLength: 50, required: false },
    },
    rep: {
      firstName: { type: String, minLength: 3, maxLength: 25, required: true },
      lastName: { type: String, minLength: 3, maxLength: 25, required: true },
      role: { type: String, enum: COMPANY_ROLES, required: true },
    },
    other: {
      note: { type: String, maxLength: 500, required: false },
    },
  },
  { timestamps: true }
);

ManufacturerSchema.pre(/delete/i, async function (next) {
  let id = null;
  try {
    if (this instanceof mongoose.Query) id = this.getFilter()._id;
    else id = this._id;
    await mongoose.model('Application').deleteMany({ acceptedEntityId: id }).exec();
    await mongoose.model('Item').deleteMany({ manufacturer: id }).exec();
    next();
  } catch (err) {
    debug(`Error occurred while deleting related records for manufacturer ID ${id}: ${err.message}`);
    next(err);
  }
});

ManufacturerSchema.virtual('url').get(function () {
  return `/manufacturer/${this.id}`;
});
ManufacturerSchema.virtual('fullAddress').get(function () {
  return `${this.location.street}${this.location.extension ? `, ${this.location.extension}` : ''}, ${this.location.city}, ${this.location.state}, ${this.location.postalCode}, ${this.location.countryCode}`;
});
ManufacturerSchema.virtual('repInfo').get(function () {
  return `${this.rep.firstName} ${this.rep.lastName}, ${this.rep.role} of ${this.company.name}`;
});

ManufacturerSchema.set('toObject', { virtuals: true });
ManufacturerSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Manufacturer', ManufacturerSchema);
