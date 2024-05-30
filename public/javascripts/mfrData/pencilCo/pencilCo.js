import { pencils } from './items/pencils.js';
import { erasers } from './items/erasers.js';
import { graphites } from './items/graphites.js';

const mfrInfo = {
  ref: 'PENCIL_CO',
  name: 'PencilCo',
  description: 'A leading bulk manufacturer of basic pencils and supplies.',
  contact: {
    website: 'https://example.com',
    location: '123 Pencil Road, Graphite City, USA',
    email: 'info@pencilco',
    phone: '012-345-6789',
  },
};
const productsInfo = [
  { category: 'pencils', sku_prefix: 'PNCLCO-PNCL', itemsInfo: pencils },
  { category: 'graphites', sku_prefix: 'PNCLCO-GRPT', itemsInfo: graphites },
  { category: 'erasers', sku_prefix: 'PNCLCO-ERSR', itemsInfo: erasers },
];

export default { mfrInfo, productsInfo };
