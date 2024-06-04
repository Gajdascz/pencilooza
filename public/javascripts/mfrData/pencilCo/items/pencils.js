import { ITEM_PENCIL, ITEM_GRAPHITE, ITEM_ERASER, MFR_REFS } from '../../../utils/constants.js';

import { expandObjectKeyAbbrs } from '../../../utils/abbrManager.js';
import createGroup from '../../../utils/createGroup.js';

const pencilBulkCostModifier = expandObjectKeyAbbrs([
  { qty: 250, cm: 0 },
  { qty: 500, cm: 0.05 },
  { qty: 1000, cm: 0.1 },
  { qty: 10000, cm: 0.2 },
]);

// #region Standard Pencil Groups
const standardPencilColorGroup = createGroup('color', {
  options: [
    { optN: 'bare', cm: 0 },
    { optN: 'yellow', cm: 0 },
    { optN: 'custom', cm: 0.2 },
  ],
});

const standardPencilGradeGroup = createGroup('grade', {
  options: [
    { optN: 'H', cm: 0 },
    { optN: 'HB', cm: 0 },
    { optN: 'B', cm: 0 },
  ],
});

const standardPencilMaterialGroup = createGroup('material', {
  options: [
    { optN: 'basswood', cm: 0 },
    { optN: 'incense cedar', cm: 0.5 },
  ],
});

const standardPencilEraserGroup = createGroup('eraser', {
  refs: [ITEM_ERASER.REFS.FIXED(MFR_REFS.PENCIL_CO)],
});

const standardPencilOptionGroups = [
  standardPencilColorGroup,
  standardPencilGradeGroup,
  standardPencilMaterialGroup,
  standardPencilEraserGroup,
];
// #endregion

// #region Mechanical Pencil Groups
const mechanicalPencilColorGroup = createGroup('color', {
  options: [
    { optN: 'black', cm: 0 },
    { optN: 'red', cm: 0 },
    { optN: 'blue', cm: 0 },
    { optN: 'green', cm: 0 },
  ],
});
const mechanicalPencilEraserGroup = createGroup('eraser', {
  refs: [ITEM_ERASER.REFS.MECHANICAL(MFR_REFS.PENCIL_CO)],
});
const mechanicalPencilGraphiteGroup = createGroup('graphite', {
  refs: [ITEM_GRAPHITE.REFS.STANDARD(MFR_REFS.PENCIL_CO)],
});

const mechanicalPencilOptionGroups = [
  mechanicalPencilColorGroup,
  mechanicalPencilGraphiteGroup,
  mechanicalPencilEraserGroup,
];
// #endregion

const common = {
  skuPrefix: ITEM_PENCIL.SKU_PREFIX(MFR_REFS.PENCIL_CO),
  category: ITEM_PENCIL.CATEGORY,
  madeIn: 'CN',
  quantityPricing: pencilBulkCostModifier,
};

const pencils = [
  {
    ...common,
    ref: ITEM_PENCIL.REFS.STANDARD(MFR_REFS.PENCIL_CO),
    type: ITEM_PENCIL.TYPES.STANDARD,
    name: 'PencilCo Standard Wooden Pencil',
    description: 'Standard wooden pencil by PencilCo.',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    basePpu: 0.12,
    optionGroups: standardPencilOptionGroups,
  },
  {
    ...common,
    ref: ITEM_PENCIL.REFS.MECHANICAL(MFR_REFS.PENCIL_CO),
    type: ITEM_PENCIL.TYPES.MECHANICAL,
    name: 'PencilCo Plastic Mechanical Pencil',
    description: 'Standard plastic mechanical pencil by PencilCo.',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    basePpu: 0.06,
    optionGroups: mechanicalPencilOptionGroups,
  },
];

export default pencils;
