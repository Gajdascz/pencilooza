import { ITEM_GRAPHITE, MFR_REFS } from '../../../utils/constants.js';

import { expandObjectKeyAbbrs } from '../../../utils/abbrManager.js';
import createGroup from '../../../utils/createGroup.js';

const graphiteQuantityPricingGroup = expandObjectKeyAbbrs([
  { opt: 250, cm: 0 },
  { opt: 500, cm: 0.05 },
  { opt: 1000, cm: 0.1 },
  { opt: 10000, cm: 0.2 },
]);

// #region Standard Graphite Groups
const graphiteGradeGroup = createGroup('grade', {
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
const graphiteOptionGroup = [graphiteQuantityPricingGroup, graphiteGradeGroup, graphiteWidthGroup];
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
    basePpu: 0.05,
  },
];

export default graphites;
