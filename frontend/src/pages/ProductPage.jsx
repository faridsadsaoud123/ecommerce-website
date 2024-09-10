import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button,Form, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams ,useNavigate} from 'react-router-dom';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/loader'
import Message from '../components/message'
function ProductPage() {
  const [qty,setQty] = useState(1)
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Use useSelector to get productDetails from the Redux store
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch,id]);
  const addToCartHandler = ()=>{
    navigate(`/cart/${id}?qty=${qty}`)
  }
  return (
    <div>
      <Link to="/" className='btn btn-light my-3'>Go back</Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
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
            <ListGroup variant='flush'>
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
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock >0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity </Col>
                    
                    <Col xs='auto' className='my-1'>
                      <Form.Control as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                        {
                          [...Array(product.countInStock).keys()].map((x)=>(
                            
                            <option value={x+1} key={x+1}>
                              {x+1}
                            </option>
                          ))
                        }
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button className='btn-block' type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductPage;
