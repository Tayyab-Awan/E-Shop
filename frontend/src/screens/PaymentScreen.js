import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState('Paypal');

    useEffect(() => {
        if (!shippingAddress || Object.keys(shippingAddress).length === 0)
            history.push('/shipping');
    }, [shippingAddress, history])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Paypal or Credit Card'
                            id='Paypal'
                            name='paymentMethod'
                            value='Paypal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen