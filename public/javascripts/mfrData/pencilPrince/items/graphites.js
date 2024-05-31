import { expandObjectKeyAbbrs } from '../../../helpers/abbrManager.js';
import {
  ITEM_GRAPHITE,
  ITEM_GRAPHITE_REFS,
  MFR_PENCIL_PRINCE_REF,
} from '../../../helpers/constants.js';
import createGroup from '../../../helpers/createGroup.js';

const graphite_bulk_cost_modifiers = expandObjectKeyAbbrs([
  { qty: 100, cm: 0 },
  { qty: 250, cm: 0.05 },
  { qty: 500, cm: 0.1 },
  { qty: 1000, cm: 0.15 },
  { qty: 10000, cm: 0.2 },
]);

// #region Graphite Option Groups
const graphite_hardness_grade_group = createGroup('hardness_grade', {
  options: [
    { option: '2H', cm: 0 },
    { option: 'H', cm: 0 },
    { option: 'HB', cm: 0 },
    { option: 'B', cm: 0 },
    { option: '2B', cm: 0 },
  ],
});

const graphite_width_group = createGroup('width', {
  options: [
    { option: '0.3mm', cm: 0 },
    { option: '0.5mm', cm: 0 },
    { option: '0.7mm', cm: 0 },
    { option: '0.9mm', cm: 0.01 },
  ],
});

const graphite_option_groups = [graphite_hardness_grade_group, graphite_width_group];
// #endregion

const common = {
  skuPrefix: ITEM_GRAPHITE.SKU_PREFIX(MFR_PENCIL_PRINCE_REF),
  category: ITEM_GRAPHITE.CATEGORY,
  madeIn: 'USA',
  optionGroups: graphite_option_groups,
};

const graphites = [
  {
    ...common,
    ref: ITEM_GRAPHITE_REFS.STANDARD(MFR_PENCIL_PRINCE_REF),
    type: ITEM_GRAPHITE.TYPE.STANDARD,
    name: 'Pencil Prince Standard Replacement Graphite',
    description:
      'Standard replacement lead using a precise blend of high-purity graphite and quality binders. Each package comes with 50 pieces.',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    pricing: { cost: 0.08, bulkCostModifiers: graphite_bulk_cost_modifiers },
  },
  {
    ...common,
    ref: ITEM_GRAPHITE_REFS.PREMIUM(MFR_PENCIL_PRINCE_REF),
    type: ITEM_GRAPHITE.TYPE.PREMIUM,
    name: 'Pencil Prince Premium Replacement Graphite',
    description:
      'Premium-quality replacement lead that uses a specialty mixture including high-purity graphite. Each package comes with 50 pieces.',
    stock: Math.ceil(Math.random() * 5000) + 5000,
    pricing: { cost: 0.1, bulkCostModifiers: graphite_bulk_cost_modifiers },
  },
  {
    ...common,
    ref: ITEM_GRAPHITE_REFS.LUXURY(MFR_PENCIL_PRINCE_REF),
    type: ITEM_GRAPHITE.TYPE.LUXURY,
    name: 'Pencil Prince Royal Replacement Graphite',
    description:
      'Royal-quality replacement lead crafted using a research-backed proprietary mixture including only the highest quality materials. Each package comes with 50 pieces.',
    stock: Math.ceil(Math.random() * 5000) + 5000,
    pricing: { cost: 0.15, bulkCostModifiers: graphite_bulk_cost_modifiers },
  },
];

export default graphites;
