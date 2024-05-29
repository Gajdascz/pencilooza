#! /usr/bin/env node
import mongoose from 'mongoose';
import createDebug from 'debug';

import ItemModel from '../../components/Item/Item.js';
import CategoryModel from '../../components/Category/Category.js';
import SubcategoryModel from '../../components/Subcategory/Subcategory.js';

import { categoriesData, itemsData, subcategoriesData } from './documentData.js';

// Get arguments passed on command line
const mongouri = process.argv.find((arg) => arg.match('mongodb'));
const debug = createDebug('indevtory:populatedb');

debug(
  'This script populates the InDevtory database with Item, Category, and Subcategory documents. Run command: node populatedb.js "mongodb_connection_string"'
);

mongoose.set('strictQuery', false);

const connect = async () => {
  try {
    await mongoose.connect(mongouri);
  } catch (err) {
    throw new Error(`Connection to MongoDB Failed: ${err.message}`);
  }
};

const disconnect = async () => {
  try {
    await mongoose.connection.close();
  } catch (err) {
    throw new Error(`Disconnect from MongoDB Failed: ${err.message}`);
  }
};

const categoriesIdMap = {};
const createCategoryModel = (category) =>
  new CategoryModel({
    name: category.name,
    description: category.description,
  });

const createCategories = async () => {
  try {
    const modelPromises = categoriesData.map(async (category) => {
      debug(`Creating Category: ${category.name}`);
      const model = createCategoryModel(category);
      debug(`Mapping Category: ${category.ref} to ${model._id}`);
      categoriesIdMap[category.ref] = model._id;
      debug(`Saving Category: ${category.name} to Database`);
      await model.save();
    });
    debug(`Ensuring all Category model save request promises are resolved.`);
    await Promise.all(modelPromises);
  } catch (err) {
    throw new Error(`Failed to create and save Category models: ${err.message}`);
  }
};

const subcategoriesIdMap = {};
const createSubcategoryModel = (subcategory) =>
  new SubcategoryModel({
    name: subcategory.name,
    description: subcategory.description,
    category: categoriesIdMap[subcategory.category],
  });
const createSubcategories = async () => {
  try {
    const modelPromises = subcategoriesData.map(async (subcategory) => {
      debug(`Creating Subcategory: ${subcategory.name}`);
      const model = createSubcategoryModel(subcategory);
      debug(`Mapping Subcategory: ${subcategory.ref} to ${model._id}`);
      subcategoriesIdMap[subcategory.ref] = model._id;
      debug(`Saving Subcategory: ${subcategory.name} to Database`);
      await model.save();
    });
    debug(`Ensuring all Subcategory model save request promises are resolved.`);
    await Promise.all(modelPromises);
  } catch (err) {
    throw new Error(`Failed to create and save Subcategory models: ${err.message}`);
  }
};
const createItemModel = (item) =>
  new ItemModel({
    name: item.name,
    description: item.description,
    category: categoriesIdMap[item.category],
    subcategory: subcategoriesIdMap[item.subcategory],
    price: item.price,
    dynamic_attributes: item.dynamic_attributes,
  });
const createItems = async () => {
  try {
    const modelPromises = itemsData.map(async (item) => {
      debug(`Creating Item: ${item.name}`);
      const model = createItemModel(item);
      debug(`Saving Item: ${item.name} to Database`);
      await model.save();
    });
    debug(`Ensuring all Item model save request promises are resolved.`);
    await Promise.all(modelPromises);
  } catch (err) {
    throw new Error(`Failed to create and save Item models: ${err.message}`);
  }
};

async function main() {
  try {
    debug('----- Connecting to MongoDB -----');
    await connect();
    debug('----- Connected -----');
    if (process.argv.indexOf('-r') !== -1) {
      debug('----- Deleting current collections -----');
      await Promise.all(
        Object.values(mongoose.connection.collections).map((collection) =>
          collection.deleteMany({})
        )
      );
      debug('----- Current collections deleted -----');
    }

    debug('----- Creating Category Models -----');
    await createCategories();
    debug('----- Category Models Created -----');

    debug('----- Creating Subcategory Models -----');
    await createSubcategories();
    debug('----- Subcategory Models Created -----');

    debug('----- Creating Item Models -----');
    await createItems();
    debug('----- Item Models Created -----');
  } catch (err) {
    debug(`Error populating database: ${err}`);
  } finally {
    try {
      debug('----- Disconnecting from MongoDB -----');
      await disconnect();
      debug('----- Disconnected -----');
    } catch (err) {
      debug(err.message);
    }
  }
}

main().catch((err) => debug(`Unhandled Error caught post-execution: ${err.message}`));
