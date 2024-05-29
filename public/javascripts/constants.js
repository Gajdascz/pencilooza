const ITEM_CATEGORIES = {
  ERASER: 'eraser',
  GRAPHITE: 'graphite',
  PENCIL_STANDARD: 'standardPencil',
  PENCIL_MECHANICAL: 'mechanicalPencil',
};
const BULK_FACTORS = [
  { min_quantity: 25, factor: 1 },
  { min_quantity: 50, factor: 0.85 },
  { min_quantity: 1000, factor: 0.65 },
];
const LEAD_HARDNESSES = ['2H', 'H', 'HB', 'B', '2B'];
const LEAD_WIDTHS = ['0.3mm', '0.5mm', '0.7mm', '0.9mm'];

const MANUFACTURER_REFS = {
  PENCIL_CO: 'pencilCo',
  PENCIL_PRINCE: 'pencilPrince',
};
const ERASER_REFS = {
  PENCIL_CO_CAP: 'pencilCoCap',
  PENCIL_CO_REPLACEMENT: 'pencilCoReplacement',
  PENCIL_PRINCE_CAP: 'pencilPrinceCap',
  PENCIL_PRINCE_REPLACEMENT: 'pencilPrinceReplacement',
};
const GRAPHITE_REFS = {
  PENCIL_CO_STANDARD: 'pencilCoStandard',
  PENCIL_PRINCE_STANDARD: 'pencilPrinceStandard',
  PENCIL_PRINCE_PREMIUM: 'pencilPrincePremium',
  PENCIL_PRINCE_ROYAL: 'pencilPrinceRoyal',
};

const PENCIL_CO_ERASER_COLORS = ['pink', 'red', 'blue', 'green', 'white'];
const PENCIL_PRINCE_ERASER_COLORS = [
  'pink',
  'red',
  'blue',
  'green',
  'white',
  'black',
  'gold',
  'purple',
];
export {
  ITEM_CATEGORIES,
  BULK_FACTORS,
  LEAD_HARDNESSES,
  LEAD_WIDTHS,
  MANUFACTURER_REFS,
  ERASER_REFS,
  GRAPHITE_REFS,
  PENCIL_CO_ERASER_COLORS,
  PENCIL_PRINCE_ERASER_COLORS,
};
