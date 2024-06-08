import pencils from './items/pencils.js';
import erasers from './items/erasers.js';
import graphites from './items/graphites.js';
import { MANUFACTURER_REFS } from '../../utils/constants.js';

const manufacturerInfo = {
  ref: MANUFACTURER_REFS.PENCIL_CO,
  company: {
    name: 'PencilCo',
    description: 'High-Volume Low-Cost.',
    structure: 'corporation',
    yearFounded: '2002',
    ein: '99-9999999',
  },
  contact: {
    website: 'https://example.com',
    email: 'info@pencilco.pencils',
    phone: '0123456789',
  },
  location: {
    countryCode: 'CN',
    state: 'Guangdong',
    postalCode: '510000',
    city: 'Guangzhou',
    street: '123 Graphite Lane',
    extension: 'PO Box 42',
  },
  rep: {
    firstName: 'David',
    lastName: 'Smith',
    role: 'manager',
  },
};

const productGroups = [erasers, graphites, pencils];

const manufacturerData = { manufacturerInfo, productGroups };

export default manufacturerData;
