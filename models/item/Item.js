import mongoose from 'mongoose';

import SkuCounter from '../SkuCounter.js';
import PricingSchema from './schemas/Pricing.js';
import OptionGroupSchema from './schemas/OptionGroup.js';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  category: { type: String, required: true },
  sku_prefix: { type: String, required: true, maxLength: 5 },
  name: { type: String, required: true },
  description: { type: String, required: true, maxLength: 500, minLength: 3 },
  stock: { type: Number, required: true },
  made_in: { type: String, required: true },
  manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
  pricing: { type: PricingSchema, required: true },
  optionGroups: { type: [OptionGroupSchema], required: false },
  time_created: { type: Date, default: Date.now() },
  time_updated: { type: Date, default: Date.now() },
});

ItemSchema.pre('save', async function (next) {
  if (!this.sku) {
    let counter = SkuCounter.findOne({ prefix: this.sku_prefix });
    if (!counter) {
      counter = new SkuCounter({ prefix: this.sku_prefix });
      await counter.save();
    }
    this.sku = await counter.nextSku();
  }
  this.time_updated = Date.now();
  next();
});

ItemSchema.virtual('url').get(function () {
  return `/inventory/${this._id}`;
});

export default mongoose.model('Item', ItemSchema);
