import express from 'express';
const router = express.Router();
import { addOrderItems } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddlerware.js'

router.route('/').post(protect, addOrderItems)

export default router;