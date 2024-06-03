import { expandObjectKeyAbbrs } from '../../../utils/abbrManager.js';
import { ITEM_ERASER, MFR_REFS } from '../../../utils/constants.js';
import createGroup from '../../../utils/createGroup.js';

// #region Eraser Groups
const eraserQuantityPricingGroup = expandObjectKeyAbbrs([
  { opt: 250, cm: 0 },
  { opt: 500, cm: 0.05 },
  { opt: 1000, cm: 0.1 },
  { opt: 10000, cm: 0.2 },
]);

const eraserColorGroup = createGroup('color', {
  options: [
    { opt: 'pink', cm: 0 },
    { opt: 'white', cm: 0 },
    { opt: 'red', cm: 0 },
    { opt: 'blue', cm: 0 },
    { opt: 'green', cm: 0 },
    { opt: 'variety', cm: 0 },
  ],
});

const eraserMaterialGroup = createGroup('material', {
  options: [
    { opt: 'rubber', cm: 0 },
    { opt: 'polymer', cm: 0.2 },
  ],
});

const eraserOptionGroups = [eraserQuantityPricingGroup, eraserColorGroup, eraserMaterialGroup];
// #endregion

const common = {
  skuPrefix: ITEM_ERASER.SKU_PREFIX(MFR_REFS.PENCIL_CO),
  category: ITEM_ERASER.CATEGORY,
  madeIn: 'CN',
  optionGroups: eraserOptionGroups,
};

const erasers = [
  {
    ...common,
    ref: ITEM_ERASER.REFS.FIXED(MFR_REFS.PENCIL_CO),
    type: ITEM_ERASER.TYPES.FIXED,
    name: 'PencilCo Fixed Eraser',
    description:
      'Eraser fixed to the end of a standard wooden pencil. Used when configuring pencils for creation.',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    basePpu: 0.01,
  },
  {
    ...common,
    ref: ITEM_ERASER.REFS.CAP(MFR_REFS.PENCIL_CO),
    type: ITEM_ERASER.TYPES.CAP,
    name: 'PencilCo Cap Eraser',
    description: 'Reusable erasers placed on the end of a pencil.',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    basePpu: 0.03,
  },
  {
    ...common,
    ref: ITEM_ERASER.REFS.MECHANICAL(MFR_REFS.PENCIL_CO),
    type: ITEM_ERASER.TYPES.MECHANICAL,
    name: 'PencilCo Mechanical Pencil Eraser',
    description: 'Replacement eraser that fits all PencilCo mechanical pencils',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    basePpu: 0.01,
  },
];

export default erasers;
