import { ITEM_GRAPHITE, MFR_REFS } from '../../../utils/constants.js';
import createGroup from '../../../utils/createGroup.js';

const graphiteBulkCostModifiers = [
  { quantity: 250, costModifier: 0 },
  { quantity: 500, costModifier: 0.1 },
  { quantity: 1000, costModifier: 0.22 },
  { quantity: 5000, costModifier: 0.3 },
];

// #region Standard Graphite Groups
const graphiteGradeGroup = createGroup('grade', {
  options: [
    { optionName: 'H', costModifier: 0 },
    { optionName: 'HB', costModifier: 0 },
    { optionName: 'B', costModifier: 0 },
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
const graphiteOptionGroup = [graphiteGradeGroup, graphiteWidthGroup];
// #endregion

const common = {
  skuPrefix: ITEM_GRAPHITE.SKU_PREFIX(MFR_REFS.PENCIL_CO),
  category: ITEM_GRAPHITE.CATEGORY,
  madeIn: 'CN',
  quantityPricing: graphiteBulkCostModifiers,
  optionGroups: graphiteOptionGroup,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};
const graphites = [
  {
    ...common,
    ref: ITEM_GRAPHITE.REFS.STANDARD(MFR_REFS.PENCIL_CO),
    type: ITEM_GRAPHITE.TYPES.STANDARD,
    name: 'Standard Replacement Graphite',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    basePpu: 0.05,
  },
];

export default graphites;
