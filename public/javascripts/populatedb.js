#! /usr/bin/env node
import mongoose from 'mongoose';
import createDebug from 'debug';

import Item from '../../models/item/Item.js';
import Manufacturer from '../../models/manufacturer/Manufacturer.js';

import { pencilCo, pencilPrince } from './mfrData/index.js';

// Get arguments passed on command line
const mongouri = process.argv.find((arg) => arg.match('mongodb'));
const debug = createDebug('pencilooza:populatedb');

debug(
  'This script populates the Pencilooza database with Manufacturer and Product data. Run command: node populatedb.js "mongodb_connection_string". Pass [-r] flag to delete current data before populating (WARNING DANGEROUS)'
);

mongoose.set('strictQuery', false);

const connect = async () => {
  try {
    debug('connect ----- Connecting to MongoDB');
    await mongoose.connect(mongouri);
    debug('connect ----- Success');
  } catch (err) {
    debug('connect ----- Fail');
    throw new Error(`Connection to MongoDB Failed: ${err.message}`);
  }
};

const disconnect = async () => {
  try {
    debug('disconnect ----- Disconnecting from MongoDB');
    await mongoose.connection.close();
    debug('disconnect ----- Success');
  } catch (err) {
    debug('disconnect ----- Fail');
    throw new Error(`Disconnect from MongoDB Failed: ${err.message}`);
  }
};

const processOptionGroups = (optionGroups, itemIdMap) =>
  optionGroups.map((group) => {
    if (group.options && group.ref) {
      throw new Error(
        `Item Model Options cannot have a ref and options list: ${group.options} ${group.ref} `
      );
    }
    if (group.options) return group;
    if (group.ref) {
      const refId = itemIdMap[group.ref];
      if (!refId) {
        throw new Error(
          `Item optionsGroup Reference: ${group.ref} was not found in itemsIdMap. Are you trying to reference another item that has not been created yet?`
        );
      } else return { ...group, ref: refId };
    }
    throw new Error('Group does not have either options or ref: %O', group);
  });

const createItemModel = async (mfrId, { category, sku_prefix, itemInfo }) => {
  const itemIdMap = {};
  const { name, description, made_in, stock, pricing, optionGroups } = itemInfo;
  const item = new Item({
    category,
    sku_prefix,
    name,
    description,
    made_in,
    manufacturer: mfrId,
    stock,
    pricing,
    optionGroups: processOptionGroups(optionGroups, itemIdMap),
  });
  itemIdMap[itemInfo.ref] = item._id;
  try {
    debug('createItemModel: Creating Item Model');
    await item.save();
    debug('createItemModel: Success');
    return item;
  } catch (err) {
    debug('createItemModel: Fail');
    throw new Error(`createItemModel Error: ${err}`);
  }
};

const createMfrModel = async (mfrInfo) => {
  const mfr = new Manufacturer(mfrInfo);
  try {
    debug('createMfrModel: Creating Mfr Model');
    await mfr.save();
    debug('createMfrModel: Success');
    return mfr;
  } catch (err) {
    debug('createMfrModel: Fail');
    throw new Error(`createMfrModel Error: ${err}`);
  }
};

const processMfrData = async (mfrData) => {
  const { mfrInfo, productsInfo } = mfrData;
  try {
    debug('----- Creating Mfr Model -----');
    const mfr = await createMfrModel(mfrInfo);
    debug('------------------------------');
    debug('----- Creating Item Models -----');
    const productModelPromises = productsInfo.map(
      async (productInfo) => await createItemModel(mfr._id, productInfo)
    );
    await Promise.all(productModelPromises);
    debug('------------------------------');
  } catch (err) {
    throw new Error(`processMfrData Error: ${err}`);
  }
};

const deleteAllCollections = () => {
  debug();
  Object.values(mongoose.connection.collections).map((collection) => collection.deleteMany({}));
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
