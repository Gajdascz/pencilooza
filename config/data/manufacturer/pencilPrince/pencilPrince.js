import pencils from './items/pencils.js';
import erasers from './items/erasers.js';
import graphites from './items/graphites.js';
import { MANUFACTURER_REFS } from '../../../constants.js';

const manufacturerInfo = {
  company: {
    name: 'Pencil Prince',
    ref: MANUFACTURER_REFS.PENCIL_PRINCE,
    description: 'Artisan pencils worthy of royalty.',
    structure: 'llc',
    yearFounded: '1980',
    ein: '00-0000000',
  },
  contact: {
    website: 'https://example.com',
    email: 'info@pencilprince.pencil',
    phone: '9876543210',
  },
  location: {
    countryCode: 'US',
    state: 'FL',
    postalCode: '32123',
    city: 'Orange',
    street: '42 Scribble St.',
    extension: 'PO Box 42',
  },
  rep: {
    firstName: 'Edgar',
    lastName: 'Goodtimes',
    role: 'owner',
  },
};

const productGroups = [erasers, graphites, pencils];

const manufacturerData = { manufacturerInfo, productGroups };

export default manufacturerData;
