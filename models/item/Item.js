import mongoose from 'mongoose';

import PricingSchema from './schemas/Pricing';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true, maxLength: 250, minLength: 3 },
  made_in: { type: String },
  number_in_stock: { type: Number },

  pricing: { type: PricingSchema },

  manufacturer: { type: Schema.Types.ObjectId },

  sku: { type: String, required: true, unique: true },
  time_created: { type: Date, default: Date.now() },
  time_updated: { type: Date, default: Date.now() },
});

ItemSchema.pre('save', function (next) {
  this.time_updated = Date.now();
  next();
});

ItemSchema.virtual('url').get(function () {
  return `/inventory/${this._id}`;
});

export default mongoose.model('Item', ItemSchema);
