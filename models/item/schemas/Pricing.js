import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PricingSchema = new Schema({
  cost: { type: Number, required: true },
  bulk_cost_modifiers: [{ quantity: { type: Number }, cost_modifier: { type: Number } }],
});

PricingSchema.virtual('bulk_prices').get(function () {
  return this.bulk_modifiers.map((bulkModifier) => ({
    quantity: bulkModifier.quantity,
    price: bulkModifier.Modifier * this.cost * bulkModifier.quantity,
  }));
});

PricingSchema.virtual('suggested_retail').get(function () {
  return this.cost * 2;
});

export default PricingSchema;
