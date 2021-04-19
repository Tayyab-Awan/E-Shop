import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMehod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.legnth === 0) {
        res.status(400);
        throw new Error('No order items found')
        return;
    }

    const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMehod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder)

})

export { addOrderItems }