import mongoose from 'mongoose';

import SkuCounter from '../SkuCounter.js';
import OptionGroupSchema from './schemas/OptionGroup.js';
import { ITEM_GENERAL, ITEM_PENCIL, ITEM_ERASER, ITEM_GRAPHITE, TYPES_BY_CATEGORY } from '../../config/constants.js';

const Schema = mongoose.Schema;

const categoryBySkuCode = {
  [ITEM_PENCIL.SKU_CODE]: ITEM_PENCIL.CATEGORY,
  [ITEM_ERASER.SKU_CODE]: ITEM_ERASER.CATEGORY,
  [ITEM_GRAPHITE.SKU_CODE]: ITEM_GRAPHITE.CATEGORY,
};
const ItemSchema = new Schema(
  {
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
            const [manufacturerRef, itemCode] = value.split('-');
            return this.category === categoryBySkuCode[itemCode];
          },
          message: (props) => `${props.value} does not match the category of the item.`,
        },
        {
          validator: async function (value) {
            const [manufacturerRef] = value.split('-');
            const manufacturer = await mongoose.model('Manufacturer').findById(this.manufacturer);
            return manufacturer && manufacturer.company.ref === manufacturerRef;
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
          return TYPES_BY_CATEGORY[this.category].includes(value);
        },
        message: (props) => `${props.value} is not a valid type for the category ${this.category}`,
      },
    },
    name: { type: String, required: true, maxLength: 100, mingLength: 3 },
    description: { type: String, required: true, maxLength: 500, minLength: 3 },
    stock: { type: Number, required: true },
    madeIn: { type: String, required: true, length: 2 },
    manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
    basePpu: { type: Number, required: true },
    quantityPricing: {
      type: [
        {
          quantity: { type: Number, required: true },
          costModifier: { type: Number, required: true },
        },
      ],
      required: true,
    },
    optionGroups: { type: [OptionGroupSchema], required: false },
  },
  { timestamps: true }
);

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
  return `/item/${this._id}`;
});

ItemSchema.method('getProcessedData', async function () {
  const getPpuDiff = (costModifier) => Math.round(this.basePpu * costModifier * 100) / 100;
  const populateRefs = async (refs) => {
    return Promise.all(
      refs.map(async ({ itemId, costModifier }) => {
        const item = await mongoose.model('Item').findById(itemId.toString());
        return {
          optionName: item.name,
          ppuDiff: getPpuDiff(costModifier),
          link: item.url,
        };
      })
    );
  };
  const processOptions = (options) =>
    options.map(({ optionName, costModifier }) => ({
      optionName,
      ppuDiff: getPpuDiff(costModifier),
    }));

  await this.populate(['manufacturer']);

  const processOptionGroups = async () => {
    return await Promise.all(
      this.optionGroups.map(async (optionGroup) => {
        const { options, refs, groupName } = optionGroup;
        let processedOptions;
        if (options && options.length > 0) processedOptions = processOptions(options);
        else if (refs && refs.length > 0) processedOptions = await populateRefs(refs);
        else throw new Error(`Options or Refs must exist`);
        return { groupName, options: processedOptions };
      })
    );
  };
  const processQuantityPricing = () =>
    this.quantityPricing
      .filter(({ quantity, costModifier }) => this.stock > quantity)
      .map(({ quantity, costModifier }) => ({ quantity, ppuDiff: -getPpuDiff(costModifier) }));

  return {
    ...this.toObject(),
    quantityPricing: processQuantityPricing(),
    optionGroups: await processOptionGroups(),
  };
});

export default mongoose.model('Item', ItemSchema);
