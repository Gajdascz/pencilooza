import {
  ITEM_PENCIL,
  ITEM_PENCIL_REFS,
  ITEM_ERASER_REFS,
  ITEM_GRAPHITE_REFS,
  MFR_PENCIL_PRINCE_REF,
} from '../../../helpers/constants.js';
import { expandObjectKeyAbbrs } from '../../../helpers/abbrManager.js';
import createGroup from '../../../helpers/createGroup.js';

const pencil_bulk_cost_modifiers = expandObjectKeyAbbrs([
  { qty: 100, cm: 0 },
  { qty: 250, cm: 0.05 },
  { qty: 500, cm: 0.1 },
  { qty: 1000, cm: 0.15 },
  { qty: 10000, cm: 0.2 },
]);

// #region Standard Pencil Option Groups
const standard_pencil_colors_group = createGroup('color', {
  options: [
    { opt: 'bare', cm: 0 },
    { opt: 'yellow', cm: 0 },
    { opt: 'custom', cm: 0.18 },
  ],
});
const standard_pencil_hardness_grade_group = createGroup('hardness_grade', {
  options: [
    { opt: '2H', cm: 0 },
    { opt: 'H', cm: 0 },
    { opt: 'HB', cm: 0 },
    { opt: 'B', cm: 0 },
    { opt: '2B', cm: 0 },
  ],
});
const standard_pencil_material_group = createGroup('material', {
  options: [
    { opt: 'basswood', cm: 0 },
    { opt: 'incense cedar', cm: 0.25 },
  ],
});

const standard_pencil_eraser_group = createGroup('eraser', {
  refs: [ITEM_ERASER_REFS.FIXED(MFR_PENCIL_PRINCE_REF)],
});

const standard_pencil_option_groups = [
  standard_pencil_colors_group,
  standard_pencil_hardness_grade_group,
  standard_pencil_material_group,
  standard_pencil_eraser_group,
];
// #endregion

// #region Mechanical Pencil Option Groups
// common
const mechanical_pencil_graphite_group = createGroup('graphite', {
  refs: [
    ITEM_GRAPHITE_REFS.STANDARD(MFR_PENCIL_PRINCE_REF),
    ITEM_GRAPHITE_REFS.PREMIUM(MFR_PENCIL_PRINCE_REF),
    ITEM_GRAPHITE_REFS.LUXURY(MFR_PENCIL_PRINCE_REF),
  ],
});

const mechanical_pencil_eraser_group = createGroup('eraser', {
  refs: [ITEM_ERASER_REFS.MECHANICAL(MFR_PENCIL_PRINCE_REF)],
});
// plastic
const plastic_mechanical_pencil_color_group = createGroup('color', {
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
const plastic_mechanical_pencil_option_groups = [
  plastic_mechanical_pencil_color_group,
  mechanical_pencil_eraser_group,
  mechanical_pencil_graphite_group,
];
// metal
const metal_mechanical_pencil_material_group = createGroup('material', {
  options: [
    { opt: 'aluminum', cm: 0 },
    { opt: 'copper', cm: 0.75 },
    { opt: 'stainless', cm: 1 },
    { opt: 'titanium', cm: 3 },
  ],
});
const metal_mechanical_pencil_option_groups = [
  metal_mechanical_pencil_material_group,
  mechanical_pencil_eraser_group,
  mechanical_pencil_graphite_group,
];
// wood
const wood_mechanical_pencil_material_group = createGroup('material', {
  options: [
    { opt: 'oak', cm: 0 },
    { opt: 'maple', cm: 1 },
    { opt: 'pink-ivory', cm: 3 },
    { opt: 'exotic-ebony', cm: 5 },
  ],
});
const wood_mechanical_pencil_trim_group = createGroup('trim', {
  options: [
    { opt: 'stainless', cm: 0 },
    { opt: 'titanium', cm: 0.75 },
    { opt: 'gold', cm: 5 },
    { opt: 'platinum', cm: 7.5 },
  ],
});
const wood_mechanical_pencil_option_groups = [
  wood_mechanical_pencil_material_group,
  wood_mechanical_pencil_trim_group,
  mechanical_pencil_eraser_group,
  mechanical_pencil_graphite_group,
];
// #endregion

const common = {
  skuPrefix: ITEM_PENCIL.SKU_PREFIX(MFR_PENCIL_PRINCE_REF),
  category: ITEM_PENCIL.CATEGORY,
  madeIn: 'USA',
};

const pencils = [
  {
    ...common,
    ref: ITEM_PENCIL_REFS.STANDARD(MFR_PENCIL_PRINCE_REF),
    type: ITEM_PENCIL.TYPE.STANDARD,
    name: 'Pencil Prince Standard Wooden Pencil',
    description: 'Top quality standard wooden cedar pencil.',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    pricing: { cost: 0.15, bulkCostModifiers: pencil_bulk_cost_modifiers },
    optionGroups: standard_pencil_option_groups,
  },
  {
    ...common,
    ref: ITEM_PENCIL_REFS.MECHANICAL(MFR_PENCIL_PRINCE_REF, 'plastic'),
    type: ITEM_PENCIL.TYPE.MECHANICAL,
    name: 'Pencil Prince Plastic Mechanical',
    description: 'Mechanical pencil made using a special plastic formula for improved durability.',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    pricing: { cost: 0.08, bulkCostModifiers: pencil_bulk_cost_modifiers },
    optionGroups: plastic_mechanical_pencil_option_groups,
  },
  {
    ...common,
    ref: ITEM_PENCIL_REFS.MECHANICAL(MFR_PENCIL_PRINCE_REF, 'metal'),
    type: ITEM_PENCIL.TYPE.MECHANICAL,
    name: 'Pencil Prince Metal Mechanical',
    description: 'Premium-quality solid metal mechanical pencil.',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    pricing: { cost: 1.75, wholesaleContact: 'wholesale@pencilprince.pencil' },
    optionGroups: metal_mechanical_pencil_option_groups,
  },
  {
    ...common,
    ref: ITEM_PENCIL_REFS.MECHANICAL(MFR_PENCIL_PRINCE_REF, 'wood'),
    type: ITEM_PENCIL.TYPE.MECHANICAL,
    name: 'Pencil Prince Wooden Mechanical',
    description: 'Premium-quality wooden mechanical pencil.',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    pricing: { cost: 1.85, wholesaleContact: 'wholesale@pencilprince.pencil' },
    optionGroups: wood_mechanical_pencil_option_groups,
  },
];

export default pencils;
