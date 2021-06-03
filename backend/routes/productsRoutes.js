import express from 'express';
const router = express.Router();
import {
    getProducts,
    getProductById,
    addProduct,
    editProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddlerware.js';

router.route('/')
    .get(getProducts)
    .post(protect, admin, addProduct)
router.route('/:id')
    .get(getProductById)
    .put(protect, admin, editProduct);

export default router;