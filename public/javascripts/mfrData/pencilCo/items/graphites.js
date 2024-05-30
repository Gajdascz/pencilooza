const GRAPHITE_REFS = {
  STANDARD: 'graphiteStandard',
};

const graphite_bulk_cost_modifiers = [
  { quantity: 100, cost_modifier: 0 },
  { quantity: 250, cost_modifier: 0.05 },
  { quantity: 500, cost_modifier: 0.1 },
  { quantity: 1000, cost_modifier: 0.15 },
  { quantity: 10000, cost_modifier: 0.2 },
];

const hardness_grades = [
  { option: 'H', cost_modifier: 0 },
  { option: 'HB', cost_modifier: 0 },
  { option: 'B', cost_modifier: 0 },
];

const widths = [
  { option: '0.3mm', cost_modifier: 0 },
  { option: '0.5mm', cost_modifier: 0 },
  { option: '0.7mm', cost_modifier: 0 },
  { option: '0.9mm', cost_modifier: 0.01 },
];

const graphites = [
  {
    NAME: 'PencilCo Standard Graphite',
    DESCRIPTION:
      'Replacement graphite for mechanical pencils by PencilCo. Each unit comes with 50 individual sticks of graphite each roughly 4 inches tall.',
    MADE_IN: 'China',
    REF: GRAPHITE_REFS.STANDARD,
    STOCK: Math.ceil(Math.random() * 100000),
    PRICING: { COST: 0.05, bulk_cost_modifiers: graphite_bulk_cost_modifiers },
    OPTIONS: { hardness_grade: hardness_grades, width: widths },
  },
];

export { graphites, GRAPHITE_REFS };
