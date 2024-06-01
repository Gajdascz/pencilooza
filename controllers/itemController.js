import asyncHandler from 'express-async-handler';

import Item from '../models/item/Item.js';
import Mfr from '../models/manufacturer/Mfr.js';

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
    console.log(await Item.findById(req.params.id).populate('manufacturer').exec());
    const {
      name,
      category,
      type,
      description,
      stock,
      madeIn,
      manufacturer,
      pricing,
      optionGroups,
      sku,
    } = await Item.findById(req.params.id).populate('manufacturer').exec();
    res.render('itemDetail', {
      name,
      category,
      type,
      description,
      stock,
      madeIn,
      manufacturer,
      pricing,
      optionGroups,
      sku,
    });
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
