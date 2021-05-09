import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'


const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber)
    const [note, setNote] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country, phoneNumber, note }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping Details</h1>
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Address'
                        value={address ? address : ""}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Row>
                <Form.Group controlId='city' className="col-md-5">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter City'
                        value={city ? city : ""}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode' className="form-group col-md-4">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Postal Code'
                        value={postalCode ? postalCode : ""}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                </Row>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Country'
                        value={country ? country : ""}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='phoneNumber'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Phone Number'
                        value={phoneNumber ? phoneNumber : ""}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                                
                <Form.Group controlId='note'>
                    <Form.Label>Note</Form.Label>
                    <textarea
                        className='w-100 rounded'
                        type='text'
                        rows='4'
                        maxlength="300"
                        placeholder='Any Special Delivery Note Or Instruction (optional)'
                        value={note ? note : ""}
                        onChange={(e) => setNote(e.target.value)}
                    >
                    </textarea>
                </Form.Group>


                <Button type='submit' variant='primary'>
                    Continue
                </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
