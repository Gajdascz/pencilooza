import pencils from './items/pencils.js';
import erasers from './items/erasers.js';
import graphites from './items/graphites.js';

const mfrInfo = {
  name: 'Pencil Prince',
  description: 'Artisan pencils worthy of royalty.',
  contact: {
    website: 'https://example.com',
    location: '042 Sharpen St, Scribble Town, USA',
    email: 'info@pencilprince.pencil',
    phone: '987-654-3210',
  },
};

const productGroups = [erasers, graphites, pencils];

const mfrData = { mfrInfo, productGroups };

export default mfrData;
