import {
  ITEM_PENCIL,
  ITEM_PENCIL_REFS,
  MFR_PENCIL_CO_REF,
  ITEM_GRAPHITE_REFS,
  ITEM_ERASER_REFS,
} from '../../../helpers/constants.js';

import { expandObjectKeyAbbrs } from '../../../helpers/abbrManager.js';
import createGroup from '../../../helpers/createGroup.js';

const pencil_bulk_cost_modifiers = expandObjectKeyAbbrs([
  { qty: 100, bcm: 0 },
  { qty: 250, bcm: 0.05 },
  { qty: 500, bcm: 0.1 },
  { qty: 1000, bcm: 0.15 },
  { qty: 10000, bcm: 0.2 },
]);

// #region Standard Pencil Groups
const standard_pencil_color_group = createGroup('color', {
  options: [
    { opt: 'bare', cm: 0 },
    { opt: 'yellow', cm: 0 },
    { opt: 'custom', cm: 0.2 },
  ],
});

const standard_pencil_hardness_grade_group = createGroup('hardness_grade', {
  options: [
    { opt: 'H', cm: 0 },
    { opt: 'HB', cm: 0 },
    { opt: 'B', cm: 0 },
  ],
});

const standard_pencil_material_group = createGroup('material', {
  options: [
    { opt: 'basswood', cm: 0 },
    { opt: 'incense cedar', cm: 0.5 },
  ],
});

const standard_pencil_eraser_group = createGroup('eraser', {
  refs: [ITEM_ERASER_REFS.FIXED(MFR_PENCIL_CO_REF)],
});

const standard_pencil_option_groups = [
  standard_pencil_color_group,
  standard_pencil_hardness_grade_group,
  standard_pencil_material_group,
  standard_pencil_eraser_group,
];
// #endregion

// #region Mechanical Pencil Groups
const mechanical_pencil_color_group = createGroup('color', {
  options: [
    { opt: 'black', cm: 0 },
    { opt: 'red', cm: 0 },
    { opt: 'blue', cm: 0 },
    { opt: 'green', cm: 0 },
  ],
});
const mechanical_pencil_eraser_group = createGroup('eraser', {
  refs: [ITEM_ERASER_REFS.MECHANICAL(MFR_PENCIL_CO_REF)],
});
const mechanical_pencil_graphite_group = createGroup('graphite', {
  refs: [ITEM_GRAPHITE_REFS.STANDARD(MFR_PENCIL_CO_REF)],
});

const mechanical_pencil_option_groups = [
  mechanical_pencil_color_group,
  mechanical_pencil_graphite_group,
  mechanical_pencil_eraser_group,
];
// #endregion

const common = {
  skuPrefix: ITEM_PENCIL.SKU_PREFIX(MFR_PENCIL_CO_REF),
  category: ITEM_PENCIL.CATEGORY,
  madeIn: 'China',
};

const pencils = [
  {
    ...common,
    ref: ITEM_PENCIL_REFS.STANDARD(MFR_PENCIL_CO_REF),
    type: ITEM_PENCIL.TYPE.STANDARD,
    name: 'PencilCo Standard Wooden Pencil',
    description: 'Standard wooden pencil by PencilCo.',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    pricing: { cost: 0.12, bulkCostModifiers: pencil_bulk_cost_modifiers },
    optionGroups: standard_pencil_option_groups,
  },
  {
    ...common,
    ref: ITEM_PENCIL_REFS.MECHANICAL(MFR_PENCIL_CO_REF),
    type: ITEM_PENCIL.TYPE.MECHANICAL,
    name: 'PencilCo Plastic Mechanical Pencil',
    description: 'Standard plastic mechanical pencil by PencilCo.',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    pricing: { cost: 0.04, bulkCostModifiers: pencil_bulk_cost_modifiers },
    optionGroups: mechanical_pencil_option_groups,
  },
];

export default pencils;
