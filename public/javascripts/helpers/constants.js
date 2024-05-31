const MFR_PENCIL_CO_REF = 'PNCLCO';
const MFR_PENCIL_PRINCE_REF = 'PNCLPRNC';

const ITEM_PENCIL = {
  CATEGORY: 'pencil',
  TYPE: {
    STANDARD: 'standard',
    MECHANICAL: 'mechanical',
  },
  SKU_PREFIX: (mfrAbbr) => `${mfrAbbr}-PNCL`,
};

const ITEM_PENCIL_REFS = {
  STANDARD: (mfrAbbr, ver = null) => `${mfrAbbr}_standard-pencil${ver ? `_${ver}` : ''}`,
  MECHANICAL: (mfrAbbr, ver = null) => `${mfrAbbr}_mechanical-pencil${ver ? `${ver}` : ''}`,
};

const ITEM_ERASER = {
  CATEGORY: 'eraser',
  TYPE: {
    FIXED: 'fixed',
    CAP: 'cap',
    MECHANICAL: 'mechanical',
  },
  SKU_PREFIX: (mfrAbbr) => `${mfrAbbr}-ERSR`,
};
const ITEM_ERASER_REFS = {
  FIXED: (mfrAbbr, ver = null) => `${mfrAbbr}_fixed-eraser${ver ? `_${ver}` : ''}`,
  CAP: (mfrAbbr, ver = null) => `${mfrAbbr}_cap-eraser${ver ? `${ver}` : ''}`,
  MECHANICAL: (mfrAbbr, ver = null) => `${mfrAbbr}_mechanical-eraser${ver ? `${ver}` : ''}`,
};

const ITEM_GRAPHITE = {
  CATEGORY: 'graphite',
  TYPE: {
    STANDARD: 'standard',
    PREMIUM: 'premium',
    LUXURY: 'luxury',
  },
  SKU_PREFIX: (mfrAbbr) => `${mfrAbbr}-GRPT`,
};

const ITEM_GRAPHITE_REFS = {
  STANDARD: (mfrAbbr, ver = null) => `${mfrAbbr}_standard-graphite${ver ? `_${ver}` : ''}`,
  PREMIUM: (mfrAbbr, ver = null) => `${mfrAbbr}_premium-graphite${ver ? `${ver}` : ''}`,
  LUXURY: (mfrAbbr, ver = null) => `${mfrAbbr}_luxury-graphite${ver ? `${ver}` : ''}`,
};

export {
  ITEM_PENCIL,
  ITEM_PENCIL_REFS,
  ITEM_ERASER,
  ITEM_ERASER_REFS,
  ITEM_GRAPHITE,
  ITEM_GRAPHITE_REFS,
  MFR_PENCIL_CO_REF,
  MFR_PENCIL_PRINCE_REF,
};
