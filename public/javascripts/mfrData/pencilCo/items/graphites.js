import { ITEM_GRAPHITE, MFR_REFS } from '../../../utils/constants.js';

import { expandObjectKeyAbbrs } from '../../../utils/abbrManager.js';
import createGroup from '../../../utils/createGroup.js';

const graphiteBulkCostModifiers = expandObjectKeyAbbrs([
  { qty: 250, cm: 0 },
  { qty: 500, cm: 0.05 },
  { qty: 1000, cm: 0.1 },
  { qty: 10000, cm: 0.2 },
]);

// #region Standard Graphite Groups
const graphiteGradeGroup = createGroup('grade', {
  options: [
    { optN: 'H', cm: 0 },
    { optN: 'HB', cm: 0 },
    { optN: 'B', cm: 0 },
  ],
});

const graphiteWidthGroup = createGroup('width', {
  options: [
    { optN: '0.3mm', cm: 0 },
    { optN: '0.5mm', cm: 0 },
    { optN: '0.7mm', cm: 0 },
    { optN: '0.9mm', cm: 0.01 },
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
};
const graphites = [
  {
    ...common,
    ref: ITEM_GRAPHITE.REFS.STANDARD(MFR_REFS.PENCIL_CO),
    type: ITEM_GRAPHITE.TYPES.STANDARD,
    name: 'PencilCo Standard Graphite',
    description:
      'Replacement graphite for mechanical pencils by PencilCo. Each unit comes with 50 individual sticks.',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    basePpu: 0.05,
  },
];

export default graphites;
