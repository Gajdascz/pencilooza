import mongoose from 'mongoose';

import SkuCounter from '../SkuCounter.js';
import OptionGroupSchema from './schemas/OptionGroup.js';
import {
  ITEM_GENERAL,
  ITEM_PENCIL,
  ITEM_ERASER,
  ITEM_GRAPHITE,
} from '../../public/javascripts/utils/constants.js';

const Schema = mongoose.Schema;

const typesByCategory = {
  [ITEM_PENCIL.CATEGORY]: Object.values(ITEM_PENCIL.TYPES),
  [ITEM_ERASER.CATEGORY]: Object.values(ITEM_ERASER.TYPES),
  [ITEM_GRAPHITE.CATEGORY]: Object.values(ITEM_GRAPHITE.TYPES),
};

const categoryBySkuCode = {
  [ITEM_PENCIL.SKU_CODE]: ITEM_PENCIL.CATEGORY,
  [ITEM_ERASER.SKU_CODE]: ITEM_ERASER.CATEGORY,
  [ITEM_GRAPHITE.SKU_CODE]: ITEM_GRAPHITE.CATEGORY,
};
const ItemSchema = new Schema({
  category: { type: String, required: true, enum: Object.values(ITEM_GENERAL.CATEGORIES) },
  skuPrefix: {
    type: String,
    required: true,
    uppercase: true,
    maxLength: 13,
    validate: [
      {
        validator: function (value) {
          // eslint-disable-next-line no-unused-vars
          const [mfrRef, itemCode] = value.split('-');
          return this.category === categoryBySkuCode[itemCode];
        },
        message: (props) => `${props.value} does not match the category of the item.`,
      },
      {
        validator: async function (value) {
          const [mfrRef] = value.split('-');
          const mfr = await mongoose.model('Mfr').findById(this.manufacturer);
          return mfr && mfr.ref === mfrRef;
        },
        message: (props) =>
          `Manufacturer reference in SKU prefix ${props.value} does not match the associated manufacturer`,
      },
    ],
  },
  sku: { type: String, unique: true },
  type: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return typesByCategory[this.category].includes(value);
      },
      message: (props) => `${props.value} is not a valid type for the category ${this.category}`,
    },
  },
  name: { type: String, required: true, maxLength: 100, mingLength: 3 },
  description: { type: String, required: true, maxLength: 500, minLength: 3 },
  stock: { type: Number, required: true },
  madeIn: { type: String, required: true, length: 2 },
  manufacturer: { type: Schema.Types.ObjectId, ref: 'Mfr', required: true },
  basePpu: { type: Number, required: true },
  optionGroups: { type: [OptionGroupSchema], required: true },
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
  return `/inventory/item/${this._id}`;
});

ItemSchema.index({ category: 1, type: 1 });

ItemSchema.method('getProcessedData', async function () {
  const computeOptions = (options, basePpu) =>
    options.map((option) => ({
      ...option.toObject(),
      ppuDiff: Math.round(basePpu - basePpu * option.costModifier * 1000) / 1000,
    }));
  const populateRefs = async (refs) => Promise.all(refs.map(async (ref) => ref.findById(ref.id)));

  const getPpuDiff = (basePpu) => basePpu -

  await this.populate(['manufacturer']);

  const processOptionGroups = async () => {
    return await Promise.all(
      this.optionGroups.map(async (optionGroup) => {
        const { options, refs, quantityPricing, group } = optionGroup;
        let processedOptions;

        if (options && options.length > 0)
          processedOptions = computeOptions(options, this.pricing.basePpu);
        if (refs && refs.length > 0) processedOptions = await populateRefs(refs);
        return { group, options: processedOptions };
      })
    );
  };

  return {
    ...this.toObject(),
    pricing: this.pricing.computedPrices,
    optionGroups: await processOptionGroups(),
  };
});

export default mongoose.model('Item', ItemSchema);
