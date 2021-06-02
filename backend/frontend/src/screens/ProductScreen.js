import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, Carousel } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_RESET, PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


const ProductScreen = ({ match, history }) => {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading:loadingproductReview, error:errorproductReview, success: successproductReview } = productReviewCreate
 

    useEffect(() => {

        if(successproductReview){
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match, successproductReview])


    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id,{
            rating,
            comment
            }
        ))
    }

    
    return (
        <div>
            <Link to='/' className='btn btn-primary my-3'>Go Back</Link>
            {loading ? <Loader />
                : error ? <Message variant='alert alert-danger'> {error} </Message>
                : (
                    <div>
                        <Row>
                            <Col md={6}>
                            {product.image && product.imageSecond || product.imageThird || product.imageFourth || product.imageFifth || product.imageSixth || product.imageSeventh ? 
                                <Carousel>

                                    {product.image ?  
                                        <Carousel.Item>
                                            <img
                                            className="d-block w-100"
                                            src={product.image}
                                            style={{width:'540px', height:'480px'}}
                                            />
                                        </Carousel.Item> : 

                                        <Carousel.Item>
                                            <img
                                            className="d-block w-100"
                                            src={product.image}
                                            style={{width:'540px', height:'480px'}}
                                            />
                                        </Carousel.Item>
                                    }

                                    {product.imageSecond ?  
                                        <Carousel.Item>
                                            <img
                                            className="d-block w-100"
                                            src={product.imageSecond}
                                            style={{width:'540px', height:'480px'}}
                                            />
                                        </Carousel.Item> :
                                        
                                        null
                                        
                                    }

                                    {product.imageThird ?  
                                        <Carousel.Item>
                                            <img
                                            className="d-block w-100"
                                            src={product.imageThird}
                                            style={{width:'540px', height:'480px'}}
                                            />
                                        </Carousel.Item> : 

                                        null
                                    }

                                    {product.imageFourth ?  
                                        <Carousel.Item>
                                            <img
                                            className="d-block w-100"
                                            src={product.imageFourth}
                                            style={{width:'540px', height:'480px'}}
                                            />
                                        </Carousel.Item> : 

                                        null
                                    }

                                    {product.imageFifth ?  
                                        <Carousel.Item>
                                            <img
                                            className="d-block w-100"
                                            src={product.imageFifth}
                                            style={{width:'540px', height:'480px'}}
                                            />
                                        </Carousel.Item> : 

                                        null
                                    }

                                    {product.imageSixth ?  
                                        <Carousel.Item>
                                            <img
                                            className="d-block w-100"
                                            src={product.imageSixth}
                                            style={{width:'540px', height:'480px'}}
                                            />
                                        </Carousel.Item> : 

                                        null
                                    }

                                    {product.imageSeventh ?  
                                        <Carousel.Item>
                                            <img
                                            className="d-block w-100"
                                            src={product.imageSeventh}
                                            style={{width:'540px', height:'480px'}}
                                            />
                                        </Carousel.Item> : 

                                        null 
                                    }
                                </Carousel> :
                                <Image src={product.image} alt={product.name} fluid style={{width:'540px', height:'480px'}}/>
                                }

                            </Col>

                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color='#f8e825' />
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Description: {product.description}
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
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>


                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Quantity</Col>
                                                    <Col xs='auto' className='my-1'>
                                                        <Form.Control
                                                            as='select'
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }

                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}


                                        <ListGroup.Item>
                                            <Button
                                            onClick={addToCartHandler}
                                            className="btn-block" 
                                            disabled={product.countInStock <= 0} 
                                            type="button">
                                                {product.countInStock > 0 ? 'Add To Cart' : 'Out Of Stock'}
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6} className='my-5'>
                                <h4 className='mb-3'>Reviews <i className = 'fas fa-sm fa-comment-dots ml-1' /> </h4>
                                {product.reviews.length === 0 && <Message variant='light'><h6>This Product Has No Reviews</h6></Message>}

                                <ListGroup variant='flush'>

                                <ListGroup.Item>
                                        <h4>Write a review</h4>

                                        {loadingproductReview && <Loader />}
                                        {successproductReview && <Message variant='success'>Review Submitted</Message>}
                                        {errorproductReview && <Message variant='secondary'>{errorproductReview}</Message>}

                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control
                                                        as='select'
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                    >
                                                        <option value=''>Select...</option>
                                                        <option value='1'>Poor</option>
                                                        <option value='2'>Decent</option>
                                                        <option value='3'>Good</option>
                                                        <option value='4'>Very Good</option>
                                                        <option value='5'>Excellent</option>
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control
                                                        as='textarea'
                                                        rows='4'
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    >
                                                    </Form.Control>
                                                </Form.Group>

                                                <Button
                                                    disabled={loadingproductReview}
                                                    type='submit'
                                                    variant='primary'
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                        ) : (
                                            <div>
                                                <p className="my-1">Please <Link to='/login'>login</Link> to write a review</p>
                                            </div>
                                        )}
                                    </ListGroup.Item>

                                    {product.reviews.map((review) => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} color='#f8e825'/>
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}

                                    
                                </ListGroup>
                            </Col>
                        </Row>

                    </div>
                )
            }
        </div>
    )
}

export default ProductScreen
