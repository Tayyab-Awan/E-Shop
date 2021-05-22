import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404);
        next(new Error('Product not found'));
    }
})

// @desc    Add product
// @route   POST /api/products
// @access  Private
const addProduct = asyncHandler(async (req, res) => {
    console.log('body: ', req.body)
    const {
        name,
        isActive,
        category,
        brand,
        description,
        price,
        stock,
        unit,
        weight,
        image
    } = req.body;

    if (!name || !category || !description || !price || !stock || !weight || !unit) {
        res.status(400);
        throw new Error('All fields are required!');
    }

    const product = new Product({
        user: req.user._id,
        name,
        brand,
        image,
        category,
        description,
        weight,
        unit,
        price,
        isActive,
        countInStock: stock,
    })
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
})

export {
    getProducts, getProductById, addProduct
}