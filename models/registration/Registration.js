import mongoose from 'mongoose';
import { PROFILE_TYPES } from '../../public/javascripts/utils/constants.js';
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema(
  {
    type: { type: String, enum: PROFILE_TYPES, required: true },
    data: { type: Schema.Types.Mixed, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    rejectionReason: { type: String, default: '' },
    acceptedModelId: { type: Schema.Types.ObjectId, default: null },
    dataLink: { type: String, default: '' },
  },
  { timestamps: true }
);

RegistrationSchema.pre('save', function (next) {
  if (this.status === 'rejected' && this.rejectionReason.trim() === '') {
    const err = new Error(`Rejected registrations must have a reason.`);
    return next(err);
  }
  if (this.status === 'accepted') {
    if (!this.acceptedModelId || !mongoose.Types.ObjectId.isValid(this.acceptedModelId))
      return next(new Error(`Accepted registration must have a valid Model Id.`));
    if (this.dataLink.trim() === '') return next(new Error(`Accepted registration must have a data link.`));
  }
  return next();
});

RegistrationSchema.virtual('url').get(function () {
  return `/registration/${this._id}`;
});

export default mongoose.model('Registration', RegistrationSchema);
