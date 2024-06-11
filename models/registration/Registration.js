import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RegistrationSchema = new Schema(
  {
    type: { type: String, enum: ['Manufacturer', 'Item'], required: true },
    data: { type: Schema.Types.Mixed, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    rejectionReason: { type: String, default: '' },
    dataLink: { type: String, default: '' },
  },
  { timestamps: true }
);

RegistrationSchema.pre('save', function (next) {
  if (this.status === 'rejected' && this.rejectionReason.trim() === '') {
    const err = new Error(`Rejected registrations must have a reason.`);
    return next(err);
  }
  if (this.status === 'accepted' && this.dataLink.trim() === '') {
    const err = new Error(`Accepted registration must have a data link.`);
    return next(err);
  }
  next();
});

RegistrationSchema.virtual('url').get(function () {
  return `/inventory/registration-status/${this._id}`;
});

export default mongoose.model('Registration', RegistrationSchema);
