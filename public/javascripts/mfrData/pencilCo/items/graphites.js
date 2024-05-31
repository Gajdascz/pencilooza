import {
  ITEM_GRAPHITE,
  ITEM_GRAPHITE_REFS,
  MFR_PENCIL_CO_REF,
} from '../../../helpers/constants.js';

import { expandObjectKeyAbbrs } from '../../../helpers/abbrManager.js';
import createGroup from '../../../helpers/createGroup.js';

const graphite_bulk_cost_modifiers = expandObjectKeyAbbrs([
  { qty: 100, cm: 0 },
  { qty: 250, cm: 0.05 },
  { qty: 500, cm: 0.1 },
  { qty: 1000, cm: 0.15 },
  { qty: 10000, cm: 0.2 },
]);

// #region Standard Graphite Groups
const graphite_hardness_grade_group = createGroup('hardness_grade', {
  options: [
    { opt: 'H', cm: 0 },
    { opt: 'HB', cm: 0 },
    { opt: 'B', cm: 0 },
  ],
});

const graphite_width_group = createGroup('width', {
  options: [
    { opt: '0.3mm', cm: 0 },
    { opt: '0.5mm', cm: 0 },
    { opt: '0.7mm', cm: 0 },
    { opt: '0.9mm', cm: 0.01 },
  ],
});
const graphite_option_groups = [graphite_hardness_grade_group, graphite_width_group];
// #endregion

const common = {
  skuPrefix: ITEM_GRAPHITE.SKU_PREFIX(MFR_PENCIL_CO_REF),
  category: ITEM_GRAPHITE.CATEGORY,
  madeIn: 'China',
  optionGroups: graphite_option_groups,
};
const graphites = [
  {
    ...common,
    ref: ITEM_GRAPHITE_REFS.STANDARD(MFR_PENCIL_CO_REF),
    type: ITEM_GRAPHITE.TYPE.STANDARD,
    name: 'PencilCo Standard Graphite',
    description:
      'Replacement graphite for mechanical pencils by PencilCo. Each unit comes with 50 individual sticks.',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    pricing: { cost: 0.05, bulkCostModifiers: graphite_bulk_cost_modifiers },
  },
];

export default graphites;
