import { MANUFACTURER_REFS } from './constants';

const manufacturers = [
  {
    ref: MANUFACTURER_REFS.PENCIL_CO,
    name: 'PencilCo',
    description: 'A leading bulk manufacturer of basic pencils and supplies.',
    contact: {
      website: 'https://pencilco.com',
      location: '123 Pencil Road, Graphite City, USA',
      email: 'info@pencilco.com',
      phone: '888-555-1234',
    },
  },
  {
    ref: MANUFACTURER_REFS.PENCIL_PRINCE,
    name: 'Pencil Prince',
    description: 'Artisan pencils worthy of royalty.',
    contact: {
      website: 'https://pencilprince.com',
      location: '042 Sharpen St, Scribble Town, ',
      email: 'info@pencilprince.com',
      phone: '888-444-4321',
    },
  },
];

export default manufacturers;
