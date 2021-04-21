import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { placeOrder } from '../actions/orderAction';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)

    // Calculate Prices
    const addDecimals = (num) => {
        return num.toFixed(2)
    }
    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    cart.shippingPrice = cart.cartItems > 100 ? 0 : 10;
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = addDecimals(
        Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
    );

    const { order, success, error } = useSelector(state => state.placedOrder)

    useEffect(() => {
        if (success)
            history.push(`/order/${order._id}`)
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(
            placeOrder({
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                orderItems: cart.cartItems,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: Number(cart.taxPrice),
                totalPrice: Number(cart.totalPrice),
            })
        )
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row className="justify-content-center">
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {
                                cart.cartItems.legnth === 0
                                    ? <Message children='Your cart is empty' />
                                    : (
                                        <ListGroup variant='flush'>
                                            {cart.cartItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={2}>
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                fluid rounded />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x {item.price} = ${item.qty
                                                                * item.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup variant='fluid'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger' children={error} />}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cart.cartItems.legnth === 0}
                                onClick={placeOrderHandler}
                            >Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
