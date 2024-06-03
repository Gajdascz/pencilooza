import asyncHandler from 'express-async-handler';
import Item from '../models/item/Item.js';
import Mfr from '../models/manufacturer/Mfr.js';

const renderDetail = (res, item, total, selected) => {
  res.render('itemDetail', {
    name: item.name,
    category: item.category,
    type: item.type,
    description: item.description,
    stock: item.stock,
    madeIn: item.madeIn,
    manufacturer: item.manufacturer,
    pricing: item.pricing,
    optionGroups: item.optionGroups,
    sku: item.sku,
    total,
    selected,
  });
};

const getDetailTotal = (qty, ppu, optGroups) =>
  qty * optGroups.reduce((acc, curr) => (acc += ppu * curr.options[0].costModifier), ppu);

const itemController = {
  index: asyncHandler(async (req, res, next) => {
    const [totalMfrs, [{ totalItems, totalCategories, totalTypes, totalMadeIn, totalStock }]] =
      await Promise.all([
        Mfr.countDocuments({}).exec(),
        Item.aggregate([
          {
            $facet: {
              totalItems: [{ $count: 'total' }],
              properties: [
                {
                  $group: {
                    _id: null,
                    uniqueCategories: { $addToSet: '$category' },
                    uniqueTypes: { $addToSet: '$type' },
                    uniqueMadeIn: { $addToSet: '$madeIn' },
                    itemStock: { $push: '$stock' },
                  },
                },
                {
                  $project: {
                    _id: 0,
                    totalCategories: { $size: '$uniqueCategories' },
                    totalTypes: { $size: '$uniqueTypes' },
                    totalMadeIn: { $size: '$uniqueMadeIn' },
                    totalStock: { $sum: '$itemStock' },
                  },
                },
              ],
            },
          },
          {
            $project: {
              totalItems: { $arrayElemAt: ['$totalItems.total', 0] },
              totalCategories: { $arrayElemAt: ['$properties.totalCategories', 0] },
              totalTypes: { $arrayElemAt: ['$properties.totalTypes', 0] },
              totalMadeIn: { $arrayElemAt: ['$properties.totalMadeIn', 0] },
              totalStock: { $arrayElemAt: ['$properties.totalStock', 0] },
            },
          },
        ]).exec(),
      ]);
    res.render('index', {
      title: 'Home',
      totalMfrs,
      totalItems,
      totalCategories,
      totalTypes,
      totalMadeIn,
      totalStock,
    });
  }),
  itemList: asyncHandler(async (req, res, next) => {
    const allItems = await Item.find({}, 'name type category manufacturer')
      .sort({ category: -1 })
      .populate('manufacturer')
      .exec();
    res.render('itemList', { title: 'All Items', items: allItems });
  }),
  itemDetail: asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id);
    const processedItem = await item.getProcessedData();
    renderDetail(res, processedItem, getDetailTotal(), { ppu: processedItem.pricing[0].ppuDiff });
    const { ppu, quantity, msrp } = pricing[0];
    const selected = {
      qty: quantity,
      options: optionGroups.map((group) => ({ name: group.group, value: group.options[0].option })),
    };
  }),
  itemUpdateDetail: asyncHandler(async (req, res, next) => {
    console.log(res);
  }),
  itemGetCreate: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  itemPostCreate: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  itemGetDelete: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  itemPostDelete: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  itemGetUpdate: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
  itemPostUpdate: asyncHandler(async (req, res, next) => {
    res.send('TBI');
  }),
};
export default itemController;
