const ERASER_TYPES = {
  CAP: 'cap',
  FIXED: 'fixed',
  MECHANICAL: 'mechanical',
};

const ERASER_COLORS = [
  { OPT: 'pink', MODIFIER: 0 },
  { OPT: 'white', MODIFIER: 0 },
  { OPT: 'black', MODIFIER: 0 },
  { OPT: 'red', MODIFIER: 0 },
  { OPT: 'blue', MODIFIER: 0 },
  { OPT: 'green', MODIFIER: 0 },
  { OPT: 'purple', MODIFIER: 0 },
  { OPT: 'gold', MODIFIER: 0 },
  { OPT: 'variety', MODIFIER: 0 },
];

const ERASER_MATERIALS = [
  { OPT: 'polymer', MODIFIER: 0 },
  { OPT: 'vinyl', MODIFIER: 0.25 },
];

const ERASER_BULK_COST_MODIFIERS = [
  { QTY: 100, MODIFIER: 0 },
  { QTY: 250, MODIFIER: 0.05 },
  { QTY: 500, MODIFIER: 0.1 },
  { QTY: 1000, MODIFIER: 0.15 },
  { QTY: 10000, MODIFIER: 0.2 },
];

const ERASER_REFS = {
  FIXED_STANDARD: 'fixedStandard',
  MECHANICAL_STANDARD: 'mechanicalStandard',
  CAP_STANDARD: 'capStandard',
};

const ERASER_OPTIONS = { COLOR: ERASER_COLORS, MATERIAL: ERASER_MATERIALS };

const ERASERS = [
  {
    TYPE: ERASER_TYPES.FIXED,
    ITEMS: [
      {
        REF: ERASER_REFS.FIXED_STANDARD,
        NAME: 'Pencil Prince Quality Fixed Eraser',
        DESCRIPTION:
          'High quality eraser fixed to the end of a wooden pencil. Used when configuring pencils for creation.',
        MADE_IN: 'USA',
        STOCK: Math.ceil(Math.random() * 10000),
        PRICING: { COST: 0.02 },
        OPTIONS: ERASER_OPTIONS,
      },
    ],
  },
  {
    TYPE: ERASER_TYPES.CAP,
    ITEMS: [
      {
        REF: ERASER_REFS.CAP_STANDARD,
        NAME: 'Pencil Prince Quality Cap Eraser',
        DESCRIPTION: 'High quality reusable erasers placed on the end of a pencil.',
        MADE_IN: 'USA',
        STOCK: Math.ceil(Math.random() * 2500),
        PRICING: { COST: 0.04, BULK_COST_MODIFIERS: ERASER_BULK_COST_MODIFIERS },
        OPTIONS: ERASER_OPTIONS,
      },
    ],
  },
  {
    TYPE: ERASER_TYPES.MECHANICAL,
    ITEMS: [
      {
        REF: ERASER_REFS.MECHANICAL_STANDARD,
        NAME: 'Pencil Prince Quality Mechanical Pencil Eraser',
        DESCRIPTION:
          'High quality replacement eraser that fits all Pencil Prince Mechanical Pencils.',
        MADE_IN: 'USA',
        STOCK: Math.ceil(Math.random() * 10000),
        PRICING: { COST: 0.02, BULK_COST_MODIFIERS: ERASER_BULK_COST_MODIFIERS },
        OPTIONS: ERASER_OPTIONS,
      },
    ],
  },
];
export { ERASERS, ERASER_REFS };
