import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/checkoutSteps";

function ShippingPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    // Providing default values if shippingAddress is null or undefined
    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate("/payment");
    };

    return (
        <div>
            <CheckoutSteps step1 step2 />
            <FormContainer>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter postal code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </Form.Group>

                    <Button className="my-4" type="submit" variant="primary">
                        Continue
                    </Button>
                </Form>
            </FormContainer>
        </div>
    );
}

export default ShippingPage;
