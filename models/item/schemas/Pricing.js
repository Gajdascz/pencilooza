import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PricingSchema = new Schema({
  cost: { type: Number, required: true },
  bulkCostModifiers: [{ quantity: { type: Number }, costModifier: { type: Number } }],
  wholesaleContact: { type: String, required: false },
});

PricingSchema.virtual('getBulkPrices').get(function () {
  return this.bulkCostModifiers.map((bulkModifier) => ({
    quantity: bulkModifier.quantity,
    price: bulkModifier.costModifier * this.cost * bulkModifier.quantity,
  }));
});

PricingSchema.virtual('getSuggestedRetail').get(function () {
  return this.cost * 2;
});

export default PricingSchema;
