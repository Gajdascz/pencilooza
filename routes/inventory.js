import express from 'express';
import manufacturerController from '../controllers/manufacturerController.js';
import itemController from '../controllers/itemController.js';

const router = express.Router();

router.get('/', itemController.index);

// #region Manufacturer Routes
router.get('/manufacturers', manufacturerController.list);

router.get('/manufacturer/create', manufacturerController.getCreate);
router.post('/manufacturer/create', manufacturerController.postCreate);

router.get('/manufacturer/:id', manufacturerController.detail);

router.get('/manufacturer/:id/delete', manufacturerController.getDelete);
router.post('/manufacturer/:id/delete', manufacturerController.postDelete);

router.get('/manufacturer/:id/update', manufacturerController.getUpdate);
router.post('/manufacturer/:id/update', manufacturerController.postUpdate);
// #endregion

// #region Item Routes
router.get('/items', itemController.itemList);

router.get('/item/create', itemController.itemGetCreate);
router.post('/item/create', itemController.itemPostCreate);

router.get('/item/:id', itemController.itemDetail);

router.get('/item/:id/delete', itemController.itemGetDelete);
router.post('/item/:id/delete', itemController.itemPostDelete);

router.get('/item/:id/update', itemController.itemGetUpdate);
router.post('/item/:id/update', itemController.itemPostUpdate);

router.get('/item/create', itemController.itemGetCreate);
router.post('/item/create', itemController.itemPostCreate);
// #endregion

export default router;
