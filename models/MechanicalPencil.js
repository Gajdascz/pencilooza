import mongoose from 'mongoose';
import Item from './item/Item';
import SkuCounter from './SkuCounter';

const Schema = mongoose.Schema;

const MechanicalPencilSchema = Item.discriminator(
  'MechanicalPencil',
  new Schema({
    body_material: { type: String, required: true },
    eraser: { type: Schema.Types.ObjectId, ref: 'Eraser', required: true },
    graphite: { type: Schema.Types.ObjectId, ref: 'Graphite', required: true },
    colors: { type: [String], required: true },
  })
);

MechanicalPencilSchema.pre('save', async function (next) {
  if (!this.sku) {
    const prefix = 'PNCL';
    let counter = SkuCounter.findOne({ prefix });
    if (!counter) {
      counter = new SkuCounter({ prefix });
      await counter.save();
    }
    this.sku = await counter.nextSku();
  }
  next();
});
