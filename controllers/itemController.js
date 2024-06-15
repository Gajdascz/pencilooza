import asyncHandler from 'express-async-handler';
import Item from '../models/item/Item.js';
import Manufacturer from '../models/manufacturer/Manufacturer.js';
import Registration from '../models/registration/Registration.js';

const itemController = {
  getList: asyncHandler(async (req, res, next) => {
    const allItems = await Item.find({}, 'name type category manufacturer')
      .sort({ manufacturer: 1 })
      .populate('manufacturer', 'company.name')
      .exec();
    const entities = allItems.map((item) => ({
      url: item.url,
      label: `${item.name} (${item.manufacturer.company.name})`,
    }));
    res.render('list', { title: 'All Items', entities });
  }),
  getDetail: asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id);
    const {
      name,
      category,
      type,
      description,
      stock,
      madeIn,
      manufacturer,
      quantityPricing,
      basePpu,
      optionGroups,
      sku,
    } = await item.getProcessedData();
    res.render('itemDetail', {
      name,
      category,
      type,
      description,
      stock,
      madeIn,
      manufacturer,
      quantityPricing,
      optionGroups,
      sku,
      basePpu,
      defaultSelected: {
        quantityPricing: quantityPricing[0],
        options: optionGroups.map(({ groupName, options }) => ({
          groupName,
          option: options[0],
        })),
      },
    });
  }),
};
export default itemController;
