import asyncHandler from 'express-async-handler';
import Item from '../models/item/Item.js';
import Manufacturer from '../models/manufacturer/Manufacturer.js';
import Registration from '../models/registration/Registration.js';

const manufacturerCount = Manufacturer.countDocuments({}).exec();
const registrationAggregation = Registration.aggregate([
  {
    $facet: {
      pendingManufacturers: [
        { $match: { type: 'Manufacturer', status: 'pending' } },
        { $group: { _id: null, count: { $sum: 1 } } },
        { $project: { _id: 0, count: 1 } },
      ],
      pendingItems: [
        { $match: { type: 'Item', status: 'pending' } },
        { $group: { _id: null, count: { $sum: 1 } } },
        { $project: { _id: 0, count: 1 } },
      ],
      acceptedRegistrations: [
        { $match: { status: 'accepted' } },
        { $group: { _id: null, count: { $sum: 1 } } },
        { $project: { _id: 0, count: 1 } },
      ],
      rejectedRegistrations: [
        { $match: { status: 'rejected' } },
        { $group: { _id: null, count: { $sum: 1 } } },
        { $project: { _id: 0, count: 1 } },
      ],
    },
  },
  {
    $project: {
      totalPendingManufacturers: {
        $ifNull: [{ $arrayElemAt: ['$pendingManufacturers.count', 0] }, 0],
      },
      totalPendingItems: { $ifNull: [{ $arrayElemAt: ['$pendingItems.count', 0] }, 0] },
      totalAcceptedRegistrations: {
        $ifNull: [{ $arrayElemAt: ['$acceptedRegistrations.count', 0] }, 0],
      },
      totalRejectedRegistrations: {
        $ifNull: [{ $arrayElemAt: ['$rejectedRegistrations.count', 0] }, 0],
      },
    },
  },
]).exec();
const itemAggregation = Item.aggregate([
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
]).exec();

const itemController = {
  index: asyncHandler(async (req, res, next) => {
    const [
      totalManufacturers,
      [{ totalItems, totalCategories, totalTypes, totalMadeIn, totalStock }],
      [{ totalPendingManufacturers, totalPendingItems, totalAcceptedRegistrations, totalRejectedRegistrations }],
    ] = await Promise.all([manufacturerCount, itemAggregation, registrationAggregation]);

    res.render('index', {
      title: 'Home',
      totalManufacturers,
      totalItems,
      totalCategories,
      totalTypes,
      totalMadeIn,
      totalStock,
      totalPendingManufacturers,
      totalPendingItems,
      totalAcceptedRegistrations,
      totalRejectedRegistrations,
    });
  }),
  getList: asyncHandler(async (req, res, next) => {
    const allItems = await Item.find({}, 'name type category manufacturer')
      .sort({ manufacturer: 1 })
      .populate('manufacturer', 'company.name')
      .exec();
    const entities = allItems.map((item) => ({
      url: item.url,
      label: `${item.name} ${item.manufacturer.company.name}`,
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
  // itemGetCreate: asyncHandler(async (req, res, next) => {
  //   res.send('TBI');
  // }),
  // itemPostCreate: asyncHandler(async (req, res, next) => {
  //   res.send('TBI');
  // }),
  // itemGetDelete: asyncHandler(async (req, res, next) => {
  //   res.send('TBI');
  // }),
  // itemPostDelete: asyncHandler(async (req, res, next) => {
  //   res.send('TBI');
  // }),
  // itemGetUpdate: asyncHandler(async (req, res, next) => {
  //   res.send('TBI');
  // }),
  // itemPostUpdate: asyncHandler(async (req, res, next) => {
  //   res.send('TBI');
  // }),
};
export default itemController;
