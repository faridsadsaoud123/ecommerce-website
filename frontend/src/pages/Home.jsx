import React ,{useState,useEffect}from 'react'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'
function Home() {
  const [products,setProducts]=useState([])
  console.log( products)
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get('/api/products/');  // Added await here
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);
  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
      {products.map(prod =>(
        <Col key={prod._id} sm={12} md={6} lg={4}>
            <Product product = {prod}/>
        </Col>
      ))}
        
      </Row>
    </div>
  )
}

export default Home
