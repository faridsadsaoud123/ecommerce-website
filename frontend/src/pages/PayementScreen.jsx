import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Form, Button,Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { savePayementMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/checkoutSteps";
function PayementScreen(){
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    const dispatch = useDispatch()
    const navigate= useNavigate()

    const [payementMethod,setPayementMethod] = useState('PayPal');

    if (!shippingAddress) {
        navigate("/shipping")
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayementMethod(payementMethod))
        navigate("/placeorder")
    };
    return (
        <div>
            <FormContainer>
                <CheckoutSteps step1 step2 step3/>
                <h1>Payment</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="paymentMethod">
                        <Form.Label>Select Payment Method</Form.Label>
                        <Col>
                            <Form.Check type='radio' label="PayPal or credit card" id="paypal" name="payementMethod" checked onChange={(e)=>setPayementMethod(e.targer.value)}>

                            </Form.Check>
                        </Col>
                    </Form.Group>
                    <Button className=' mt-4' type="submit" variant="primary">
                        Proceed to Place Order
                    </Button>
                </Form>
            </FormContainer>
            
        </div>
    );
}

export default PayementScreen;
