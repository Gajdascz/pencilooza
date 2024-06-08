import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RegistrationSchema = new Schema(
  {
    type: { type: String, enum: ['manufacturer', 'item'], required: true },
    data: { type: Schema.Types.Mixed, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

RegistrationSchema.virtual('url').get(function () {
  return `/inventory/form-status/${this._id}`;
});

export default mongoose.model('Registration', RegistrationSchema);
