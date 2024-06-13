import { ITEM_ERASER, MANUFACTURER_REFS } from '../../../../constants.js';

import createGroup from '../../createGroup.js';

const eraserBulkCostModifiers = [
  { quantity: 250, costModifier: 0 },
  { quantity: 500, costModifier: 0.1 },
  { quantity: 1000, costModifier: 0.22 },
  { quantity: 5000, costModifier: 0.3 },
];

const eraserColorGroup = createGroup('color', {
  options: [
    { optionName: 'pink', costModifier: 0 },
    { optionName: 'white', costModifier: 0 },
    { optionName: 'black', costModifier: 0 },
    { optionName: 'red', costModifier: 0 },
    { optionName: 'blue', costModifier: 0 },
    { optionName: 'green', costModifier: 0 },
    { optionName: 'purple', costModifier: 0 },
    { optionName: 'gold', costModifier: 0 },
    { optionName: 'variety', costModifier: 0 },
  ],
});

const eraserMaterialGroup = createGroup('material', {
  options: [
    { optionName: 'polymer', costModifier: 0 },
    { optionName: 'vinyl', costModifier: 0.08 },
  ],
});

const eraserOptionGroups = [eraserColorGroup, eraserMaterialGroup];

const common = {
  skuPrefix: ITEM_ERASER.SKU_PREFIX(MANUFACTURER_REFS.PENCIL_PRINCE),
  category: ITEM_ERASER.CATEGORY,
  madeIn: 'US',
  quantityPricing: eraserBulkCostModifiers,
  optionGroups: eraserOptionGroups,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

const erasers = [
  {
    ...common,
    ref: ITEM_ERASER.REFS.FIXED(MANUFACTURER_REFS.PENCIL_PRINCE),
    type: ITEM_ERASER.TYPES.FIXED,
    name: 'Fixed Eraser',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    basePpu: 0.01,
  },
  {
    ...common,
    ref: ITEM_ERASER.REFS.CAP(MANUFACTURER_REFS.PENCIL_PRINCE),
    type: ITEM_ERASER.TYPES.FIXED,
    name: 'Cap Eraser',
    stock: Math.ceil(Math.random() * 2500) + 2500,
    basePpu: 0.08,
  },
  {
    ...common,
    ref: ITEM_ERASER.REFS.MECHANICAL(MANUFACTURER_REFS.PENCIL_PRINCE),
    type: ITEM_ERASER.TYPES.FIXED,
    name: 'Mechanical Pencil Replacement Eraser',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    basePpu: 0.05,
  },
];
export default erasers;
