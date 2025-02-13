import React, {useEffect,} from 'react';
import {Link, useParams,useLocation,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import Message from '../components/message'
import {addToCart, removeFromCart} from '../actions/cartActions'

function CartPage(){
        const {id} = useParams()
        // console.log("id : ",id);
        const location = useLocation(); // Use useLocation to get the search parameters
        const navigate = useNavigate()
  // Extract 'qty' from query string
        const qty = new URLSearchParams(location.search).get('qty') || 1;
        const dispatch = useDispatch()
        const cart = useSelector(state =>state.cart)
        const {cartItems} = cart
        console.log(cart)
        useEffect(()=>{  
            if (id){
                dispatch(addToCart(id,qty))
            }
        },[dispatch,id,qty])
        const  removeFromCartHandler=(id)=>{
            dispatch(removeFromCart(id) )
        }
        const checkoutHandler = ()=>{
            // Navigate to checkout page
            // dispatch(addToCart(id,qty))
            navigate('/shipping')
        }
        return (
            <Row>
               <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0? (
                    <Message variant='info' >Cart is empty <Link to="/">Go back</Link></Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map(item=>(
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>
                                           {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price }
                                    </Col> 
                                    <Col md={3}>
                                        <Form.Control as="select" value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>
                                            {
                                            [...Array(item.countInStock).keys()].map((x)=>(
                                                
                                                <option value={x+1} key={x+1}>
                                                {x+1}
                                                </option>
                                            ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                            <Button type='button' variant='light' onClick = {()=>removeFromCartHandler(item.product)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    )}

               </Col>
            <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>SubTotal ({Number(cartItems.reduce((acc,item)=>acc+Number(item.qty),0))}) items</h2>
                                ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cartItems.length===0} onClick={checkoutHandler}>
                                    Proceed to Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
               </Col>
            </Row>
        );
}

export default CartPage;
