import mongoose from 'mongoose';
import Item from './item/Item';
import SkuCounter from './SkuCounter';

const Schema = mongoose.Schema;

const GraphiteSchema = Item.discriminator(
  'Graphite',
  new Schema({
    hardness: { type: String, required: true },
    width: { type: Number, required: true },
  })
);

GraphiteSchema.pre('save', async function (next) {
  if (!this.sku) {
    const prefix = 'GRPH';
    let counter = await SkuCounter.findOne({ prefix });
    if (!counter) {
      counter = new SkuCounter({ prefix });
      await counter.save();
    }
    this.sku = await counter.nextSku();
  }
  next();
});

export default mongoose.model('Graphite', GraphiteSchema);
