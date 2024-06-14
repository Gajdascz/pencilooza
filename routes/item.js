import express from 'express';
import itemController from '../controllers/itemController.js';

const router = express.Router();

// #region Item Routes
router.get('/', itemController.getList);

// router.get('/item/create', itemController.itemGetCreate);
// router.post('/item/create', itemController.itemPostCreate);

router.get('/:id', itemController.getDetail);

// router.get('/item/:id/delete', itemController.itemGetDelete);
// router.post('/item/:id/delete', itemController.itemPostDelete);

// router.get('/item/:id/update', itemController.itemGetUpdate);
// router.post('/item/:id/update', itemController.itemPostUpdate);

// #endregion

export default router;
