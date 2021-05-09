import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'


export const PaymentScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const[paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        history.push('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form className="col-md-10 offset-md-1" onSubmit={submitHandler}>
                <Form.Group>
                    <h1>
                    <Form.Label>Select Method</Form.Label>
                    </h1>

                    
                    <Col>
                    <Row className>
                        <i className='fab fa-paypal fa-lg' />
                            <Form.Check
                                className='mx-3'
                                type='radio'
                                label='PayPal or Credit Card'
                                id='PayPal'
                                name='paymentMethod'
                                defaultChecked
                                onClick={(e) => setPaymentMethod(e.target.id)}
                            >

                            </Form.Check>

                    </Row>

                    <Row className='my-4'>
                    <i className='fas fa-wallet fa-lg' />
                        <Form.Check
                            className='mx-3'
                            type='radio'
                            label='Cash on delivery'
                            id='Cash On Delivery'
                            name='paymentMethod'
                            onClick={(e) => setPaymentMethod(e.target.id)}  // or you can use   setPaymentMethod(e.target.id)
                        >

                        </Form.Check>
                    </Row>
                    
                        <Button type='submit' variant='primary' className='my-5'>
                            Continue
                        </Button>
                    </Col>
                </Form.Group>

            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
