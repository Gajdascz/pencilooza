import pencils from './items/pencils.js';
import erasers from './items/erasers.js';
import graphites from './items/graphites.js';
import { MANUFACTURER_REFS } from '../../../constants.js';

const manufacturerInfo = {
  company: {
    name: 'PencilCo',
    ref: MANUFACTURER_REFS.PENCIL_CO,
    description: 'We got pencils.',
    structure: 'corporation',
    yearFounded: '1980',
    ein: '00-0000000',
  },
  contact: {
    website: 'https://example.com',
    email: 'info@pencilCo.pencil',
    phone: '000-000-0000',
  },
  location: {
    countryCode: 'US',
    state: 'FL',
    postalCode: '32123',
    city: 'Orangeish',
    street: '42 Scribble St.',
    extension: 'PO Box 42',
  },
  rep: {
    firstName: 'Edgar',
    lastName: 'Writesalot',
    role: 'owner',
  },
};

const productGroups = [erasers, graphites, pencils];

export default { manufacturerInfo, productGroups };
