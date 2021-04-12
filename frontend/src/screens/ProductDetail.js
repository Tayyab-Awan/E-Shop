import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, ListGroup, Card, Button, FormControl } from 'react-bootstrap';
import Rating from '../components/Rating';
import { detailProduct } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductDetail = ({ match, history }) => {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    const productDetail = useSelector(state => state.productDetail);
    const { loading, product, error } = productDetail;

    useEffect(() => {
        dispatch(detailProduct(match.params.id))
    }, [match.params.id, dispatch])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}/?qty=${qty}`);
    }

    return (
        <Container>
            <main className='my-3'>
                <Link to='/' className='btn btn-light'>Go Back</Link>
                {
                    loading ?
                        <Loader />
                        : error ?
                            <Message variant="danger" children={error} />
                            :
                            <Row className='py-5'>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h2>{product.name}</h2>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Price: {product.price}</strong>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Descreption: </strong> {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <ListGroup>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>${product.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            {
                                                product.countInStock > 0 ?
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Qty</Col>
                                                            <Col>
                                                                <FormControl
                                                                    as="select"
                                                                    value={qty}
                                                                    onChange={e => setQty(e.target.value)}
                                                                >
                                                                    {
                                                                        [...Array(product.countInStock).keys()].map(x => (
                                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                        ))
                                                                    }
                                                                </FormControl>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    :
                                                    null
                                            }
                                            <ListGroup.Item>
                                                <Button className="btn-block btn-dark" type='button'
                                                    disabled={product.countInStock === 0}
                                                    onClick={addToCartHandler}
                                                >
                                                    Add to Cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                }
            </main>
        </Container>
    )
}

export default ProductDetail
