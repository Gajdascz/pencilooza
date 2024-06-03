import { ITEM_PENCIL, ITEM_ERASER, ITEM_GRAPHITE, MFR_REFS } from '../../../utils/constants.js';
import { expandObjectKeyAbbrs } from '../../../utils/abbrManager.js';
import createGroup from '../../../utils/createGroup.js';

const pencilQuantityPricingGroup = expandObjectKeyAbbrs([
  { opt: 250, cm: 0 },
  { opt: 500, cm: 0.05 },
  { opt: 1000, cm: 0.1 },
  { opt: 10000, cm: 0.2 },
]);

// #region Standard Pencil Option Groups
const standardPencilColorGroup = createGroup('color', {
  options: [
    { opt: 'bare', cm: 0 },
    { opt: 'yellow', cm: 0 },
    { opt: 'custom', cm: 0.18 },
  ],
});
const standardPencilGradeGroup = createGroup('grade', {
  options: [
    { opt: '2H', cm: 0 },
    { opt: 'H', cm: 0 },
    { opt: 'HB', cm: 0 },
    { opt: 'B', cm: 0 },
    { opt: '2B', cm: 0 },
  ],
});
const standardPencilMaterialGroup = createGroup('material', {
  options: [
    { opt: 'basswood', cm: 0 },
    { opt: 'incense cedar', cm: 0.25 },
  ],
});

const standardPencilEraserGroup = createGroup('eraser', {
  refs: [ITEM_ERASER.REFS.FIXED(MFR_REFS.PENCIL_PRINCE)],
});

const standardPencilOptionGroups = [
  pencilQuantityPricingGroup,
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
    ITEM_GRAPHITE.REFS.STANDARD(MFR_REFS.PENCIL_PRINCE),
    ITEM_GRAPHITE.REFS.PREMIUM(MFR_REFS.PENCIL_PRINCE),
    ITEM_GRAPHITE.REFS.LUXURY(MFR_REFS.PENCIL_PRINCE),
  ],
});

const mechanicalPencilEraserGroup = createGroup('eraser', {
  refs: [ITEM_ERASER.REFS.MECHANICAL(MFR_REFS.PENCIL_PRINCE)],
});
// plastic
const plasticMechanicalPencilColorGroup = createGroup('color', {
  options: [
    { opt: 'pink', cm: 0 },
    { opt: 'white', cm: 0 },
    { opt: 'black', cm: 0 },
    { opt: 'red', cm: 0 },
    { opt: 'blue', cm: 0 },
    { opt: 'green', cm: 0 },
    { opt: 'purple', cm: 0 },
    { opt: 'gold', cm: 0 },
  ],
});
const plasticMechanicalPencilOptionGroups = [
  pencilQuantityPricingGroup,
  plasticMechanicalPencilColorGroup,
  mechanicalPencilEraserGroup,
  mechanicalPencilGraphiteGroup,
];
// metal
const metalMechanicalPencilMaterialGroup = createGroup('material', {
  options: [
    { opt: 'aluminum', cm: 0 },
    { opt: 'copper', cm: 0.75 },
    { opt: 'stainless', cm: 1 },
    { opt: 'titanium', cm: 3 },
  ],
});
const metalMechanicalPencilOptionGroups = [
  pencilQuantityPricingGroup,
  metalMechanicalPencilMaterialGroup,
  mechanicalPencilEraserGroup,
  mechanicalPencilGraphiteGroup,
];
// wood
const woodMechanicalPencilMaterialGroup = createGroup('material', {
  options: [
    { opt: 'oak', cm: 0 },
    { opt: 'maple', cm: 1 },
    { opt: 'pink-ivory', cm: 3 },
    { opt: 'exotic-ebony', cm: 5 },
  ],
});
const woodMechanicalPencilTrimGroup = createGroup('trim', {
  options: [
    { opt: 'stainless', cm: 0 },
    { opt: 'titanium', cm: 0.75 },
    { opt: 'gold', cm: 5 },
    { opt: 'platinum', cm: 7.5 },
  ],
});
const woodMechanicalPencilOptionGroups = [
  pencilQuantityPricingGroup,
  woodMechanicalPencilMaterialGroup,
  woodMechanicalPencilTrimGroup,
  mechanicalPencilEraserGroup,
  mechanicalPencilGraphiteGroup,
];
// #endregion

const common = {
  skuPrefix: ITEM_PENCIL.SKU_PREFIX(MFR_REFS.PENCIL_PRINCE),
  category: ITEM_PENCIL.CATEGORY,
  madeIn: 'US',
};

const pencils = [
  {
    ...common,
    ref: ITEM_PENCIL.REFS.STANDARD(MFR_REFS.PENCIL_PRINCE),
    type: ITEM_PENCIL.TYPES.STANDARD,
    name: 'Pencil Prince Standard Wooden Pencil',
    description: 'Top quality standard wooden cedar pencil.',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    basePpu: 0.15,
    optionGroups: standardPencilOptionGroups,
  },
  {
    ...common,
    ref: ITEM_PENCIL.REFS.MECHANICAL(MFR_REFS.PENCIL_PRINCE, 'plastic'),
    type: ITEM_PENCIL.TYPES.MECHANICAL,
    name: 'Pencil Prince Plastic Mechanical',
    description: 'Mechanical pencil made using a special plastic formula for improved durability.',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    basePpu: 0.1,
    optionGroups: plasticMechanicalPencilOptionGroups,
  },
  {
    ...common,
    ref: ITEM_PENCIL.REFS.MECHANICAL(MFR_REFS.PENCIL_PRINCE, 'metal'),
    type: ITEM_PENCIL.TYPES.MECHANICAL,
    name: 'Pencil Prince Metal Mechanical',
    description: 'Premium-quality solid metal mechanical pencil.',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    basePpu: 1.75,
    optionGroups: metalMechanicalPencilOptionGroups,
  },
  {
    ...common,
    ref: ITEM_PENCIL.REFS.MECHANICAL(MFR_REFS.PENCIL_PRINCE, 'wood'),
    type: ITEM_PENCIL.TYPES.MECHANICAL,
    name: 'Pencil Prince Wooden Mechanical',
    description: 'Premium-quality wooden mechanical pencil.',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    basePpu: 1.85,
    optionGroups: woodMechanicalPencilOptionGroups,
  },
];

export default pencils;
