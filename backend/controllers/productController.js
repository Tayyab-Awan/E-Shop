import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 });
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

    if (!name || !category || !description || !price || !stock || !weight || !unit || !image) {
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

// @desc    Edit product
// @route   PUT /api/products
// @access  Private
const editProduct = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        res.status(400);
        throw new Error('Product Id required in url params.');
    }
    const updatedProps = req.body;

    let product = await Product.findById(req.params.id);
    if (product) {
        product.user = req.user._id,
        product.name = updatedProps.name,
        product.brand = updatedProps.brand,
        product.image = updatedProps.image,
        product.category = updatedProps.category,
        product.description = updatedProps.description,
        product.weight = updatedProps.weight,
        product.unit = updatedProps.unit,
        product.price = updatedProps.price,
        product.isActive = updatedProps.isActive,
        product.countInStock = updatedProps.stock,
        product.image = updatedProps.image

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct);
    }
    else {
        res.status(404);
        throw new Error('Product not found')
    }

})

export {
    getProducts, getProductById, addProduct, editProduct
}