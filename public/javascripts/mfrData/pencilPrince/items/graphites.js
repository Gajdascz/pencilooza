import { expandObjectKeyAbbrs } from '../../../utils/abbrManager.js';
import { ITEM_GRAPHITE, MFR_REFS } from '../../../utils/constants.js';
import createGroup from '../../../utils/createGroup.js';

const graphiteQuantityPricingGroup = expandObjectKeyAbbrs([
  { opt: 100, cm: 0 },
  { opt: 250, cm: 0.05 },
  { opt: 500, cm: 0.1 },
  { opt: 1000, cm: 0.15 },
  { opt: 10000, cm: 0.2 },
]);

// #region Graphite Option Groups
const graphiteHardnessGradeGroup = createGroup('grade', {
  options: [
    { opt: '2H', cm: 0 },
    { opt: 'H', cm: 0 },
    { opt: 'HB', cm: 0 },
    { opt: 'B', cm: 0 },
    { opt: '2B', cm: 0 },
  ],
});

const graphiteWidthGroup = createGroup('width', {
  options: [
    { opt: '0.3mm', cm: 0 },
    { opt: '0.5mm', cm: 0 },
    { opt: '0.7mm', cm: 0 },
    { opt: '0.9mm', cm: 0.01 },
  ],
});

const graphite_option_groups = [
  graphiteQuantityPricingGroup,
  graphiteHardnessGradeGroup,
  graphiteWidthGroup,
];
// #endregion

const common = {
  skuPrefix: ITEM_GRAPHITE.SKU_PREFIX(MFR_REFS.PENCIL_PRINCE),
  category: ITEM_GRAPHITE.CATEGORY,
  madeIn: 'US',
  optionGroups: graphite_option_groups,
};

const graphites = [
  {
    ...common,
    ref: ITEM_GRAPHITE.REFS.STANDARD(MFR_REFS.PENCIL_PRINCE),
    type: ITEM_GRAPHITE.TYPES.STANDARD,
    name: 'Pencil Prince Standard Replacement Graphite',
    description:
      'Standard replacement lead using a precise blend of high-purity graphite and quality binders. Each package comes with 50 pieces.',
    stock: Math.ceil(Math.random() * 10000) + 10000,
    basePpu: 0.06,
  },
  {
    ...common,
    ref: ITEM_GRAPHITE.REFS.PREMIUM(MFR_REFS.PENCIL_PRINCE),
    type: ITEM_GRAPHITE.TYPES.PREMIUM,
    name: 'Pencil Prince Premium Replacement Graphite',
    description:
      'Premium-quality replacement lead that uses a specialty mixture including high-purity graphite. Each package comes with 50 pieces.',
    stock: Math.ceil(Math.random() * 5000) + 5000,
    basePpu: 0.1,
  },
  {
    ...common,
    ref: ITEM_GRAPHITE.REFS.LUXURY(MFR_REFS.PENCIL_PRINCE),
    type: ITEM_GRAPHITE.TYPES.LUXURY,
    name: 'Pencil Prince Royal Replacement Graphite',
    description:
      'Royal-quality replacement lead crafted using a research-backed proprietary mixture including only the highest quality materials. Each package comes with 50 pieces.',
    stock: Math.ceil(Math.random() * 5000) + 5000,
    basePpu: 0.18,
  },
];

export default graphites;
