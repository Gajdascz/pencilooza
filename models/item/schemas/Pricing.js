import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const quantityPricingSchema = new Schema(
  {
    bulkCostModifiers: [
      {
        quantity: { type: Number, required: true },
        costModifier: { type: Number, required: true },
      },
    ],
  },
  { _id: false }
);

export default quantityPricingSchema;
