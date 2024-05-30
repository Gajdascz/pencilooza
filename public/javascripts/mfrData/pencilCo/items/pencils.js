import { ERASER_REFS } from './erasers';
import { GRAPHITE_REFS } from './graphites';

const PENCIL_REFS = {
  WOOD_STANDARD: 'PNCLCO_woodStandard',
  PLASTIC_MECHANICAL: 'PNCLCO_plasticMechanical',
};

const pencil_bulk_cost_modifiers = [
  { quantity: 100, bulk_cost_modifier: 0 },
  { quantity: 250, bulk_cost_modifier: 0.05 },
  { quantity: 500, bulk_cost_modifier: 0.1 },
  { quantity: 1000, bulk_cost_modifier: 0.15 },
  { quantity: 10000, bulk_cost_modifier: 0.2 },
];

const pencils = [
  {
    name: 'PencilCo Standard Wooden Pencil',
    description: 'Standard wooden pencil by PencilCo.',
    made_in: 'China',
    ref: PENCIL_REFS.WOOD_STANDARD,
    stock: Math.ceil(Math.random() * 100000),
    pricing: { cost: 0.12, bulk_cost_modifiers: pencil_bulk_cost_modifiers },
    options: [
      {
        group: 'color',
        options: [
          { option: 'bare', cost_modifier: 0 },
          { option: 'yellow', cost_modifier: 0 },
          { option: 'custom', cost_modifier: 0.2 },
        ],
      },
      {
        group: 'hardness_grade',
        options: [
          { option: 'H', cost_modifier: 0 },
          { option: 'HB', cost_modifier: 0 },
          { option: 'B', cost_modifier: 0 },
        ],
      },
      {
        group: 'body_material',
        options: [
          { option: 'basswood', cost_modifier: 0 },
          { option: 'incense cedar', cost_modifier: 0.5 },
        ],
      },
      {
        group: 'eraser',
        options: ERASER_REFS.FIXED_STANDARD,
      },
    ],
  },
  {
    name: 'PencilCo Standard Plastic Mechanical Pencil',
    description: 'Standard plastic mechanical pencil by PencilCo.',
    made_in: 'China',
    ref: PENCIL_REFS.PLASTIC_MECHANICAL,
    stock: Math.ceil(Math.random() * 100000),
    pricing: { COST: 0.04, bulk_cost_modifiers: pencil_bulk_cost_modifiers },
    optionGroups: [
      {
        group: 'color',
        options: [
          { option: 'black', cost_modifier: 0 },
          { option: 'red', cost_modifier: 0 },
          { option: 'blue', cost_modifier: 0 },
          { option: 'green', cost_modifier: 0 },
        ],
      },
      { group: 'graphite', ref: GRAPHITE_REFS.STANDARD },
      { group: 'eraser', ref: ERASER_REFS.MECHANICAL_STANDARD },
    ],
  },
];

export { pencils, PENCIL_REFS };
