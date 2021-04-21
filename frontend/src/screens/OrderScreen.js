import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetails } from '../actions/orderAction'
import Message from '../components/Message';
import Loader from '../components/Loader';

const OrderScreen = ({ match }) => {
    const orderId = match.params.id;
    const dispatch = useDispatch();
    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;

    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId])

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
                                <p>
                                    {order.isDelivered
                                        ? <Message variant='success' children={`Delivered on ${order.deliveredAt}`} />
                                        : <Message variant='danger' children='Not Delivered' />
                                    }
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                                <p>
                                    {order.isPaid
                                        ? <Message variant='success' children={`Paid on ${order.paidAt}`} />
                                        : <Message variant='danger' children='Not Paid' />
                                    }
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {
                                    order.items.legnth === 0
                                        ? <Message children='Order is empty' />
                                        : (
                                            <ListGroup variant='flush'>
                                                {order.items.map(item => (
                                                    <ListGroup.Item key={Math.floor(Math.random * 100)}>
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
                            <ListGroup.Item>

                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </>
}

export default OrderScreen
