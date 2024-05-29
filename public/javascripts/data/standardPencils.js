import { ITEM_CATEGORIES, BULK_FACTORS, MANUFACTURER_REFS, LEAD_HARDNESSES } from './constants';

const standardPencils = [
  {
    category: ITEM_CATEGORIES.PENCIL_STANDARD,
    manufacturer: MANUFACTURER_REFS.PENCIL_CO,
    name: 'PencilCo Standard',
    description: 'Typical basswood pencil',
    made_in: 'China',
    variants: LEAD_HARDNESSES.map((hardness) => ({
      number_in_stock: 100000,
      hardness_grade: hardness,
      body_material: 'basswood',
      eraser: 'Rubber Generic Pink',
      colors: ['bare', 'yellow', 'reb', 'blue', 'green'],
      pricing: {
        cost: 0.15,
        retail: 0.3,
        bulk_factors: BULK_FACTORS,
      },
    })),
  },
  {
    category: ITEM_CATEGORIES.PENCIL_STANDARD,
    manufacturer: MANUFACTURER_REFS.PENCIL_PRINCE,
    name: 'Pencil Prince Standard',
    description: 'Top quality standard cedar pencil.',
    made_in: 'USA',
    variants: LEAD_HARDNESSES.map((hardness) => ({
      number_in_stock: 1000,
      hardness_grade: hardness,
      body_material: 'cedar',
      eraser: 'Vinyl Pencil Prince Special',
      colors: ['bare', 'yellow', 'red', 'blue', 'green', 'black', 'white', 'purple'],
      pricing: {
        cost: 0.33,
        retail: 0.66,
        bulk_factors: BULK_FACTORS,
      },
    })),
  },
];

export default standardPencils;
