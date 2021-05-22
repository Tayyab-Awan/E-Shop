import express from 'express';
const router = express.Router();
import { getProducts, getProductById, addProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddlerware.js';

router.route('/')
    .get(getProducts)
    .post(protect, admin, addProduct)
router.route('/:id').get(getProductById);

export default router;