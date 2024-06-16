import express from 'express';
import registrationController from '../controllers/registration/registrationController.js';

const router = express.Router();
router.get('/', registrationController.getList);
router.post('/', registrationController.findRegistration);
router.get('/:id', registrationController.getDetail);
router.get('/create/:type', registrationController.getCreate);
router.post('/create/:type', registrationController.postCreate);
router.get('/confirmation/:id', registrationController.getConfirmation);

router.get('/update/:id', registrationController.getUpdate);
router.post('/update/:id', registrationController.postUpdate);

router.get('/delete/:id', registrationController.getDelete);

router.post('/validate', registrationController.getValidate);

export default router;
