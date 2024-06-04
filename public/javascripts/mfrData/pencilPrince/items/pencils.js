import { ITEM_PENCIL, ITEM_ERASER, ITEM_GRAPHITE, MFR_REFS } from '../../../utils/constants.js';
import { expandObjectKeyAbbrs } from '../../../utils/abbrManager.js';
import createGroup from '../../../utils/createGroup.js';

const pencilBulkCostModifier = expandObjectKeyAbbrs([
  { qty: 250, cm: 0 },
  { qty: 500, cm: 0.05 },
  { qty: 1000, cm: 0.1 },
  { qty: 10000, cm: 0.2 },
]);

// #region Standard Pencil Option Groups
const standardPencilColorGroup = createGroup('color', {
  options: [
    { optN: 'bare', cm: 0 },
    { optN: 'yellow', cm: 0 },
    { optN: 'custom', cm: 0.18 },
  ],
});
const standardPencilGradeGroup = createGroup('grade', {
  options: [
    { optN: '2H', cm: 0 },
    { optN: 'H', cm: 0 },
    { optN: 'HB', cm: 0 },
    { optN: 'B', cm: 0 },
    { optN: '2B', cm: 0 },
  ],
});
const standardPencilMaterialGroup = createGroup('material', {
  options: [
    { optN: 'basswood', cm: 0 },
    { optN: 'incense cedar', cm: 0.25 },
  ],
});

const standardPencilEraserGroup = createGroup('eraser', {
  refs: [ITEM_ERASER.REFS.FIXED(MFR_REFS.PENCIL_PRINCE)],
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
    { optN: 'pink', cm: 0 },
    { optN: 'white', cm: 0 },
    { optN: 'black', cm: 0 },
    { optN: 'red', cm: 0 },
    { optN: 'blue', cm: 0 },
    { optN: 'green', cm: 0 },
    { optN: 'purple', cm: 0 },
    { optN: 'gold', cm: 0 },
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
    { optN: 'aluminum', cm: 0 },
    { optN: 'copper', cm: 0.75 },
    { optN: 'stainless', cm: 1 },
    { optN: 'titanium', cm: 3 },
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
    { optN: 'oak', cm: 0 },
    { optN: 'maple', cm: 1 },
    { optN: 'pink-ivory', cm: 3 },
    { optN: 'exotic-ebony', cm: 5 },
  ],
});
const woodMechanicalPencilTrimGroup = createGroup('trim', {
  options: [
    { optN: 'stainless', cm: 0 },
    { optN: 'titanium', cm: 0.75 },
    { optN: 'gold', cm: 5 },
    { optN: 'platinum', cm: 7.5 },
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
