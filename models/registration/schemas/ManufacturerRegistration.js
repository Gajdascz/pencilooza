import mongoose from 'mongoose';
import { COMPANY_STRUCTURES, REP_ROLES } from '../../../public/javascripts/utils/constants.js';
const Schema = mongoose.Schema;

const ManufacturerRegistrationSchema = new Schema({
  company: {
    name: { type: String, required: true, maxLength: 100, minLength: 3 },
    structure: { type: String, enum: COMPANY_STRUCTURES, required: true },
    yearFounded: { type: Number, min: 0, max: new Date().getFullYear(), required: true },
    ein: { type: String, minLength: 10, maxLength: 10, required: false },
    description: { type: String, maxLength: 500, required: false },
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
});

export default ManufacturerRegistrationSchema;
