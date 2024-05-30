const ERASER_REFS = {
  FIXED_STANDARD: 'fixedStandard',
  MECHANICAL_STANDARD: 'mechanicalStandard',
  cap_STANDARD: 'capStandard',
};

const eraser_types = {
  cap: 'cap',
  fixed: 'fixed',
  mechanical: 'mechanical',
};

const eraser_colors = [
  { option: 'pink', cost_modifier: 0 },
  { option: 'white', cost_modifier: 0 },
  { option: 'red', cost_modifier: 0 },
  { option: 'blue', cost_modifier: 0 },
  { option: 'green', cost_modifier: 0 },
  { option: 'variety', cost_modifier: 0 },
];

const eraser_materials = [
  { option: 'rubber', cost_modifier: 0 },
  { option: 'polymer', cost_modifier: 0.2 },
];

const eraser_bulk_cost_modifiers = [
  { quantity: 100, cost_modifier: 0 },
  { quantity: 250, cost_modifier: 0.05 },
  { quantity: 500, cost_modifier: 0.1 },
  { quantity: 1000, cost_modifier: 0.15 },
  { quantity: 10000, cost_modifier: 0.2 },
];

const erasers = [
  {
    TYPE: eraser_types.fixed,
    ITEMS: [
      {
        ref: ERASER_REFS.FIXED_STANDARD,
        name: 'PencilCo Standard Fixed Pencil Eraser.',
        description:
          'Eraser fixed to the end of a standard wooden pencil. Used when configuring pencils for creation.',
        made_in: 'China',
        stock: Math.ceil(Math.random() * 100000),
        pricing: { cost: 0.01 },
        options: { cost: eraser_colors, material: eraser_materials },
      },
    ],
  },
  {
    TYPE: eraser_types.cap,
    ITEMS: [
      {
        ref: ERASER_REFS.cap_STANDARD,
        name: 'PencilCo cap Eraser',
        description: 'Standard reusable erasers placed on the end of a pencil.',
        made_in: 'China',
        stock: Math.ceil(Math.random() * 100000),
        pricing: { cost: 0.02, bulk_cost_modifiers: eraser_bulk_cost_modifiers },
        options: { cost: eraser_colors, material: eraser_materials },
      },
    ],
  },
  {
    TYPE: eraser_types.mechanical,
    ITEMS: [
      {
        ref: ERASER_REFS.MECHANICAL_STANDARD,
        name: 'PencilCo Mechanical Pencil Standard Eraser Replacement.',
        description: 'Replacement eraser that fits all PencilCo mechanical pencils',
        made_in: 'China',
        stock: Math.ceil(Math.random() * 100000),
        pricing: { cost: 0.01, bulk_cost_modifiers: eraser_bulk_cost_modifiers },
        options: { cost: eraser_colors, material: eraser_materials },
      },
    ],
  },
];

export { erasers, ERASER_REFS };
