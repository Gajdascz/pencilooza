import express from 'express';
import mfrController from '../controllers/mfrController.js';
import itemController from '../controllers/itemController.js';

const router = express.Router();

router.get('/', itemController.index);

// #region Manufacturer Routes
router.get('/manufacturers', mfrController.mfrList);

router.get('/manufacturer/:id', mfrController.mfrDetail);

router.get('/manufacturer/create', mfrController.mfrGetCreate);
router.post('/manufacturer/create', mfrController.mfrPostCreate);

router.get('/manufacturer/:id/delete', mfrController.mfrGetDelete);
router.post('/manufacturer/:id/delete', mfrController.mfrPostDelete);

router.get('/manufacturer/:id/update', mfrController.mfrGetUpdate);
router.post('/manufacturer/:id/update', mfrController.mfrPostUpdate);

router.get('/manufacturer/create', mfrController.mfrGetCreate);
router.post('/manufacturer/create', mfrController.mfrPostCreate);
// #endregion

// #region Item Routes
router.get('/items', itemController.itemList);

router.get('/item/:id', itemController.itemDetail);

router.get('/item/create', itemController.itemGetCreate);
router.post('/item/create', itemController.itemPostCreate);

router.get('/item/:id/delete', itemController.itemGetDelete);
router.post('/item/:id/delete', itemController.itemPostDelete);

router.get('/item/:id/update', itemController.itemGetUpdate);
router.post('/item/:id/update', itemController.itemPostUpdate);

router.get('/item/create', itemController.itemGetCreate);
router.post('/item/create', itemController.itemPostCreate);
// #endregion

export default router;
