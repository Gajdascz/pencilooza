#! /usr/bin/env node
import mongoose from 'mongoose';
import createDebug from 'debug';
import Item from '../../models/item/Item.js';
import Mfr from '../../models/manufacturer/Mfr.js';
import mfrs from './mfrData/index.js';
import 'dotenv/config';

// Get arguments passed on command line
const mongouri = process.env.MONGO_URL || process.argv.find((arg) => arg.match('mongodb'));
const debug = createDebug('pencilooza:populatedb');
const SUCCESS = `\x1b[32mSuccess`;
const FAIL = `\x1b[31mFail`;

debug(
  'This script populates the Pencilooza database with Manufacturer and Product data. Run command: node populatedb.js "mongodb_connection_string" [--reset]. Pass --reset to delete current data before populating (WARNING DANGEROUS)\n'
);

mongoose.set('strictQuery', false);

const connect = async () => {
  const message = '- Connecting to MongoDB';
  try {
    await mongoose.connect(mongouri);
    debug(`${message}: ${SUCCESS}`);
  } catch (err) {
    debug(`${message}: ${FAIL}`);
    throw new Error(`connect - ${err.message}`);
  }
};

const disconnect = async () => {
  const message = '- Disconnecting from MongoDB';
  try {
    await mongoose.connection.close();
    debug(`${message}: ${SUCCESS}`);
  } catch (err) {
    debug(`${message}: ${FAIL}`);
    throw new Error(`disconnect - ${err.message}`);
  }
};

const itemIdMap = {};

const processOptionGroups = (optionGroups) =>
  optionGroups.map((group) => {
    const message = `|-> Processing Option GroupName: ${group.groupName}`;
    if (group.options && group.refs) {
      debug(`${message}: ${FAIL}`);
      throw new Error(
        `Item Model optionGroups cannot have a ref and options list: ${group.options} ${group.ref} `
      );
    }
    if (group.options) {
      debug(`${message}: ${SUCCESS}`);
      return group;
    }
    if (group.refs) {
      const refs = group.refs.map(({ itemId, costModifier }) => ({
        itemId: itemIdMap[itemId],
        costModifier,
      }));
      if (!refs || refs.length <= 0) {
        debug(`${message}: ${FAIL}`);
        throw new Error(
          `Item optionsGroup References: ${group.refs} were not found in itemsIdMap. Are you trying to reference another item that has not been created yet?`
        );
      } else {
        debug(`${message}: ${SUCCESS}`);
        return { ...group, refs };
      }
    }
    debug(`${message}: ${FAIL}`);
    throw new Error('Group does not have either options or ref: %O', group);
  });

const createItemModel = async (mfrId, itemInfo) => {
  const {
    category,
    skuPrefix,
    type,
    name,
    description,
    madeIn,
    stock,
    quantityPricing,
    optionGroups,
    basePpu,
  } = itemInfo;
  debug(`- Building ${name} Item Model`);
  const processedOptionGroups = processOptionGroups(optionGroups, itemIdMap);
  const message = `|--> Building Item Model`;
  const item = new Item({
    category,
    skuPrefix,
    type,
    name,
    description,
    madeIn,
    manufacturer: mfrId,
    stock,
    quantityPricing,
    basePpu,
    optionGroups: processedOptionGroups,
  });
  itemIdMap[itemInfo.ref] = item._id;
  try {
    await item.save();
    debug(`${message}: ${SUCCESS}`);
    return item;
  } catch (err) {
    debug(`${message}: ${FAIL}\n`);
    throw new Error(`createItemModel - ${err}`);
  }
};

const createMfrModel = async (mfrInfo) => {
  const message = `- Building Manufacturer Model`;
  const mfr = new Mfr(mfrInfo);
  try {
    await mfr.save();
    debug(`${message}: ${SUCCESS}`);
    return mfr;
  } catch (err) {
    debug(`${message}: ${FAIL}`);
    throw new Error(err);
  }
};

const processMfrData = async (mfrData) => {
  const { mfrInfo, productGroups } = mfrData;
  debug(`-------------- Processing ${mfrInfo.name}'s Data --------------`);
  try {
    const mfr = await createMfrModel(mfrInfo);
    for (const group of productGroups) {
      for (const product of group) {
        await createItemModel(mfr._id, product);
      }
    }
  } catch (err) {
    throw new Error(err);
  } finally {
    debug('----------------------------------------------------------\n');
  }
};

const deleteAllCollections = async () => {
  const message = `- Deleting all DB collections`;
  try {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) => {
        try {
          await collection.deleteMany({});
        } catch (err) {
          throw new Error(`Failed to delete collection: ${collection.name}`);
        }
      })
    );
    debug(`${message}: ${SUCCESS}`);
  } catch (err) {
    debug(`${message}: ${FAIL}`);
    throw new Error(err);
  }
};

async function main() {
  try {
    debug('--------------- Setting Up ---------------');
    await connect();
    if (process.argv.indexOf('--reset') !== -1) await deleteAllCollections();
    debug('------------------------------------------\n');
    for (const mfr of mfrs) {
      try {
        await processMfrData(mfr);
      } catch (err) {
        debug(err);
      }
    }
  } catch (err) {
    debug(err);
  } finally {
    debug('---------------- Cleaning Up ----------------');
    try {
      await disconnect();
    } catch (err) {
      debug(err.message);
    } finally {
      debug('------------------------------------------');
    }
  }
}

main().catch((err) => debug(`Unhandled Error caught post-execution: ${err.message}`));
