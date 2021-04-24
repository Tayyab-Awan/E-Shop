import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetails, payOrder } from '../actions/orderAction';
import { ORDER_PAY_RESET } from '../constants/orderCostants';
import Message from '../components/Message';
import Loader from '../components/Loader';

const OrderScreen = ({ match, history }) => {
    const [sdkReady, setSdkReady] = useState(false);
    const orderId = match.params.id;
    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const orderPay = useSelector(state => state.orderPay);
    const { userInfo } = useSelector(state => state.userLogin);
    const { loading, order, error } = orderDetails;
    const { loading: loadingPay, success: successPay } = orderPay;

    useEffect(() => {
        if (userInfo) {
            const addPaypalScript = async () => {
                const { data: clientId } = await axios.get('/api/config/paypal');
                const script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
                script.async = true
                script.onload = () => {
                    setSdkReady(true)
                }
                document.body.appendChild(script)
            }

            if (!order || successPay || order._id !== orderId) {
                dispatch({ type: ORDER_PAY_RESET });
                dispatch(getOrderDetails(orderId));
            }
            else if (!order.isPaid) {
                if (!window.paypal) {
                    addPaypalScript();
                }
                else {
                    setSdkReady(true);
                }
            }
        }
        else {
            history.push(`/login?redirect=/order/${orderId}`)
        }
    }, [dispatch, orderId, order, successPay, history, userInfo])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    }

    return loading ?
        <Loader /> : error
            ? <Message variant='danger' children={error} />
            : <>
                <h1>Order {order._id}</h1>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p><strong>Name: {order.user.name}</strong></p>
                                <p><strong>Email</strong>{' '}
                                    <a href={`mailto: ${order.user.email}`}>{
                                        order.user.email}
                                    </a>
                                </p>
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}
                                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>
                                {order.isDelivered
                                    ? <Message variant='success' children={`Delivered on ${order.deliveredAt}`} />
                                    : <Message variant='danger' children='Not Delivered' />
                                }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                                {order.isPaid
                                    ? <Message variant='success' children={`Paid on ${order.paidAt}`} />
                                    : <Message variant='danger' children='Not Paid' />
                                }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {
                                    order.items.legnth === 0
                                        ? <Message children='Order is empty' />
                                        : (
                                            <ListGroup variant='flush'>
                                                {order.items.map((item, index) => (
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
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}

                        </ListGroup>
                    </Col>
                </Row>
            </>
}

export default OrderScreen
