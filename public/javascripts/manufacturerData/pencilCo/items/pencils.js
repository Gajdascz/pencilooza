import {
  ITEM_PENCIL,
  ITEM_GRAPHITE,
  ITEM_ERASER,
  MANUFACTURER_REFS,
} from '../../../utils/constants.js';
import createGroup from '../../../utils/createGroup.js';

const pencilBulkCostModifier = [
  { quantity: 250, costModifier: 0 },
  { quantity: 500, costModifier: 0.1 },
  { quantity: 1000, costModifier: 0.22 },
  { quantity: 5000, costModifier: 0.3 },
];

// #region Standard Pencil Groups
const standardPencilColorGroup = createGroup('color', {
  options: [
    { optionName: 'bare', costModifier: 0 },
    { optionName: 'yellow', costModifier: 0 },
    { optionName: 'custom', costModifier: 0.2 },
  ],
});

const standardPencilGradeGroup = createGroup('grade', {
  options: [
    { optionName: 'H', costModifier: 0 },
    { optionName: 'HB', costModifier: 0 },
    { optionName: 'B', costModifier: 0 },
  ],
});

const standardPencilMaterialGroup = createGroup('material', {
  options: [
    { optionName: 'basswood', costModifier: 0 },
    { optionName: 'incense cedar', costModifier: 0.5 },
  ],
});

const standardPencilEraserGroup = createGroup('eraser', {
  refs: [{ itemId: ITEM_ERASER.REFS.FIXED(MANUFACTURER_REFS.PENCIL_CO), costModifier: 0 }],
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
    { optionName: 'black', costModifier: 0 },
    { optionName: 'red', costModifier: 0 },
    { optionName: 'blue', costModifier: 0 },
    { optionName: 'green', costModifier: 0 },
  ],
});
const mechanicalPencilEraserGroup = createGroup('eraser', {
  refs: [{ itemId: ITEM_ERASER.REFS.MECHANICAL(MANUFACTURER_REFS.PENCIL_CO), costModifier: 0 }],
});
const mechanicalPencilGraphiteGroup = createGroup('graphite', {
  refs: [{ itemId: ITEM_GRAPHITE.REFS.STANDARD(MANUFACTURER_REFS.PENCIL_CO), costModifier: 0 }],
});

const mechanicalPencilOptionGroups = [
  mechanicalPencilColorGroup,
  mechanicalPencilGraphiteGroup,
  mechanicalPencilEraserGroup,
];
// #endregion

const common = {
  skuPrefix: ITEM_PENCIL.SKU_PREFIX(MANUFACTURER_REFS.PENCIL_CO),
  category: ITEM_PENCIL.CATEGORY,
  madeIn: 'CN',
  quantityPricing: pencilBulkCostModifier,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

const pencils = [
  {
    ...common,
    ref: ITEM_PENCIL.REFS.STANDARD(MANUFACTURER_REFS.PENCIL_CO),
    type: ITEM_PENCIL.TYPES.STANDARD,
    name: 'Wooden Pencil',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    basePpu: 0.12,
    optionGroups: standardPencilOptionGroups,
  },
  {
    ...common,
    ref: ITEM_PENCIL.REFS.MECHANICAL(MANUFACTURER_REFS.PENCIL_CO),
    type: ITEM_PENCIL.TYPES.MECHANICAL,
    name: 'Plastic Mechanical Pencil',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    basePpu: 0.06,
    optionGroups: mechanicalPencilOptionGroups,
  },
];

export default pencils;
