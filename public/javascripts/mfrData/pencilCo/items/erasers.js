import { ITEM_ERASER, MFR_REFS } from '../../../utils/constants.js';
import createGroup from '../../../utils/createGroup.js';

// #region Eraser Groups
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
    { optionName: 'red', costModifier: 0 },
    { optionName: 'blue', costModifier: 0 },
    { optionName: 'green', costModifier: 0 },
    { optionName: 'variety', costModifier: 0 },
  ],
});

const eraserMaterialGroup = createGroup('material', {
  options: [
    { optionName: 'rubber', costModifier: 0 },
    { optionName: 'polymer', costModifier: 0.2 },
  ],
});

const eraserOptionGroups = [eraserColorGroup, eraserMaterialGroup];
// #endregion

const common = {
  skuPrefix: ITEM_ERASER.SKU_PREFIX(MFR_REFS.PENCIL_CO),
  category: ITEM_ERASER.CATEGORY,
  madeIn: 'CN',
  quantityPricing: eraserBulkCostModifiers,
  optionGroups: eraserOptionGroups,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

const erasers = [
  {
    ...common,
    ref: ITEM_ERASER.REFS.FIXED(MFR_REFS.PENCIL_CO),
    type: ITEM_ERASER.TYPES.FIXED,
    name: 'Fixed Eraser',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    basePpu: 0.01,
  },
  {
    ...common,
    ref: ITEM_ERASER.REFS.CAP(MFR_REFS.PENCIL_CO),
    type: ITEM_ERASER.TYPES.CAP,
    name: 'Cap Eraser',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    basePpu: 0.1,
  },
  {
    ...common,
    ref: ITEM_ERASER.REFS.MECHANICAL(MFR_REFS.PENCIL_CO),
    type: ITEM_ERASER.TYPES.MECHANICAL,
    name: 'Mechanical Pencil Replacement Eraser',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    basePpu: 0.06,
  },
];

export default erasers;
