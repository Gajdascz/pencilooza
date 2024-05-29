import {
  ITEM_CATEGORIES,
  BULK_FACTORS,
  MANUFACTURER_REFS,
  ERASER_REFS,
  GRAPHITE_REFS,
  LEAD_HARDNESSES,
  LEAD_WIDTHS,
  PENCIL_CO_ERASER_COLORS,
  PENCIL_PRINCE_ERASER_COLORS,
} from './constants';

const manufacturers = [
  {
    ref: MANUFACTURER_REFS.PENCIL_CO,
    name: 'PencilCo',
    description: 'A leading bulk manufacturer of basic pencils and supplies.',
    contact: {
      website: 'https://pencilco.com',
      location: '123 Pencil Road, Graphite City, USA',
      email: 'info@pencilco.com',
      phone: '888-555-1234',
    },
  },
  {
    ref: MANUFACTURER_REFS.PENCIL_PRINCE,
    name: 'Pencil Prince',
    description: 'Artisan pencils worthy of royalty.',
    contact: {
      website: 'https://pencilprince.com',
      location: '042 Sharpen St, Scribble Town, ',
      email: 'info@pencilprince.com',
      phone: '888-444-4321',
    },
  },
];
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
        material: 'Pencil Prince Polymere',
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
        material: 'Pencil Prince Polymere',
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
const graphite = [
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

const mechanicalPencils = [
  {
    category: ITEM_CATEGORIES.PENCIL_MECHANICAL,
    manufacturer: MANUFACTURER_REFS.PENCIL_CO,
    name: 'PencilCo Plastic Mechanical',
    description: 'Typical plastic mechanical pencil.',
    made_in: 'China',
    variants: LEAD_HARDNESSES.map((hardness) => ({
      number_in_stock: 100000,
      hardness_grade: hardness,
      body_material: 'plastic',
      eraser: ERASER_REFS.PENCIL_CO_REPLACEMENT,
      graphite: GRAPHITE_REFS.PENCIL_CO,
      colors: ['yellow', 'reb', 'blue', 'green'],
      pricing: {
        cost: 0.25,
        retail: 0.5,
        bulk_factors: BULK_FACTORS,
      },
    })),
  },
];
