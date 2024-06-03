import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OptionGroupSchema = new Schema(
  {
    group: { type: String, required: true },
    quantityPricing: {
      type: [
        { option: { type: String, required: true }, costModifier: { type: Number, default: 0 } },
      ],
      required: true,
    },
    refs: { type: [String], required: false },
    options: [
      {
        type: {
          option: { type: String, required: true },
          costModifier: { type: Number, default: 0 },
        },
        required: false,
      },
    ],
  },
  { _id: false }
);

OptionGroupSchema.pre('validate', function (next) {
  if (!this.refs && (!this.options || this.options.length === 0))
    return next(new Error(`Reference or Options must be provided.`));
  if (this.refs && this.refs.length > 0 && this.options && this.options.length > 0)
    return next(new Error(`Reference and Options cannot both be provided.`));
  return next();
});

export default OptionGroupSchema;
