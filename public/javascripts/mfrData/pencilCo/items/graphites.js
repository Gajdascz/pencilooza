import { ITEM_GRAPHITE, MFR_REFS } from '../../../utils/constants.js';

import { expandObjectKeyAbbrs } from '../../../utils/abbrManager.js';
import createGroup from '../../../utils/createGroup.js';

const graphiteBulkCostModifiers = expandObjectKeyAbbrs([
  { qty: 100, cm: 0 },
  { qty: 250, cm: 0.05 },
  { qty: 500, cm: 0.1 },
  { qty: 1000, cm: 0.15 },
  { qty: 10000, cm: 0.2 },
]);

// #region Standard Graphite Groups
const graphiteHardnessGradeGroup = createGroup('hardnessGrade', {
  options: [
    { opt: 'H', cm: 0 },
    { opt: 'HB', cm: 0 },
    { opt: 'B', cm: 0 },
  ],
});

const graphiteWidthGroup = createGroup('width', {
  options: [
    { opt: '0.3mm', cm: 0 },
    { opt: '0.5mm', cm: 0 },
    { opt: '0.7mm', cm: 0 },
    { opt: '0.9mm', cm: 0.01 },
  ],
});
const graphiteOptionGroup = [graphiteHardnessGradeGroup, graphiteWidthGroup];
// #endregion

const common = {
  skuPrefix: ITEM_GRAPHITE.SKU_PREFIX(MFR_REFS.PENCIL_CO),
  category: ITEM_GRAPHITE.CATEGORY,
  madeIn: 'CN',
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
    pricing: { cost: 0.05, bulkCostModifiers: graphiteBulkCostModifiers },
  },
];

export default graphites;
