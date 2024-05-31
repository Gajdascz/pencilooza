import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SkuCounterSchema = new Schema({
  prefix: { type: String },
  sku: { type: Number, default: -1 },
});

SkuCounterSchema.virtual('current').get(function () {
  return `${this.prefix}-${String(this.sku).padStart(10, 0)}`;
});

SkuCounterSchema.method('nextSku', async function () {
  this.sku += 1;
  await this.save();
  return this.current;
});

export default mongoose.model('SkuCounter', SkuCounterSchema);
