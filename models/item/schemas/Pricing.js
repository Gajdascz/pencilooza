import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PricingSchema = new Schema(
  {
    cost: { type: Number, required: true },
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

PricingSchema.virtual('bulkPrices').get(function () {
  return this.bulkCostModifiers.map((bulkModifier) => ({
    quantity: bulkModifier.quantity,
    price: bulkModifier.costModifier * this.cost * bulkModifier.quantity,
  }));
});

PricingSchema.virtual('suggestedRetail').get(function () {
  return this.cost * 2;
});

export default PricingSchema;
