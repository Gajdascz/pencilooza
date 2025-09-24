import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema(
  {
    type: { type: String, enum: ['manufacturer'], required: true },
    data: { type: Schema.Types.Mixed, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    rejectionReason: { type: String, default: '' },
    acceptedEntityId: { type: Schema.Types.ObjectId, default: null },
    dataLink: { type: String, default: '' },
  },
  { timestamps: true }
);

ApplicationSchema.pre('save', function (next) {
  if (this.status === 'rejected' && this.rejectionReason.trim() === '') {
    const err = new Error(`Rejected applications must have a reason.`);
    return next(err);
  }
  if (this.status === 'accepted') {
    if (!this.acceptedEntityId || !mongoose.Types.ObjectId.isValid(this.acceptedEntityId))
      return next(new Error(`Accepted application must have a valid Model Id.`));
    if (this.dataLink.trim() === '') return next(new Error(`Accepted application must have a data link.`));
  }
  return next();
});

ApplicationSchema.virtual('url').get(function () {
  return `/application/${this._id}`;
});

export default mongoose.model('Application', ApplicationSchema);
