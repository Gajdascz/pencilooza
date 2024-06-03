import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PricingSchema = new Schema(
  {
    basePpu: { type: Number, required: true },
    bulkCostModifiers: [
      {
        quantity: { type: Number, required: true },
        costModifier: { type: Number, required: true },
      },
    ],
    wholesaleContact: { type: String, required: false },
  },
  { _id: false }
);

PricingSchema.virtual('computedPrices').get(function () {
  return this.bulkCostModifiers.map((bcm) => {
    const { quantity, costModifier } = bcm;
    const ppu = Math.round((this.basePpu - costModifier * this.basePpu) * 1000) / 1000;
    return {
      quantity,
      ppu,
      msrp: ppu * 2,
    };
  });
});

export default PricingSchema;
