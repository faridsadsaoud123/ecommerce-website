import React from "react";
import { Form } from "react-router-dom";
import { Container,Row,Col } from "react-bootstrap";
function FormContainer({children}){
    return(
        <Container>
            <Row className=" justify-center">
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
} 

export default FormContainer;