import React ,{useState,useEffect}from 'react'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/loader'
import Message from '../components/message'
function Home() {
  const dispatch = useDispatch()
  const productList = useSelector(state =>state.productList)
  const {error,loading,products} = productList
  useEffect(() => {
    dispatch(listProducts())
  }, []);

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? <Loader /> 
      :error ?<Message variant="danger">{error}</Message>
      :
        <Row>
        {products.map(prod =>(
          <Col key={prod._id} sm={12} md={6} lg={4}>
              <Product product = {prod}/>
          </Col>
        ))}
          
      </Row>}
    </div>
  )
}

export default Home
