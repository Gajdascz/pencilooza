import { graphites } from './items/graphites';
import { erasers } from './items/erasers';
import { pencils } from './items/pencils';

const mfrData = {
  name: 'Pencil Prince',
  description: 'Artisan pencils worthy of royalty.',
  contact: {
    website: 'https://pencilprince.com',
    location: '042 Sharpen St, Scribble Town, ',
    email: 'info@pencilprince.com',
    phone: '888-444-4321',
  },
};

const products = [pencils, graphites, erasers];

export default { mfrData, products };
