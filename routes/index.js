import express from 'express';
import indexController from '../controllers/indexController.js';
const router = express.Router();

/* GET home page. */
router.get('/', indexController.get);
export default router;
