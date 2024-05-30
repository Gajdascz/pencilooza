import { ERASER_REFS } from './erasers';
import { GRAPHITE_REFS } from './graphites';

const PENCIL_REFS = {
  WOOD_STANDARD: 'woodStandard',
  PLASTIC_MECHANICAL: 'plasticMechanical',
  METAL_MECHANICAL: 'metalMechanical',
  WOOD_MECHANICAL: 'woodMechanical',
};

const PENCIL_BULK_COST_MODIFIERS = [
  { QTY: 100, MODIFIER: 0 },
  { QTY: 250, MODIFIER: 0.05 },
  { QTY: 500, MODIFIER: 0.1 },
  { QTY: 1000, MODIFIER: 0.15 },
  { QTY: 10000, MODIFIER: 0.2 },
];

const PENCILS = [
  {
    REF: PENCIL_REFS.WOOD_STANDARD,
    NAME: 'Pencil Prince Standard Wooden Pencil',
    DESCRIPTION: 'Top quality standard wooden cedar pencil.',
    MADE_IN: 'USA',
    STOCK: Math.ceil(Math.random() * 10000),
    PRICING: { COST: 0.16, BULK_COST_MODIFIERS: PENCIL_BULK_COST_MODIFIERS },
    OPTIONS: {
      COLOR: [
        { OPT: 'bare', MODIFIER: 0 },
        { OPT: 'yellow', MODIFIER: 0 },
        { OPT: 'custom', MODIFIER: 0.18 },
      ],
      HARDNESS_GRADE: [
        { OPT: 'H', MODIFIER: 0 },
        { OPT: 'HB', MODIFIER: 0 },
        { OPT: 'B', MODIFIER: 0 },
      ],
      BODY_MATERIAL: [
        { OPT: 'basswood', MODIFIER: 0 },
        { OPT: 'incense cedar', MODIFIER: 0.25 },
      ],
      ERASER: [ERASER_REFS.FIXED_STANDARD],
    },
  },
  {
    REF: PENCIL_REFS.PLASTIC_MECHANICAL,
    NAME: 'Pencil Prince Plastic Mechanical',
    DESCRIPTION: 'Mechanical pencil made using a special plastic formula for improved durability.',
    MADE_IN: 'USA',
    STOCK: Math.ceil(Math.random() * 10000),
    PRICING: { COST: 0.08, BULK_COST_MODIFIERS: PENCIL_BULK_COST_MODIFIERS },
    OPTIONS: {
      COLOR: [
        { OPT: 'pink', MODIFIER: 0 },
        { OPT: 'white', MODIFIER: 0 },
        { OPT: 'black', MODIFIER: 0 },
        { OPT: 'red', MODIFIER: 0 },
        { OPT: 'blue', MODIFIER: 0 },
        { OPT: 'green', MODIFIER: 0 },
        { OPT: 'purple', MODIFIER: 0 },
        { OPT: 'gold', MODIFIER: 0 },
      ],
      GRAPHITE: [...GRAPHITE_REFS],
      ERASER: [ERASER_REFS.MECHANICAL_STANDARD],
    },
  },
  {
    REF: PENCIL_REFS.METAL_MECHANICAL,
    NAME: 'Pencil Prince Metal Mechanical',
    DESCRIPTION: 'Premium-quality solid metal mechanical pencil.',
    MADE_IN: 'USA',
    STOCK: Math.ceil(Math.random() * 10000),
    PRICING: { COST: 1.75, BULK_COST_MODIFIERS: 'contact' },
    OPTIONS: {
      BODY_MATERIAL: [
        { OPT: 'aluminum', MODIFIER: 0 },
        { OPT: 'copper', MODIFIER: 0.75 },
        { OPT: 'stainless', MODIFIER: 1 },
        { OPT: 'titanium', MODIFIER: 3 },
      ],
      GRAPHITE: [...GRAPHITE_REFS],
      ERASER: [ERASER_REFS.MECHANICAL_STANDARD],
    },
  },
  {
    REF: PENCIL_REFS.WOOD_MECHANICAL,
    NAME: 'Pencil Prince Wooden Mechanical',
    DESCRIPTION: 'Premium-quality wooden mechanical pencil.',
    MADE_IN: 'USA',
    STOCK: Math.ceil(Math.random() * 10000),
    PRICING: { COST: 1.85, BULK_COST_MODIFIERS: 'contact' },
    OPTIONS: {
      BODY_MATERIAL: [
        { OPT: 'oak', MODIFIER: 0 },
        { OPT: 'maple', MODIFIER: 1 },
        { OPT: 'pink-ivory', MODIFIER: 3 },
        { OPT: 'exotic-ebony', MODIFIER: 5 },
      ],
      TRIM_MATERIAL: [
        { OPT: 'stainless', MODIFIER: 0 },
        { OPT: 'titanium', MODIFIER: 0.75 },
        { OPT: 'gold', MODIFIER: 5 },
        { OPT: 'platinum', MODIFIER: 7.5 },
      ],

      GRAPHITE: [...GRAPHITE_REFS],
      ERASER: [ERASER_REFS.MECHANICAL_STANDARD],
    },
  },
];

export { PENCILS, PENCIL_REFS };
