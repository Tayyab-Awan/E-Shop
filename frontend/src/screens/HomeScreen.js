import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Row, Col, Container } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <Container>
            <main className="my-5">
                <h1>Latest Products</h1>
                {
                    loading ?
                        <Loader />
                        :
                        error ?
                            <Message variant='danger' children={error} />
                            :
                            <Row>
                                {
                                    products && products.map(product => (
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                            <Product product={product} />
                                        </Col>
                                    ))
                                }
                            </Row>
                }
            </main>
        </Container>
    )
}

export default HomeScreen
