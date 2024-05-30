import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OptionGroupSchema = new Schema({
  group: { type: String, required: true },
  ref: { type: String, required: false },
  options: [
    {
      type: {
        option: { type: String, required: true },
        cost_modifier: { type: Number, default: 0 },
      },
      required: false,
    },
  ],
});

OptionGroupSchema.pre('validate', function (next) {
  if (!this.ref && (!this.options || this.options.length === 0))
    return next(new Error(`Reference or Options must be provided.`));
  if (this.ref && this.options && this.options.length > 0)
    return next(new Error(`Reference and Options cannot both be provided.`));
  return next();
});

export default OptionGroupSchema;
