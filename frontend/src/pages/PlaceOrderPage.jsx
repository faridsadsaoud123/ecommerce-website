import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import {  Button,Row,Col,ListGroup,Image,Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import CheckoutSteps from "../components/checkoutSteps";
import Message from '../components/message';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
function PlaceOrderPage(){
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod, cartItems } = cart;
    const navigate = useNavigate();

    const orderCreate = useSelector(state=>state.orderCreate)
    const {order,error,success} = orderCreate;

    cart.itemsPrice = cartItems.reduce((acc, item) =>acc+(item.price*item.qty),0).toFixed(2);
    cart.shippingPrice = (cart.itemsPrice>100 ? 0 : 10).toFixed(2) 
    cart.taxPrice = Number(cart.itemsPrice*0.082).toFixed(2)
    cart.totalPrice = Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)

    if(!cart.paymentMethod){
        navigate('/payment')
    }

    useEffect(()=>{
        if(success){
            navigate(`/order/${order._id}`)
        }
        dispatch({type:ORDER_CREATE_RESET})
    },[success,navigate,order])
    const placeOrder = ()=>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:shippingAddress,
            paymentMethod:paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice,
        }))
        
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping:</strong>
                                {shippingAddress.address}, {shippingAddress.city}, 
                                {'      '}
                                {shippingAddress.postalCode}
                                {'      '}
                                {shippingAddress.country}.
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payement Method</h2>
                            <p>
                                <strong>Method :  </strong>
                                {paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cartItems.length===0?<Message variant="info">Your cart is empty</Message>:
                            <ListGroup variant='flush'>
                                {cartItems.map((item,i)=>(
                                    <ListGroup.Item key={i}>
                                        <Row>
                                            <Col md={2}>
                                             <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} X ${item.price} = ${item.qty*item.price}
                                            </Col>

                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                                
                            }
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
                                            <Col>Subtotal :</Col>
                                            <Col>${cart.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping :</Col>
                                            <Col>${cart.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax :</Col>
                                            <Col>${cart.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total :</Col>
                                            <Col>${(cart.totalPrice).toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {error &&<Message variant='danger'>{error}</Message>}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button type='button' className='btn-block' onClick={placeOrder} disabled={cartItems.length===0}>Place Order</Button>
                                    </ListGroup.Item>
                                </ListGroup> 
                            </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderPage;