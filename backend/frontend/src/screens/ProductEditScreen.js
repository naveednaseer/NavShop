import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom' 
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const ProductEditScreen = ({ match, history }) => {

        const productId = match.params.id
        
        const [name, setName] = useState('')
        const [price, setPrice] = useState(0)
        const [image, setImage] = useState('')
        const [imageSecond, setImageSecond] = useState('')
        const [imageThird, setImageThird] = useState('')
        const [imageFourth, setImageFourth] = useState('')
        const [imageFifth, setImageFifth] = useState('')
        const [imageSixth, setImageSixth] = useState('')
        const [imageSeventh, setImageSeventh] = useState('')
        const [brand, setBrand] = useState('')
        const [category, setCategory] = useState('')
        const [countInStock, setCountInStock] = useState(0)
        const [description, setDescription] = useState('')
        const [uploading, setUploading] = useState(false)
        
    
        const dispatch = useDispatch()
        
        const productDetails = useSelector(state => state.productDetails)
        const { error, loading, product } = productDetails
        
        const productUpdate = useSelector(state => state.productUpdate)
        const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate
        
            
        useEffect(() => {

            if(successUpdate){
                dispatch({type: PRODUCT_UPDATE_RESET})
                history.push('/admin/productlist')
            }else {
                if (!product.name || product._id !== Number(productId)) {
                    dispatch(listProductDetails(productId))
                } else{
                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setImageSecond(product.imageSecond)
                    setImageThird(product.imageThird)
                    setImageFourth(product.imageFourth)
                    setImageFifth(product.imageFifth)
                    setImageSixth(product.imageSixth)
                    setImageSeventh(product.imageSeventh)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setCountInStock(product.countInStock)
                    setDescription(product.description)
                }
            }

        }, [dispatch, product, productId, history, successUpdate])
    
        const submitHandler = (e) => {
            e.preventDefault()
            dispatch(updateProduct({
                _id: productId,
                name,
                price,
                image,
                imageSecond,
                imageThird,
                imageFourth,
                imageFifth,
                imageSixth,
                imageSeventh,
                brand,
                category,
                countInStock,
                description,
            }))
        }

        const uploadFileHandler = async (e) => {
            const file = e.target.files[0]
            const formData = new FormData()

            formData.append('image', file)
            formData.append('product_id', productId)

            setUploading(true)

            try{
                const config = {
                    headers:{
                        'content-type': 'multipart/form-data'
                    }
                }

                const {data} = await axios.post('/api/products/upload/', formData, config)

                setImage(data)
                setUploading(false)


            }catch(error){
                setUploading(false)
            }
        }

        const uploadFileHandlerSecond = async (e) => {
            const file = e.target.files[0]
            const formData = new FormData()

            formData.append('imagesecond', file)
            formData.append('product_id', productId)

            setUploading(true)

            try{
                const config = {
                    headers:{
                        'content-type': 'multipart/form-data'
                    }
                }

                const {data} = await axios.post('/api/products/uploadsecond/', formData, config)

                setImageSecond(data)
                setUploading(false)


            }catch(error){
                setUploading(false)
            }
        }

        const uploadFileHandlerThird = async (e) => {
            const file = e.target.files[0]
            const formData = new FormData()

            formData.append('imagethird', file)
            formData.append('product_id', productId)

            setUploading(true)

            try{
                const config = {
                    headers:{
                        'content-type': 'multipart/form-data'
                    }
                }

                const {data} = await axios.post('/api/products/uploadthird/', formData, config)

                setImageThird(data)
                setUploading(false)


            }catch(error){
                setUploading(false)
            }
        }

        const uploadFileHandlerFourth = async (e) => {
            const file = e.target.files[0]
            const formData = new FormData()

            formData.append('imagefourth', file)
            formData.append('product_id', productId)

            setUploading(true)

            try{
                const config = {
                    headers:{
                        'content-type': 'multipart/form-data'
                    }
                }

                const {data} = await axios.post('/api/products/uploadfourth/', formData, config)

                setImageFourth(data)
                setUploading(false)


            }catch(error){
                setUploading(false)
            }
        }

        const uploadFileHandlerFifth = async (e) => {
            const file = e.target.files[0]
            const formData = new FormData()

            formData.append('imagefifth', file)
            formData.append('product_id', productId)

            setUploading(true)

            try{
                const config = {
                    headers:{
                        'content-type': 'multipart/form-data'
                    }
                }

                const {data} = await axios.post('/api/products/uploadfifth/', formData, config)

                setImageFifth(data)
                setUploading(false)


            }catch(error){
                setUploading(false)
            }
        }

        const uploadFileHandlerSixth = async (e) => {
            const file = e.target.files[0]
            const formData = new FormData()

            formData.append('imagesixth', file)
            formData.append('product_id', productId)

            setUploading(true)

            try{
                const config = {
                    headers:{
                        'content-type': 'multipart/form-data'
                    }
                }

                const {data} = await axios.post('/api/products/uploadsixth/', formData, config)

                setImageSixth(data)
                setUploading(false)


            }catch(error){
                setUploading(false)
            }
        }

        const uploadFileHandlerSeventh = async (e) => {
            const file = e.target.files[0]
            const formData = new FormData()

            formData.append('imageseventh', file)
            formData.append('product_id', productId)

            setUploading(true)

            try{
                const config = {
                    headers:{
                        'content-type': 'multipart/form-data'
                    }
                }

                const {data} = await axios.post('/api/products/uploadseventh/', formData, config)

                setImageSeventh(data)
                setUploading(false)


            }catch(error){
                setUploading(false)
            }
        }




    return (
        <div>
            <Link to='/admin/productlist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>EDIT PRODUCT</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='secondary'>{errorUpdate}</Message>}

                {loading ? <Loader/> : error ? <Message variant='secondary'>{error}</Message> 
                : (
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId='image'>
                            <Form.Label>Image (This image will be the  display picture of the product) </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Set Image'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>

                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            >

                            </Form.File>
                            {uploading && <Loader />}

                        </Form.Group>


                        <Form.Group controlId='imagesecond'>
                            <Form.Label>Second Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Set Second Image (optional)'
                                value={imageSecond}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>

                            <Form.File
                                id='imagesecond-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandlerSecond}
                            >

                            </Form.File>
                            {uploading && <Loader />}

                        </Form.Group>


                        <Form.Group controlId='imagethird'>
                            <Form.Label>Third Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Set Third Image (optional)'
                                value={imageThird}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>

                            <Form.File
                                id='imagethird-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandlerThird}
                            >

                            </Form.File>
                            {uploading && <Loader />}

                        </Form.Group>


                        <Form.Group controlId='imagefourth'>
                            <Form.Label>Fourth Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Set Fourth Image (optional)'
                                value={imageFourth}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>

                            <Form.File
                                id='imagefourth-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandlerFourth}
                            >

                            </Form.File>
                            {uploading && <Loader />}

                        </Form.Group>


                        <Form.Group controlId='imagefifth'>
                            <Form.Label>Fifth Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Set Fifth Image (optional)'
                                value={imageFifth}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>

                            <Form.File
                                id='imagefifth-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandlerFifth}
                            >

                            </Form.File>
                            {uploading && <Loader />}

                        </Form.Group>


                        <Form.Group controlId='imagesixth'>
                            <Form.Label>Sixth Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Set Sixth Image (optional)'
                                value={imageSixth}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>

                            <Form.File
                                id='imagesixth-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandlerSixth}
                            >

                            </Form.File>
                            {uploading && <Loader />}

                        </Form.Group>


                        <Form.Group controlId='imageseventh'>
                            <Form.Label>Seventh Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Set Seventh Image (optional)'
                                value={imageSeventh}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>

                            <Form.File
                                id='imageseventh-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandlerSeventh}
                            >

                            </Form.File>
                            {uploading && <Loader />}

                        </Form.Group>


                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId='countinstock'>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Total Stock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <textarea
                                className='w-100 rounded'
                                rows='4'
                                type='text'
                                placeholder='Enter Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </textarea>
                        </Form.Group>



                        <Button type='submit' variant='primary'>
                            Update
                        </Button>


                </Form>
                )}

            </FormContainer>
        </div>
    )
}

export default ProductEditScreen

