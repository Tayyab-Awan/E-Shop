import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import { Row, Col, Container } from 'react-bootstrap';

const HomeScreen = () => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        }
        fetchProducts();
    }, [])

    return (
        <Container>
            <main className="my-5">
                <h1>Latest Products</h1>
                <Row>
                    {
                        products && products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))
                    }
                </Row>
            </main>
        </Container>
    )
}

export default HomeScreen
