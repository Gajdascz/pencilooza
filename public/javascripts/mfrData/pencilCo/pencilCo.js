import pencils from './items/pencils.js';
import erasers from './items/erasers.js';
import graphites from './items/graphites.js';
import { MFR_REFS } from '../../utils/constants.js';

const mfrInfo = {
  name: 'PencilCo',
  ref: MFR_REFS.PENCIL_CO,
  description: 'A leading bulk manufacturer of basic pencils and supplies.',
  contact: {
    website: 'https://example.com',
    location: '123 Pencil Road, Graphite City, CN',
    email: 'info@pencilco.pencils',
    phone: '012-345-6789',
  },
};

const productGroups = [erasers, graphites, pencils];

const mfrData = { mfrInfo, productGroups };

export default mfrData;
