import { expandObjectKeyAbbrs } from '../../../helpers/abbrManager.js';
import { ITEM_ERASER, ITEM_ERASER_REFS, MFR_PENCIL_CO_REF } from '../../../helpers/constants.js';
import createGroup from '../../../helpers/createGroup.js';

// #region Eraser Groups
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
    { opt: 'red', cm: 0 },
    { opt: 'blue', cm: 0 },
    { opt: 'green', cm: 0 },
    { opt: 'variety', cm: 0 },
  ],
});

const eraser_material_group = createGroup('material', {
  options: [
    { opt: 'rubber', cm: 0 },
    { opt: 'polymer', cm: 0.2 },
  ],
});

const eraser_option_groups = [eraser_color_group, eraser_material_group];
// #endregion

const common = {
  skuPrefix: ITEM_ERASER.SKU_PREFIX(MFR_PENCIL_CO_REF),
  category: ITEM_ERASER.CATEGORY,
  madeIn: 'China',
  optionGroups: eraser_option_groups,
};

const erasers = [
  {
    ...common,
    ref: ITEM_ERASER_REFS.FIXED(MFR_PENCIL_CO_REF),
    type: ITEM_ERASER.TYPE.FIXED,
    name: 'PencilCo Fixed Eraser',
    description:
      'Eraser fixed to the end of a standard wooden pencil. Used when configuring pencils for creation.',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    pricing: { cost: 0.01 },
  },
  {
    ...common,
    ref: ITEM_ERASER_REFS.CAP(MFR_PENCIL_CO_REF),
    type: ITEM_ERASER.TYPE.CAP,
    name: 'PencilCo Cap Eraser',
    description: 'Reusable erasers placed on the end of a pencil.',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    pricing: { cost: 0.02, bulkCostModifiers: eraser_bulk_cost_modifiers },
  },
  {
    ...common,
    ref: ITEM_ERASER_REFS.MECHANICAL(MFR_PENCIL_CO_REF),
    type: ITEM_ERASER.TYPE.MECHANICAL,
    name: 'PencilCo Mechanical Pencil Eraser',
    description: 'Replacement eraser that fits all PencilCo mechanical pencils',
    stock: Math.ceil(Math.random() * 100000) + 100000,
    pricing: { cost: 0.01, bulkCostModifiers: eraser_bulk_cost_modifiers },
  },
];

export default erasers;
