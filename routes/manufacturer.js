import express from 'express';
import manufacturerController from '../controllers/manufacturer/manufacturerController.js';

const router = express.Router();

router.get('/', manufacturerController.getList);
router.get('/:id', manufacturerController.getDetail);

router.get('/:id/delete', manufacturerController.getDelete);
router.get('/:id/update', manufacturerController.getUpdate);

export default router;
