import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap' 
import { Table, Button, Row, Col, Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'


const ProductListScreen = ({history, match}) => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct } = productCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = history.location.search

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }
        else {
            dispatch(listProducts(keyword))
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, keyword])

    const deleteHandler = (id) => {
        if(window.confirm('Are You Sure You Want To Delete This Product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () =>{
        dispatch(createProduct())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>PRODUCTS</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus-circle mr-2'></i>create Product
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='secondary'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='secondary'>{errorCreate}</Message>}

            {loading
            ? (<Loader/>)
            : error ? 
                (<Message variant='secondary'>{error}</Message>)
                : (
                    <div>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATRGORY</th>
                                    <th>BRAND</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.category ? product.category : 'NULL'}</td>
                                        <td>{product.brand ? product.brand : 'NULL'}</td>

                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='primary' className='btn-sm mx-3 my-1'>
                                                    <i className='fas fa-user-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='secondary' className='btn-sm ml-3 my-1' onClick={() => deleteHandler(product._id)}>
                                                <i className='fas fa-trash-alt'></i>
                                            </Button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <Paginate page={page} pages={pages} isAdmin={true} />

                    </div>
                )}
        </div>
    )
}

export default ProductListScreen
