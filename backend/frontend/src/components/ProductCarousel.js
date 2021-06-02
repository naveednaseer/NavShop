import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import carou1 from './carou1.jpg'
import carou2 from './carou2.jpg'
import carou3 from './carou3.jpg'
import carou4 from './carou4.jpg'
import carou5 from './carou5.png'
import carou6 from './carou6.png'
import carou7 from './carou7.jpg'


const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { error, loading, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, dispatch)

    return (
        loading ? <Loader /> : error ?
        <Message variant='secondary'>{error}</Message>
        : (
            // <Carousel pause='hover'>
            //     {products.map(product => (
            //         <Carousel.Item key={product._id}>
            //             <Link to={`/product/${product._id}`}>
            //                 <Image src={product.image} style={{height:'540px', width:'1530px'}} alt={product.name} fluid />
            //                 <Carousel.Caption className='carousel.caption'>
            //                     <h4>{product.name} (${product.price})</h4>
            //                 </Carousel.Caption>
            //             </Link>
            //         </Carousel.Item>
            //     ))}

            // </Carousel>
            

            <Carousel pause='hover' sm={12} md={6} lg={4} xl={3}>
                
                <Carousel.Item>
                    <Image src={carou1} style={{height:'624px', width:'100%'}}  fluid />
                </Carousel.Item>
                
                <Carousel.Item>
                    <Image src={carou2}  style={{height:'624px', width:'100%'}}  fluid />
                </Carousel.Item>
                
                <Carousel.Item>
                    <Image src={carou3}  style={{height:'624px', width:'100%'}}  fluid />
                </Carousel.Item>
                
                <Carousel.Item>
                    <Image src={carou4}  style={{height:'624px', width:'100%'}}  fluid />
                </Carousel.Item>
                
                <Carousel.Item>
                    <Image src={carou6}  style={{height:'624px', width:'100%'}}  fluid />
                </Carousel.Item>
                
                <Carousel.Item>
                    <Image src={carou7}  style={{height:'624px', width:'100%'}}  fluid />
                </Carousel.Item>
            </Carousel>


        )
    )
}

export default ProductCarousel
