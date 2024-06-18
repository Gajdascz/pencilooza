import { ITEM_GRAPHITE, MANUFACTURER_REFS } from '../../../../constants.js';
import createGroup from '../../createGroup.js';

const graphiteBulkCostModifiers = [
  { quantity: 250, costModifier: 0 },
  { quantity: 500, costModifier: 0.1 },
  { quantity: 1000, costModifier: 0.22 },
  { quantity: 5000, costModifier: 0.3 },
];

// #region Graphite Option Groups
const graphiteHardnessGradeGroup = createGroup('grade', {
  options: [
    { optionName: '2H', costModifier: 0 },
    { optionName: 'H', costModifier: 0 },
    { optionName: 'HB', costModifier: 0 },
    { optionName: 'B', costModifier: 0 },
    { optionName: '2B', costModifier: 0 },
  ],
});

const graphiteWidthGroup = createGroup('width', {
  options: [
    { optionName: '0.3mm', costModifier: 0 },
    { optionName: '0.5mm', costModifier: 0 },
    { optionName: '0.7mm', costModifier: 0 },
    { optionName: '0.9mm', costModifier: 0 },
  ],
});

const graphite_option_groups = [graphiteHardnessGradeGroup, graphiteWidthGroup];
// #endregion

const common = {
  skuPrefix: ITEM_GRAPHITE.SKU_PREFIX(MANUFACTURER_REFS.PENCIL_CO),
  category: ITEM_GRAPHITE.CATEGORY,
  madeIn: 'US',
  optionGroups: graphite_option_groups,
  quantityPricing: graphiteBulkCostModifiers,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

const graphites = [
  {
    ...common,
    ref: ITEM_GRAPHITE.REFS.STANDARD(MANUFACTURER_REFS.PENCIL_CO),
    type: ITEM_GRAPHITE.TYPES.STANDARD,
    name: 'Standard Replacement Graphite',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    basePpu: 0.06,
  },
  {
    ...common,
    ref: ITEM_GRAPHITE.REFS.PREMIUM(MANUFACTURER_REFS.PENCIL_CO),
    type: ITEM_GRAPHITE.TYPES.PREMIUM,
    name: 'Premium Replacement Graphite',
    stock: Math.ceil(Math.random() * 5000) + 5000,
    basePpu: 0.1,
  },
  {
    ...common,
    ref: ITEM_GRAPHITE.REFS.LUXURY(MANUFACTURER_REFS.PENCIL_CO),
    type: ITEM_GRAPHITE.TYPES.LUXURY,
    name: 'Luxury Replacement Graphite',
    stock: Math.ceil(Math.random() * 5000) + 5000,
    basePpu: 0.18,
  },
];

export default graphites;
