#! /usr/bin/env node
import mongoose from 'mongoose';
import createDebug from 'debug';
import Item from '../../models/item/Item.js';
import Manufacturer from '../../models/manufacturer/Manufacturer.js';
import manufacturers from './manufacturerData/index.js';
import 'dotenv/config';

// Get arguments passed on command line
const mongouri = process.env.MONGO_URL || process.argv.find((arg) => arg.match('mongodb'));
const debug = createDebug('pencilooza:populatedb');

const SUCCESS = `\x1b[32mSuccess`;
const FAIL = `\x1b[31mFail`;

console.log(
  'This script populates the Pencilooza database with Manufacturer and Product data. Run command: node populatedb.js "mongodb_connection_string" [--reset]. Pass --reset to delete current data before populating (WARNING DANGEROUS)\n'
);

const getResultMsg = (msg, success = true) => `${msg}: ${success ? SUCCESS : FAIL}`;

const log = {
  bh: (blockName) => debug(`---------- ${blockName}`), // Block Header
  bf: () => debug(`----------------------------------------`), // Block Footer
  sgh: (msg) => debug(`|> ${msg}`), // Block Step Group Header
  ss: (msg) => debug(`|-> ${getResultMsg(msg)}`), // Step Success
  sf: (msg, err) => {
    debug(`|-> ${getResultMsg(msg, false)}`);
    debug(`|--> ${err.message}`);
  }, // Step Fail Error
  sss: (msg) => debug(`|--> ${getResultMsg(msg)}`), // Sub Step Success
  ssf: (msg, err) => {
    debug(`|-> ${getResultMsg(msg, false)}`);
    debug(`|-> ${err.message}`);
  }, // Final Step Success
};

mongoose.set('strictQuery', false);

const connectionController = {
  client: null,
  inventoryDb: null,
  initProperties: () => {
    connectionController.client = mongoose.connection.client;
    connectionController.inventoryDb = connectionController.client?.db('inventory');
    if (!connectionController.client || !connectionController.inventoryDb) {
      throw new Error('Failed to set controller properties.');
    }
  },
  resetProperties: () => {
    connectionController.client = null;
    connectionController.inventoryDb = null;
  },
  connect: async () => {
    try {
      if (connectionController.client !== null) await connectionController.disconnect();
      await mongoose.connect(mongouri);
      connectionController.initProperties();
    } catch (err) {
      throw new Error(`Failed to connect to mongoDB: ${err.message}`);
    }
  },
  disconnect: async () => {
    try {
      await mongoose.connection.close();
      connectionController.resetProperties();
    } catch (err) {
      throw new Error(`Failed to disconnect from MongoDB: ${err.message}`);
    }
  },
  deleteAllCollections: async () => {
    const db = connectionController.inventoryDb;
    if (!db) {
      throw new Error(
        'Invalid connectionController inventoryDb property. Please ensure a valid connection.'
      );
    }
    let collections = null;
    try {
      collections = await db.listCollections().toArray();
      if (collections.length === 0) return;
    } catch (err) {
      throw new Error(`Failed to fetch collections from ${db.databaseName}`);
    }
    for (const collection of collections) {
      try {
        await db.collection(collection.name).deleteMany({});
      } catch (err) {
        throw new Error(`Failed to delete collection: ${collection.name}`);
      }
    }
  },
};

const itemIdMap = {};

const processOptionGroups = (optionGroups) =>
  optionGroups.map((group) => {
    if (group.options && group.refs) {
      throw new Error(`OptionGroup: ${group.groupName} cannot have both references and options.`);
    }
    if (group.options) return group;
    if (group.refs) {
      const refs = group.refs.map(({ itemId, costModifier }) => ({
        itemId: itemIdMap[itemId],
        costModifier,
      }));
      if (!refs || refs.length <= 0) {
        throw new Error(
          `OptionGroup: ${group.groupName} has references that are not in the itemIdMap. Are you trying to reference another item that has not been created yet?`
        );
      } else return { ...group, refs };
    }
    throw new Error(`OptionGroup: ${group.groupName} must have options or references.`);
  });

const buildItemModel = async (manufacturerId, itemInfo) => {
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
  let processedOptionGroups;
  try {
    processedOptionGroups = processOptionGroups(optionGroups, itemIdMap);
  } catch (err) {
    throw new Error(`Failed to processOption Groups. ${err.message}`);
  }
  const item = new Item({
    category,
    skuPrefix,
    type,
    name,
    description,
    madeIn,
    manufacturer: manufacturerId,
    stock,
    quantityPricing,
    basePpu,
    optionGroups: processedOptionGroups,
  });
  itemIdMap[itemInfo.ref] = item._id;
  try {
    await item.save();
    return item;
  } catch (err) {
    throw new Error(`Failed to create Item Model. ${err.message}`);
  }
};

const buildManufacturerModel = async (manufacturerInfo) => {
  const manufacturer = new Manufacturer(manufacturerInfo);
  try {
    await manufacturer.save();
    return manufacturer;
  } catch (err) {
    throw new Error(`Failed to build Manufacturer Model. ${err.message}`);
  }
};

const scriptController = {
  start: async () => {
    log.bh('Setting Up');
    const connectMsg = 'Connecting to MongoDB';
    const delMsg = 'Deleting all DB collections';
    try {
      await connectionController.connect();
      log.ss(connectMsg);
    } catch (err) {
      log.sf(connectMsg, err);
    }
    try {
      if (process.argv.indexOf('--reset') !== -1) {
        await connectionController.deleteAllCollections();
        log.ss(delMsg);
      }
    } catch (err) {
      log.sf(delMsg, err);
    }
    log.bf();
  },
  process: async () => {
    log.bh('Processing Manufacturer Data');
    for (const mfr of manufacturers) {
      const { manufacturerInfo, productGroups } = mfr;
      log.sgh(manufacturerInfo.company.name);
      const mfrModelMsg = `Building Manufacturer Model`;
      let manufacturer;
      try {
        manufacturer = await buildManufacturerModel(manufacturerInfo);
        await manufacturer.save();
        log.ss(mfrModelMsg);
      } catch (err) {
        log.sf(mfrModelMsg, err);
      }
      for (const group of productGroups) {
        for (const product of group) {
          const ItemCreateMsg = `Creating Item Model: ${product.name}`;
          try {
            await buildItemModel(manufacturer._id, product);
            log.ss(ItemCreateMsg);
          } catch (err) {
            log.sf(ItemCreateMsg, err);
          }
        }
      }
    }
    log.bf();
  },
  finish: async () => {
    log.bh('Finishing Up');
    const disconnectMsg = `Disconnecting`;
    try {
      await connectionController.disconnect();
      log.ss(disconnectMsg);
    } catch (err) {
      log.sf(disconnectMsg, err);
    }
    log.bf();
  },
  init: async () => {
    await scriptController.start();
    await scriptController.process();
    await scriptController.finish();
  },
};

scriptController.init();
