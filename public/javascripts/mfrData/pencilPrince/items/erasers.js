import { ITEM_ERASER, MFR_REFS } from '../../../utils/constants.js';
import { expandObjectKeyAbbrs } from '../../../utils/abbrManager.js';
import createGroup from '../../../utils/createGroup.js';

const eraserBulkCostModifiers = expandObjectKeyAbbrs([
  { qty: 250, cm: 0 },
  { qty: 500, cm: 0.05 },
  { qty: 1000, cm: 0.1 },
  { qty: 10000, cm: 0.2 },
]);

const eraserColorGroup = createGroup('color', {
  options: [
    { optN: 'pink', cm: 0 },
    { optN: 'white', cm: 0 },
    { optN: 'black', cm: 0 },
    { optN: 'red', cm: 0 },
    { optN: 'blue', cm: 0 },
    { optN: 'green', cm: 0 },
    { optN: 'purple', cm: 0 },
    { optN: 'gold', cm: 0 },
    { optN: 'variety', cm: 0 },
  ],
});

const eraserMaterialGroup = createGroup('material', {
  options: [
    { optN: 'polymer', cm: 0 },
    { optN: 'vinyl', cm: 0.08 },
  ],
});

const eraserOptionGroups = [eraserColorGroup, eraserMaterialGroup];

const common = {
  skuPrefix: ITEM_ERASER.SKU_PREFIX(MFR_REFS.PENCIL_PRINCE),
  category: ITEM_ERASER.CATEGORY,
  madeIn: 'US',
  quantityPricing: eraserBulkCostModifiers,
  optionGroups: eraserOptionGroups,
};

const erasers = [
  {
    ...common,
    ref: ITEM_ERASER.REFS.FIXED(MFR_REFS.PENCIL_PRINCE),
    type: ITEM_ERASER.TYPES.FIXED,
    name: 'Pencil Prince Quality Fixed Eraser',
    description:
      'High quality eraser fixed to the end of a wooden pencil. Used when configuring pencils for creation.',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    basePpu: 0,
  },
  {
    ...common,
    ref: ITEM_ERASER.REFS.CAP(MFR_REFS.PENCIL_PRINCE),
    type: ITEM_ERASER.TYPES.FIXED,
    name: 'Pencil Prince Quality Cap Eraser',
    description: 'High quality reusable erasers placed on the end of a pencil.',
    stock: Math.ceil(Math.random() * 2500) + 2500,
    basePpu: 0.05,
  },
  {
    ...common,
    ref: ITEM_ERASER.REFS.MECHANICAL(MFR_REFS.PENCIL_PRINCE),
    type: ITEM_ERASER.TYPES.FIXED,
    name: 'Pencil Prince Quality Mechanical Pencil Eraser',
    description: 'High quality replacement eraser that fits all Pencil Prince Mechanical Pencils.',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    basePpu: 0.02,
  },
];
export default erasers;
