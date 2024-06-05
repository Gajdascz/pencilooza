import { ITEM_PENCIL, ITEM_ERASER, ITEM_GRAPHITE, MFR_REFS } from '../../../utils/constants.js';

import createGroup from '../../../utils/createGroup.js';

const pencilBulkCostModifier = [
  { quantity: 250, costModifier: 0 },
  { quantity: 500, costModifier: 0.1 },
  { quantity: 1000, costModifier: 0.22 },
  { quantity: 5000, costModifier: 0.3 },
];

// #region Standard Pencil Option Groups
const standardPencilColorGroup = createGroup('color', {
  options: [
    { optionName: 'bare', costModifier: 0 },
    { optionName: 'yellow', costModifier: 0 },
    { optionName: 'custom', costModifier: 0.18 },
  ],
});
const standardPencilGradeGroup = createGroup('grade', {
  options: [
    { optionName: '2H', costModifier: 0 },
    { optionName: 'H', costModifier: 0 },
    { optionName: 'HB', costModifier: 0 },
    { optionName: 'B', costModifier: 0 },
    { optionName: '2B', costModifier: 0 },
  ],
});
const standardPencilMaterialGroup = createGroup('material', {
  options: [{ optionName: 'incense cedar', costModifier: 0 }],
});

const standardPencilEraserGroup = createGroup('eraser', {
  refs: [{ itemId: ITEM_ERASER.REFS.FIXED(MFR_REFS.PENCIL_PRINCE), costModifier: 0 }],
});

const standardPencilOptionGroups = [
  standardPencilColorGroup,
  standardPencilGradeGroup,
  standardPencilMaterialGroup,
  standardPencilEraserGroup,
];
// #endregion

// #region Mechanical Pencil Option Groups
// common
const mechanicalPencilGraphiteGroup = createGroup('graphite', {
  refs: [
    { itemId: ITEM_GRAPHITE.REFS.STANDARD(MFR_REFS.PENCIL_PRINCE), costModifier: 0 },
    { itemId: ITEM_GRAPHITE.REFS.PREMIUM(MFR_REFS.PENCIL_PRINCE), costModifier: 0.03 },
    { itemId: ITEM_GRAPHITE.REFS.LUXURY(MFR_REFS.PENCIL_PRINCE), costModifier: 0.06 },
  ],
});

const mechanicalPencilEraserGroup = createGroup('eraser', {
  refs: [{ itemId: ITEM_ERASER.REFS.MECHANICAL(MFR_REFS.PENCIL_PRINCE), costModifier: 0 }],
});
// plastic
const plasticMechanicalPencilColorGroup = createGroup('color', {
  options: [
    { optionName: 'pink', costModifier: 0 },
    { optionName: 'white', costModifier: 0 },
    { optionName: 'black', costModifier: 0 },
    { optionName: 'red', costModifier: 0 },
    { optionName: 'blue', costModifier: 0 },
    { optionName: 'green', costModifier: 0 },
    { optionName: 'purple', costModifier: 0 },
    { optionName: 'gold', costModifier: 0 },
  ],
});
const plasticMechanicalPencilOptionGroups = [
  plasticMechanicalPencilColorGroup,
  mechanicalPencilEraserGroup,
  mechanicalPencilGraphiteGroup,
];
// metal
const metalMechanicalPencilMaterialGroup = createGroup('material', {
  options: [
    { optionName: 'aluminum', costModifier: 0 },
    { optionName: 'copper', costModifier: 0.75 },
    { optionName: 'stainless', costModifier: 1 },
    { optionName: 'titanium', costModifier: 3 },
  ],
});
const metalMechanicalPencilOptionGroups = [
  metalMechanicalPencilMaterialGroup,
  mechanicalPencilEraserGroup,
  mechanicalPencilGraphiteGroup,
];
// wood
const woodMechanicalPencilMaterialGroup = createGroup('material', {
  options: [
    { optionName: 'oak', costModifier: 0 },
    { optionName: 'maple', costModifier: 1 },
    { optionName: 'pink-ivory', costModifier: 3 },
    { optionName: 'exotic-ebony', costModifier: 5 },
  ],
});
const woodMechanicalPencilTrimGroup = createGroup('trim', {
  options: [
    { optionName: 'stainless', costModifier: 0 },
    { optionName: 'titanium', costModifier: 0.75 },
    { optionName: 'gold', costModifier: 5 },
    { optionName: 'platinum', costModifier: 7.5 },
  ],
});
const woodMechanicalPencilOptionGroups = [
  woodMechanicalPencilMaterialGroup,
  woodMechanicalPencilTrimGroup,
  mechanicalPencilEraserGroup,
  mechanicalPencilGraphiteGroup,
];
// #endregion

const common = {
  skuPrefix: ITEM_PENCIL.SKU_PREFIX(MFR_REFS.PENCIL_PRINCE),
  category: ITEM_PENCIL.CATEGORY,
  quantityPricing: pencilBulkCostModifier,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  madeIn: 'US',
};

const pencils = [
  {
    ...common,
    ref: ITEM_PENCIL.REFS.STANDARD(MFR_REFS.PENCIL_PRINCE),
    type: ITEM_PENCIL.TYPES.STANDARD,
    name: 'Wooden Pencil',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    basePpu: 0.15,
    optionGroups: standardPencilOptionGroups,
  },
  {
    ...common,
    ref: ITEM_PENCIL.REFS.MECHANICAL(MFR_REFS.PENCIL_PRINCE, 'plastic'),
    type: ITEM_PENCIL.TYPES.MECHANICAL,
    name: 'Plastic Mechanical Pencil',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    basePpu: 0.1,
    optionGroups: plasticMechanicalPencilOptionGroups,
  },
  {
    ...common,
    ref: ITEM_PENCIL.REFS.MECHANICAL(MFR_REFS.PENCIL_PRINCE, 'metal'),
    type: ITEM_PENCIL.TYPES.MECHANICAL,
    name: 'Metal Mechanical Pencil',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    basePpu: 1.75,
    optionGroups: metalMechanicalPencilOptionGroups,
  },
  {
    ...common,
    ref: ITEM_PENCIL.REFS.MECHANICAL(MFR_REFS.PENCIL_PRINCE, 'wood'),
    type: ITEM_PENCIL.TYPES.MECHANICAL,
    name: 'Wooden Mechanical Pencil',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    basePpu: 1.85,
    optionGroups: woodMechanicalPencilOptionGroups,
  },
];

export default pencils;
