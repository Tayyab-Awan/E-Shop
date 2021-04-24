import React, { useEffect } from 'react';
import { Row, Col, Table, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { listMyOrders } from '../actions/orderAction';
import Loader from '../components/Loader';
import Message from '../components/Message';

const MyOrders = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const orderListMine = useSelector(state => state.orderListMine);
    const { loading, error, orders } = orderListMine;

    useEffect(() => {
        if (userInfo) {
            dispatch(listMyOrders());
        }
        else {
            history.push('/login?redirect=/orders/myorders')
        }
    }, [dispatch, history, userInfo])

    return (
        <Container>
            <Row>
                <Col>
                    <h2>My Orders</h2>
                    {loading
                        ? <Loader /> : error
                            ? <Message variant='danger' children={error} />
                            : (
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>
                                                ID
                                            </th>
                                            <th>
                                                DATE
                                            </th>
                                            <th>
                                                TOTAL
                                            </th>
                                            <th>
                                                PAID
                                            </th>
                                            <th>
                                                DELIVERED
                                            </th>
                                            <th>

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.length > 0 ? (
                                            orders.map((order) => (
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>{order.createdAt.substring(0, 10)}</td>
                                                    <td>{order.totalPrice}</td>
                                                    <td>{order.isPaid
                                                        ? <i style={{ color: "greenYellow" }} className="fa fa-check"></i>
                                                        : <i style={{ color: "red" }} className="fa fa-times"></i>
                                                    }</td>
                                                    <td>{order.isDelivered
                                                        ? <i style={{ color: "greenYellow" }} className="fa fa-check"></i>
                                                        : <i style={{ color: "red" }} className="fa fa-times"></i>
                                                    }</td>
                                                    <td>
                                                        <LinkContainer to={`/order/${order._id}`}>
                                                            <Button className='btn-sm' variant='light'>Details</Button>
                                                        </LinkContainer>
                                                    </td>

                                                </tr>
                                            ))
                                        )
                                            : <tr>No orders</tr>
                                        }
                                    </tbody>
                                </Table>
                            )
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default MyOrders
