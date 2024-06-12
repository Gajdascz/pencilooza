import Manufacturer from '../../../models/manufacturer/Manufacturer.js';
import Item from '../../../models/item/Item.js';
import Registration from '../../../models/registration/Registration.js';

const find = {
  allManufacturers: () => Manufacturer.find({}, 'company.name').sort({ name: 1 }).exec(),
  manufacturer: (mfrId) => Manufacturer.findById(mfrId).exec(),
  products: (mfrId) => Item.find({ manufacturer: mfrId }).exec(),
  registration: (mfrId) => Registration.findOne({ acceptedModelId: mfrId }).exec(),
};

export default find;
