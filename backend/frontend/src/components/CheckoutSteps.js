import React from 'react'
import { Nav, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='justify-content-center mb-5'>
            <Nav.Item>
                {step1 ? (
                        <LinkContainer to='/login'>
                            <Nav.Link>
                                <i className="fas fa-sign-in-alt mr-1" />Login
                            </Nav.Link>
                        </LinkContainer>
                ) : (
                    <Nav.Link disabled>
                        <i className="fas fa-sign-in-alt mr-1" />Login
                    </Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                            <Nav.Link>
                                <i className="fas fa-clipboard-list mr-1" />Shipping Details
                            </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>
                        <i className="fas fa-clipboard-list mr-1" />Shipping Details
                    </Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>
                            <i className="fas fa-money-check mr-1" />Payment
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>
                        <i className="fas fa-money-check mr-1" />Payment
                    </Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>
                            <i className="fas fa-check-circle mr-1" />Place Order
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>
                        <i className="fas fa-check-circle mr-1" />Place Order
                    </Nav.Link>
                )}
            </Nav.Item>

        </Nav>
    )
}

export default CheckoutSteps
