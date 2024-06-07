import mongoose from 'mongoose';
import { ITEM_GENERAL, TYPES_BY_CATEGORY } from '../../../public/javascripts/utils/constants.js';
import OptionGroupSchema from '../../item/schemas/OptionGroup.js';

const Schema = mongoose.Schema;

const ItemRegistrationSchema = new Schema({
  category: { type: String, required: true, enum: Object.values(ITEM_GENERAL.CATEGORIES) },
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
});

export default ItemRegistrationSchema;
