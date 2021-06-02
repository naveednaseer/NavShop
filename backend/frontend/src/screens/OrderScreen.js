import React, { useState, useEffect } from 'react'
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'


const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const [SdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    if(!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }
        

    const addPayPalScript = () =>{
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AUBzQAi9H47SXwdLAxXdEZywfZMxEAz9sp6B2QkSR1q7Ia-QDNuxIDA09NGAWvqUAKfXxHcp8l1ftP6s'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {

        if(!userInfo){
            history.push('/login')
        }

        if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
            dispatch({ type:ORDER_PAY_RESET })
            dispatch({ type:ORDER_DELIVER_RESET })

            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid){
            if(!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, orderId, successPay, successDeliver])



     
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

     
    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? (
        <loading/>
    ) : error ? (
        <Message variant='secondary'>{error}</Message>
    ) : (
        <div>
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping Address</h2>

                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p><strong>Phone Number: </strong>{order.shippingAddress.phoneNumber}</p>

                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},
                                {' '}
                                {order.shippingAddress.postalCode},
                                {' '}
                                {order.shippingAddress.country}
                            </p>

                            {order.isDelivered ? (
                                <p className="text-center">
                                <Message variant='primary'>Delivered on: {order.deliveredAt.substring(0, 10)}</Message>
                                </p>
                            ) : (
                                <p className="text-center">
                                <Message variant='warning'>Order Confirmed, Your Order will Reach You Soon</Message>  
                                </p>   
                            )}

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>

                            {order.isPaid ? (
                                <p className="text-center">
                                <Message variant='primary'>Paid on: {order.paidAt.substring(0, 10)}</Message>
                                </p>
                            ) : (
                                <p className="text-center">
                                <Message variant='warning'>Pay For The Product Once The Delivery Has Been Completed {order.paidAt}</Message>  
                                </p>   
                            )}

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Ordered Items</h2>
                            {order.orderItems.length === 0 ? <Message variant='secondary'>
                                Your Order Is Empty
                            </Message> :(
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>



                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {/* <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item> */}

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>


                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}

                                    {!SdkReady ? (
                                        <Loader/>
                                    ) : (
                                        order.paymentMethod === 'PayPal' ?
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        /> : <span></span>
                                    )}
                                </ListGroup.Item>
                            )}

                        </ListGroup>

                    </Card>

                    <ListGroup.Item className='my-3'>
                            <h3>Delivery Instruction</h3>
                            <p>
                                {order.shippingAddress.note ? 
                                <strong>Instruction: </strong> : <span></span>}
                                {order.shippingAddress.note ? order.shippingAddress.note : 'No Instruction For This Order'}
                            </p>
                    </ListGroup.Item>

                    {loadingDeliver && <Loader />}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item style={{borderWidth: 'thin'}}>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliverHandler}
                                    variant = 'secondary'
                                >
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen
