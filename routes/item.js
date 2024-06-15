import express from 'express';
import itemController from '../controllers/itemController.js';

const router = express.Router();

// #region Item Routes
router.get('/', itemController.getList);
router.get('/:id', itemController.getDetail);
// #endregion

export default router;
