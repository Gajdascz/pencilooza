const MFR_REFS = {
  PENCIL_CO: 'PNCLCO',
  PENCIL_PRINCE: 'PNCLPRNC',
};
const ITEM_GENERAL = {
  CATEGORIES: {
    PENCIL: 'pencil',
    ERASER: 'eraser',
    GRAPHITE: 'graphite',
  },
  SKU_CODES: {
    PENCIL: 'PNCL',
    ERASER: 'ERSR',
    GRAPHITE: 'GRPT',
  },
};

const GENERATE = {
  SKU_PREFIX: (mfrRef, skuCode) => `${mfrRef}-${skuCode}`,
  REF: (mfrRef, skuCode, itemType, ver = null) =>
    `${mfrRef}_${skuCode}-${itemType}${ver ? `_${ver}` : ''}`,
};

const ITEM_PENCIL = {
  CATEGORY: ITEM_GENERAL.CATEGORIES.PENCIL,
  SKU_CODE: 'PNCL',
  TYPES: {
    STANDARD: 'standard',
    MECHANICAL: 'mechanical',
  },
  SKU_PREFIX: (mfrRef) => GENERATE.SKU_PREFIX(mfrRef, ITEM_PENCIL.SKU_CODE),
  REFS: {
    STANDARD: (mfrRef, ver = null) =>
      GENERATE.REF(mfrRef, ITEM_PENCIL.SKU_CODE, ITEM_PENCIL.TYPES.STANDARD, ver),
    MECHANICAL: (mfrRef, ver = null) =>
      GENERATE.REF(mfrRef, ITEM_PENCIL.SKU_CODE, ITEM_PENCIL.TYPES.MECHANICAL, ver),
  },
};

const ITEM_ERASER = {
  CATEGORY: ITEM_GENERAL.CATEGORIES.ERASER,
  SKU_CODE: 'ERSR',
  TYPES: {
    FIXED: 'fixed',
    CAP: 'cap',
    MECHANICAL: 'mechanical',
  },
  SKU_PREFIX: (mfrRef) => GENERATE.SKU_PREFIX(mfrRef, ITEM_ERASER.SKU_CODE),
  REFS: {
    FIXED: (mfrRef, ver = null) =>
      GENERATE.REF(mfrRef, ITEM_ERASER.SKU_CODE, ITEM_ERASER.TYPES.FIXED, ver),
    CAP: (mfrRef, ver = null) =>
      GENERATE.REF(mfrRef, ITEM_ERASER.SKU_CODE, ITEM_ERASER.TYPES.CAP, ver),
    MECHANICAL: (mfrRef, ver = null) =>
      GENERATE.REF(mfrRef, ITEM_ERASER.SKU_CODE, ITEM_ERASER.TYPES.MECHANICAL, ver),
  },
};

const ITEM_GRAPHITE = {
  CATEGORY: ITEM_GENERAL.CATEGORIES.GRAPHITE,
  SKU_CODE: 'GRPT',
  TYPES: {
    STANDARD: 'standard',
    PREMIUM: 'premium',
    LUXURY: 'luxury',
  },
  SKU_PREFIX: (mfrRef) => GENERATE.SKU_PREFIX(mfrRef, ITEM_GRAPHITE.SKU_CODE),
  REFS: {
    STANDARD: (mfrRef, ver = null) =>
      GENERATE.REF(mfrRef, ITEM_GRAPHITE.SKU_CODE, ITEM_GRAPHITE.TYPES.STANDARD, ver),
    PREMIUM: (mfrRef, ver = null) =>
      GENERATE.REF(mfrRef, ITEM_GRAPHITE.SKU_CODE, ITEM_GRAPHITE.TYPES.PREMIUM, ver),
    LUXURY: (mfrRef, ver = null) =>
      GENERATE.REF(mfrRef, ITEM_GRAPHITE.SKU_CODE, ITEM_GRAPHITE.TYPES.LUXURY, ver),
  },
};

export { MFR_REFS, ITEM_GENERAL, ITEM_PENCIL, ITEM_ERASER, ITEM_GRAPHITE };
