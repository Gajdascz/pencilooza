const GRAPHITE_BULK_COST_MODIFIERS = [
  { QTY: 100, MODIFIER: 0 },
  { QTY: 250, MODIFIER: 0.05 },
  { QTY: 500, MODIFIER: 0.1 },
  { QTY: 1000, MODIFIER: 0.15 },
  { QTY: 10000, MODIFIER: 0.2 },
];
const GRAPHITE_REFS = {
  STANDARD: 'graphiteStandard',
  PREMIUM: 'graphitePremium',
  ROYAL: 'graphiteRoyal',
};

const HARDNESS_GRADES = [
  { OPT: '2H', MODIFIER: 0 },
  { OPT: 'H', MODIFIER: 0 },
  { OPT: 'HB', MODIFIER: 0 },
  { OPT: 'B', MODIFIER: 0 },
  { OPT: '2B', MODIFIER: 0 },
];

const WIDTHS = [
  { OPT: '0.3mm', MODIFIER: 0 },
  { OPT: '0.5mm', MODIFIER: 0 },
  { OPT: '0.7mm', MODIFIER: 0 },
  { OPT: '0.9mm', MODIFIER: 0.01 },
];

const GRAPHITES = [
  {
    REF: GRAPHITE_REFS.STANDARD,
    NAME: 'Pencil Prince Standard Replacement Graphite',
    DESCRIPTION:
      'Standard replacement lead using a precise blend of high-purity graphite and quality binders. Each package comes with 50 pieces.',
    MADE_IN: 'USA',
    STOCK: Math.ceil(Math.random() * 10000),
    PRICING: { COST: 0.08, BULK_COST_MODIFIERS: GRAPHITE_BULK_COST_MODIFIERS },
    OPTIONS: { HARDNESS_GRADE: HARDNESS_GRADES, WIDTH: WIDTHS },
  },
  {
    REF: GRAPHITE_REFS.PREMIUM,
    NAME: 'Pencil Prince Premium Replacement Graphite',
    DESCRIPTION:
      'Premium-quality replacement lead that uses a specialty mixture including high-purity graphite. Each package comes with 50 pieces.',
    MADE_IN: 'USA',
    STOCK: Math.ceil(Math.random() * 7500),
    PRICING: { COST: 0.1, BULK_COST_MODIFIERS: GRAPHITE_BULK_COST_MODIFIERS },
    OPTIONS: { HARDNESS_GRADE: HARDNESS_GRADES, WIDTH: WIDTHS },
  },
  {
    REF: GRAPHITE_REFS.ROYAL,
    NAME: 'Pencil Prince Royal Replacement Graphite',
    DESCRIPTION:
      'Royal-quality replacement lead crafted using a research-backed proprietary mixture including only the highest quality materials. Each package comes with 50 pieces.',
    MADE_IN: 'USA',
    STOCK: Math.ceil(Math.random() * 5000),
    PRICING: { COST: 0.15, BULK_COST_MODIFIERS: GRAPHITE_BULK_COST_MODIFIERS },
    OPTIONS: { HARDNESS_GRADE: HARDNESS_GRADES, WIDTH: WIDTHS },
  },
];

export { GRAPHITES, GRAPHITE_REFS };
