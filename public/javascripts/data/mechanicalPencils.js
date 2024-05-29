import {
  ITEM_CATEGORIES,
  BULK_FACTORS,
  MANUFACTURER_REFS,
  ERASER_REFS,
  GRAPHITE_REFS,
  LEAD_HARDNESSES,
  LEAD_WIDTHS,
} from './constants';

const mechanicalPencils = [
  {
    category: ITEM_CATEGORIES.PENCIL_MECHANICAL,
    manufacturer: MANUFACTURER_REFS.PENCIL_CO,
    name: 'PencilCo Plastic Mechanical',
    description: 'Typical plastic mechanical pencil.',
    made_in: 'China',
    variants: LEAD_WIDTHS.map((width) => ({
      number_in_stock: 100000,
      width,
      hardness_grades: LEAD_HARDNESSES,
      body_materials: 'plastic',
      eraser: ERASER_REFS.PENCIL_CO_REPLACEMENT,
      graphite: GRAPHITE_REFS.PENCIL_CO,
      colors: ['yellow', 'red', 'blue', 'green'],
      pricing: {
        cost: 0.2,
        retail: 0.4,
        bulk_factors: BULK_FACTORS,
      },
    })),
  },
  {
    category: ITEM_CATEGORIES.PENCIL_MECHANICAL,
    manufacturer: MANUFACTURER_REFS.PENCIL_PRINCE,
    name: 'Pencil Prince Plastic Mechanical',
    description: 'Mechanical made with a special plastic formula.',
    made_in: 'USA',
    variants: LEAD_WIDTHS.map((width) => ({
      number_in_stock: 10000,
      width,
      hardness_grades: LEAD_HARDNESSES,
      body_material: 'plastic',
      eraser: ERASER_REFS.PENCIL_PRINCE_REPLACEMENT,
      graphite: GRAPHITE_REFS.PENCIL_PRINCE,
      colors: ['yellow', 'red', 'blue', 'green'],
      pricing: {
        cost: 0.25,
        retail: 0.5,
        bulk_factors: BULK_FACTORS,
      },
    })),
  },
  {
    category: ITEM_CATEGORIES.PENCIL_MECHANICAL,
    manufacturer: MANUFACTURER_REFS.PENCIL_CO,
    name: 'Pencil Prince Aircraft Metal Mechanical',
    description: 'Mechanical pencil crafted using high-quality metal alloys.',
    made_in: 'USA',
    variants: LEAD_WIDTHS.map((width) => ({
      number_in_stock: 100000,
      width,
      hardness_grades: LEAD_HARDNESSES,
      body_materials: 'aluminum',
      eraser: ERASER_REFS.PENCIL_PRINCE_REPLACEMENT,
      graphite: GRAPHITE_REFS.PENCIL_CO,
      pricing: {
        cost: 1,
        retail: 2,
        bulk_factors: BULK_FACTORS,
      },
    })),
  },
];

export default mechanicalPencils;
