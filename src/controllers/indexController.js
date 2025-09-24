import asyncHandler from 'express-async-handler';
import Item from '../src/models/item/Item.js';
import Manufacturer from '../src/models/Manufacturer.js';
import Application from '../src/models/Application.js';

const manufacturerCount = Manufacturer.countDocuments({}).exec();
const applicationAggregation = Application.aggregate([
  {
    $facet: {
      pendingManufacturers: [
        { $match: { type: 'manufacturer', status: 'pending' } },
        { $group: { _id: null, count: { $sum: 1 } } },
        { $project: { _id: 0, count: 1 } },
      ],
      pendingItems: [
        { $match: { type: 'item', status: 'pending' } },
        { $group: { _id: null, count: { $sum: 1 } } },
        { $project: { _id: 0, count: 1 } },
      ],
      acceptedApplications: [
        { $match: { status: 'accepted' } },
        { $group: { _id: null, count: { $sum: 1 } } },
        { $project: { _id: 0, count: 1 } },
      ],
      rejectedApplications: [
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
      totalAcceptedApplications: {
        $ifNull: [{ $arrayElemAt: ['$acceptedApplications.count', 0] }, 0],
      },
      totalRejectedApplications: {
        $ifNull: [{ $arrayElemAt: ['$rejectedApplications.count', 0] }, 0],
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
const indexController = {
  get: asyncHandler(async (req, res, next) => {
    const [
      totalManufacturers,
      [{ totalItems, totalCategories, totalTypes, totalMadeIn, totalStock }],
      [{ totalPendingManufacturers, totalPendingItems, totalAcceptedApplications, totalRejectedApplications }],
    ] = await Promise.all([manufacturerCount, itemAggregation, applicationAggregation]);

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
      totalAcceptedApplications,
      totalRejectedApplications,
    });
  }),
};

export default indexController;
