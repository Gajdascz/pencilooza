import express from 'express';
import manufacturerController from '../controllers/manufacturer/manufacturerController.js';

const router = express.Router();

router.get('/', manufacturerController.getList);
router.get('/:id', manufacturerController.getDetail);
router.get('/delete/:id', manufacturerController.getDelete);
router.get('/update/:id', manufacturerController.getUpdate);
router.post('/update/:id', manufacturerController.postUpdate);

export default router;
