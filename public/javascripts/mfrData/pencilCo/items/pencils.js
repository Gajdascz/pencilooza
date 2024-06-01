import { ITEM_PENCIL, ITEM_GRAPHITE, ITEM_ERASER, MFR_REFS } from '../../../utils/constants.js';

import { expandObjectKeyAbbrs } from '../../../utils/abbrManager.js';
import createGroup from '../../../utils/createGroup.js';

const pencilBulkCostModifiers = expandObjectKeyAbbrs([
  { qty: 100, bcm: 0 },
  { qty: 250, bcm: 0.05 },
  { qty: 500, bcm: 0.1 },
  { qty: 1000, bcm: 0.15 },
  { qty: 10000, bcm: 0.2 },
]);

// #region Standard Pencil Groups
const standardPencilColorGroup = createGroup('color', {
  options: [
    { opt: 'bare', cm: 0 },
    { opt: 'yellow', cm: 0 },
    { opt: 'custom', cm: 0.2 },
  ],
});

const standardPencilHardnessGradeGroup = createGroup('hardnessGrade', {
  options: [
    { opt: 'H', cm: 0 },
    { opt: 'HB', cm: 0 },
    { opt: 'B', cm: 0 },
  ],
});

const standardPencilMaterialGroup = createGroup('material', {
  options: [
    { opt: 'basswood', cm: 0 },
    { opt: 'incense cedar', cm: 0.5 },
  ],
});

const standardPencilEraserGroup = createGroup('eraser', {
  refs: [ITEM_ERASER.REFS.FIXED(MFR_REFS.PENCIL_CO)],
});

const standardPencilOptionGroups = [
  standardPencilColorGroup,
  standardPencilHardnessGradeGroup,
  standardPencilMaterialGroup,
  standardPencilEraserGroup,
];
// #endregion

// #region Mechanical Pencil Groups
const mechanicalPencilColorGroup = createGroup('color', {
  options: [
    { opt: 'black', cm: 0 },
    { opt: 'red', cm: 0 },
    { opt: 'blue', cm: 0 },
    { opt: 'green', cm: 0 },
  ],
});
const mechanicalPencilEraserGroup = createGroup('eraser', {
  refs: [ITEM_ERASER.REFS.MECHANICAL(MFR_REFS.PENCIL_CO)],
});
const mechanicalPencilGraphiteGroup = createGroup('graphite', {
  refs: [ITEM_GRAPHITE.REFS.STANDARD(MFR_REFS.PENCIL_CO)],
});

const mechanical_pencil_option_groups = [
  mechanicalPencilColorGroup,
  mechanicalPencilGraphiteGroup,
  mechanicalPencilEraserGroup,
];
// #endregion

const common = {
  skuPrefix: ITEM_PENCIL.SKU_PREFIX(MFR_REFS.PENCIL_CO),
  category: ITEM_PENCIL.CATEGORY,
  madeIn: 'CN',
};

const pencils = [
  {
    ...common,
    ref: ITEM_PENCIL.REFS.STANDARD(MFR_REFS.PENCIL_CO),
    type: ITEM_PENCIL.TYPES.STANDARD,
    name: 'PencilCo Standard Wooden Pencil',
    description: 'Standard wooden pencil by PencilCo.',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    pricing: { cost: 0.12, bulkCostModifiers: pencilBulkCostModifiers },
    optionGroups: standardPencilOptionGroups,
  },
  {
    ...common,
    ref: ITEM_PENCIL.REFS.MECHANICAL(MFR_REFS.PENCIL_CO),
    type: ITEM_PENCIL.TYPES.MECHANICAL,
    name: 'PencilCo Plastic Mechanical Pencil',
    description: 'Standard plastic mechanical pencil by PencilCo.',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    pricing: { cost: 0.04, bulkCostModifiers: pencilBulkCostModifiers },
    optionGroups: mechanical_pencil_option_groups,
  },
];

export default pencils;
