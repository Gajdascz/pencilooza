import express from 'express';
import manufacturerController from '../controllers/manufacturer/manufacturerController.js';

const router = express.Router();

router.get('/', manufacturerController.list);
router.get('/:id', manufacturerController.detail);

router.get('/create', manufacturerController.getCreate);
router.post('/create', manufacturerController.postCreate);

router.get('/:id/delete', manufacturerController.getDelete);
router.get('/:id/update', manufacturerController.getUpdate);
router.post('/:id/update', manufacturerController.postUpdate);

export default router;
