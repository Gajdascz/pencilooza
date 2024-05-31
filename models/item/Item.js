import mongoose from 'mongoose';

import SkuCounter from '../SkuCounter.js';
import PricingSchema from './schemas/Pricing.js';
import OptionGroupSchema from './schemas/OptionGroup.js';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  category: { type: String, required: true },
  skuPrefix: { type: String, required: true, maxLength: 13 },
  type: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true, maxLength: 500, minLength: 3 },
  stock: { type: Number, required: true },
  madeIn: { type: String, required: true },
  manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
  pricing: { type: PricingSchema, required: true },
  optionGroups: { type: [OptionGroupSchema], required: false },
  timeCreated: { type: Date, default: Date.now() },
  timeUpdated: { type: Date, default: Date.now() },
});

ItemSchema.pre('save', async function (next) {
  if (!this.sku) {
    let counter = await SkuCounter.findOne({ prefix: this.skuPrefix });
    if (!counter) {
      counter = new SkuCounter({ prefix: this.skuPrefix });
      await counter.save();
    }
    this.sku = await counter.nextSku();
  }
  this.timeUpdated = Date.now();
  next();
});

ItemSchema.virtual('url').get(function () {
  return `/inventory/${this._id}`;
});

export default mongoose.model('Item', ItemSchema);
