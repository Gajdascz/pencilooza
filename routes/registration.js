import express from 'express';
import registrationController from '../controllers/registrationController.js';

const router = express.Router();

router.get('/:id', registrationController.getDetail);
router.post('/:id', registrationController.findRegistration);
router.get('/create/:type', registrationController.getCreate);
router.get('/confirmation/:id', registrationController.getConfirmation);

export default router;
