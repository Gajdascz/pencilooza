import {
  ITEM_CATEGORIES,
  BULK_FACTORS,
  MANUFACTURER_REFS,
  ERASER_REFS,
  PENCIL_CO_ERASER_COLORS,
  PENCIL_PRINCE_ERASER_COLORS,
} from './constants';

const erasers = [
  {
    ref: ERASER_REFS.PENCIL_CO_CAP,
    category: ITEM_CATEGORIES.ERASER,
    name: 'Cap (PencilCo)',
    description: 'Standard reusable erasers placed on top of the original eraser.',
    made_in: 'China',
    manufacturer: MANUFACTURER_REFS.PENCIL_CO,
    type: 'cap',
    variants: [
      {
        number_in_stock: 100000,
        material: 'rubber',
        pricing: {
          cost: 0.05,
          retail: 0.2,
          bulk_factors: BULK_FACTORS,
        },
        colors: PENCIL_CO_ERASER_COLORS,
      },
    ],
  },
  {
    ref: ERASER_REFS.PENCIL_CO_REPLACEMENT,
    category: ITEM_CATEGORIES.ERASER,
    name: 'Mechanical Replacement (PencilCo)',
    description: 'Replacement eraser that fits all PencilCo mechanical pencils.',
    made_in: 'China',
    manufacturer: MANUFACTURER_REFS.PENCIL_CO,
    variants: [
      {
        number_in_stock: 100000,
        material: 'rubber',
        pricing: {
          cost: 0.025,
          retail: 0.05,
          bulk_factors: BULK_FACTORS,
          colors: PENCIL_CO_ERASER_COLORS,
        },
      },
    ],
  },
  {
    ref: ERASER_REFS.PENCIL_PRINCE_CAP,
    category: ITEM_CATEGORIES.ERASER,
    name: 'Cap (Pencil Prince)',
    description: 'Top quality reusable erasers placed on the end of a pencil.',
    made_in: 'USA',
    manufacturer: MANUFACTURER_REFS.PENCIL_PRINCE,
    type: 'cap',
    variants: [
      {
        number_in_stock: 10000,
        material: 'Pencil Prince Polymer',
        pricing: {
          cost: 0.25,
          retail: 0.5,
          bulk_factors: BULK_FACTORS,
        },
        colors: PENCIL_PRINCE_ERASER_COLORS,
      },
      {
        number_in_stock: 1000,
        material: 'Pencil Prince Vinyl',
        pricing: {
          cost: 0.5,
          retail: 1.0,
          bulk_factors: BULK_FACTORS,
        },
        colors: PENCIL_PRINCE_ERASER_COLORS,
      },
    ],
  },
  {
    ref: ERASER_REFS.PENCIL_PRINCE_REPLACEMENT,
    category: ITEM_CATEGORIES.ERASER,
    name: 'Mechanical Replacement (Pencil Prince)',
    description: 'Top quality replacement eraser that fits all Pencil Prince mechanical pencils.',
    made_in: 'USA',
    type: 'replacement',
    manufacturer: MANUFACTURER_REFS.PENCIL_PRINCE,
    variants: [
      {
        number_in_stock: 100000,
        material: 'Pencil Prince Polymer',
        pricing: {
          cost: 0.15,
          retail: 0.3,
          bulk_factors: BULK_FACTORS,
        },
        colors: PENCIL_PRINCE_ERASER_COLORS,
      },
      {
        number_in_stock: 100000,
        material: 'Pencil Prince Vinyl',
        pricing: {
          cost: 0.4,
          retail: 0.8,
          bulk_factors: BULK_FACTORS,
        },
        colors: PENCIL_PRINCE_ERASER_COLORS,
      },
    ],
  },
];

export default erasers;
