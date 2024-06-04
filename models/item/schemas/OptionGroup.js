import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OptionGroupSchema = new Schema(
  {
    groupName: { type: String, required: true },
    refs: { type: [{ type: Schema.Types.ObjectId, ref: 'Item' }], required: false },
    options: [
      {
        type: {
          optionName: { type: String, required: true },
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
