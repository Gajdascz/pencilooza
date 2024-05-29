import mongoose from 'mongoose';
import Item from './item/Item';
import SkuCounter from './SkuCounter';

const Schema = mongoose.Schema;

const StandardPencilSchema = Item.discriminator(
  'StandardPencil',
  new Schema({
    lead_hardness: { type: String, required: true },
    body_material: { type: String, required: true },
    eraser: { type: String, required: true },
    colors: { type: [String], required: true },
    variations: [
      {
        lead_hardness: { type: String, required: true },
      },
    ],
  })
);

StandardPencilSchema.pre('save', async function (next) {
  if (!this.sku) {
    const prefix = 'SPNCL';
    let counter = SkuCounter.findOne({ prefix });
    if (!counter) {
      counter = new SkuCounter({ prefix });
      await counter.save();
    }
    this.sku = await counter.nextSku();
  }
  next();
});
