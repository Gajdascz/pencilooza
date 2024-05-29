import {
  ITEM_CATEGORIES,
  BULK_FACTORS,
  MANUFACTURER_REFS,
  GRAPHITE_REFS,
  LEAD_HARDNESSES,
  LEAD_WIDTHS,
} from './constants';

const graphites = [
  {
    ref: GRAPHITE_REFS.PENCIL_CO_STANDARD,
    category: ITEM_CATEGORIES.GRAPHITE,
    name: 'PencilCo Standard',
    description:
      'Standard replacement lead using a generic blend and standard quality graphite. Each package comes with 50 pieces.',
    made_in: 'China',
    manufacturer: MANUFACTURER_REFS.PENCIL_CO,
    variants: LEAD_WIDTHS.map((width) => ({
      number_in_stock: 100000,
      width,
      hardness_grades: LEAD_HARDNESSES,
      pricing: {
        cost: 0.2,
        retail: 0.4,
        bulk_factors: BULK_FACTORS,
      },
    })),
  },
  {
    ref: GRAPHITE_REFS.PENCIL_PRINCE_STANDARD,
    category: ITEM_CATEGORIES.GRAPHITE,
    name: 'Pencil Prince Standard',
    description:
      'Standard replacement lead using a precise blend and standard purity graphite. Each package comes with 50 pieces.',
    made_in: 'USA',
    manufacturer: MANUFACTURER_REFS.PENCIL_PRINCE,
    variants: LEAD_WIDTHS((width) => ({
      number_in_stock: 10000,
      width,
      hardness_grades: LEAD_HARDNESSES,
      pricing: {
        cost: 0.25,
        retail: 0.5,
        bulk_factors: BULK_FACTORS,
      },
    })),
  },
  {
    ref: GRAPHITE_REFS.PENCIL_PRINCE_PREMIUM,
    category: ITEM_CATEGORIES.GRAPHITE,
    name: 'Pencil Prince Premium',
    description:
      'Premium-quality replacement lead that uses a specialty mixture including high-purity graphite. Each package comes with 50 pieces.',
    made_in: 'USA',
    manufacturer: MANUFACTURER_REFS.PENCIL_PRINCE,
    variants: LEAD_WIDTHS((width) => ({
      number_in_stock: 10000,
      width,
      hardness_grades: LEAD_HARDNESSES,
      pricing: {
        cost: 0.33,
        retail: 0.66,
        bulk_factors: BULK_FACTORS,
      },
    })),
  },
  {
    ref: GRAPHITE_REFS.PENCIL_PRINCE_ROYAL,
    category: ITEM_CATEGORIES.GRAPHITE,
    name: 'Pencil Prince Royal',
    description:
      'Royal-quality replacement lead that uses a research-backed proprietary mixture including only the highest quality materials. Each package comes with 50 pieces.',
    made_in: 'USA',
    manufacturer: MANUFACTURER_REFS.PENCIL_PRINCE,
    variants: LEAD_WIDTHS((width) => ({
      number_in_stock: 1000,
      width,
      hardness_grades: LEAD_HARDNESSES,
      pricing: {
        cost: 0.75,
        retail: 1.5,
        bulk_factors: BULK_FACTORS,
      },
    })),
  },
];

export default graphites;
