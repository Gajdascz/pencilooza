import express from 'express';
import applicationController from '../controllers/application/applicationController.js';

const router = express.Router();
router.get('/', applicationController.getList);
router.post('/', applicationController.findApplication);
router.get('/:id', applicationController.getDetail);
router.get('/create/:type', applicationController.getCreate);
router.post('/create/:type', applicationController.postCreate);
router.get('/confirmation/:id', applicationController.getConfirmation);

router.get('/update/:id', applicationController.getUpdate);
router.post('/update/:id', applicationController.postUpdate);

router.get('/delete/:id', applicationController.getDelete);

router.post('/validate', applicationController.getValidate);

export default router;
