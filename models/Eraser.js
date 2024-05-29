import mongoose from 'mongoose';
import Item from './item/Item';
import SkuCounter from './SkuCounter';

const Schema = mongoose.Schema;

const EraserSchema = Item.discriminator(
  'Eraser',
  new Schema({
    type: { type: String, required: true },
    colors: { type: [String], required: false },
  })
);

EraserSchema.pre('save', async function (next) {
  if (!this.sku) {
    const prefix = 'ERSR';
    let counter = await SkuCounter.findOne({ prefix });
    if (!counter) {
      counter = new SkuCounter({ prefix });
      await counter.save();
    }
    this.sku = await counter.nextSku();
  }
  next();
});

export default mongoose.model('Eraser', EraserSchema);
