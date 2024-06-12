import mongoose from 'mongoose';
import { COMPANY_STRUCTURES, REP_ROLES } from '../../public/javascripts/utils/constants.js';

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
      phone: { type: String, minLength: 10, maxLength: 10, required: true },
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
      role: { type: String, enum: REP_ROLES, required: true },
    },
    other: {
      note: { type: String, maxLength: 500, required: false },
    },
  },
  { timestamps: true }
);

ManufacturerSchema.virtual('url').get(function () {
  return `/manufacturer/${this._id}`;
});
ManufacturerSchema.virtual('fullAddress').get(function () {
  return `${this.location.street}${this.location.extension ? `, ${this.location.extension}` : ''}, ${this.location.city}, ${this.location.state}, ${this.location.postalCode}, ${this.location.countryCode}`;
});
ManufacturerSchema.virtual('repInfo').get(function () {
  return `${this.rep.firstName} ${this.rep.lastName}, ${this.rep.role.charAt(0).toUpperCase() + this.rep.role.slice(1)} of ${this.company.name}`;
});

export default mongoose.model('Manufacturer', ManufacturerSchema);
