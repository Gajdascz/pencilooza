import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PricingSchema = new Schema({
  cost: { type: Number, required: true },
  retail: { type: Number, required: true },
  bulk_factors: [{ min_quantity: { type: Number }, factor: { type: Number } }],
});

PricingSchema.virtual('bulk_prices').get(() =>
  this.bulk_factors.map((bulkFactor) => ({
    quantity: bulkFactor.min_quantity,
    price: bulkFactor.factor * this.retail * bulkFactor.min_quantity,
  }))
);

export default PricingSchema;
