import {
  ITEM_ERASER,
  ITEM_ERASER_REFS,
  MFR_PENCIL_PRINCE_REF,
} from '../../../helpers/constants.js';
import { expandObjectKeyAbbrs } from '../../../helpers/abbrManager.js';
import createGroup from '../../../helpers/createGroup.js';

const eraser_bulk_cost_modifiers = expandObjectKeyAbbrs([
  { qty: 100, cm: 0 },
  { qty: 250, cm: 0.05 },
  { qty: 500, cm: 0.1 },
  { qty: 1000, cm: 0.15 },
  { qty: 10000, cm: 0.2 },
]);

const eraser_color_group = createGroup('color', {
  options: [
    { opt: 'pink', cm: 0 },
    { opt: 'white', cm: 0 },
    { opt: 'black', cm: 0 },
    { opt: 'red', cm: 0 },
    { opt: 'blue', cm: 0 },
    { opt: 'green', cm: 0 },
    { opt: 'purple', cm: 0 },
    { opt: 'gold', cm: 0 },
    { opt: 'variety', cm: 0 },
  ],
});

const eraser_material_group = createGroup('material', {
  options: [
    { opt: 'polymer', cm: 0 },
    { opt: 'vinyl', cm: 0.25 },
  ],
});

const eraser_option_groups = [eraser_color_group, eraser_material_group];

const common = {
  skuPrefix: ITEM_ERASER.SKU_PREFIX(MFR_PENCIL_PRINCE_REF),
  category: ITEM_ERASER.CATEGORY,
  madeIn: 'USA',
  optionGroups: eraser_option_groups,
};

const erasers = [
  {
    ...common,
    ref: ITEM_ERASER_REFS.FIXED(MFR_PENCIL_PRINCE_REF),
    type: ITEM_ERASER.TYPE.FIXED,
    name: 'Pencil Prince Quality Fixed Eraser',
    description:
      'High quality eraser fixed to the end of a wooden pencil. Used when configuring pencils for creation.',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    pricing: { cost: 0.02 },
  },
  {
    ...common,
    ref: ITEM_ERASER_REFS.FIXED(MFR_PENCIL_PRINCE_REF),
    type: ITEM_ERASER.TYPE.FIXED,
    name: 'Pencil Prince Quality Cap Eraser',
    description: 'High quality reusable erasers placed on the end of a pencil.',
    stock: Math.ceil(Math.random() * 2500) + 2500,
    pricing: { cost: 0.04, bulkCostModifiers: eraser_bulk_cost_modifiers },
  },
  {
    ...common,
    ref: ITEM_ERASER_REFS.FIXED(MFR_PENCIL_PRINCE_REF),
    type: ITEM_ERASER.TYPE.FIXED,
    name: 'Pencil Prince Quality Mechanical Pencil Eraser',
    description: 'High quality replacement eraser that fits all Pencil Prince Mechanical Pencils.',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    pricing: { cost: 0.02, bulkCostModifiers: eraser_bulk_cost_modifiers },
  },
];
export default erasers;
