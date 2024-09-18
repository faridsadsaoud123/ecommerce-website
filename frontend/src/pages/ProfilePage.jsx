import React from "react";
import FormContainer from "../components/FormContainer";
import Message from "../components/message";
import Loader from "../components/loader";
import { Form,Button,Row,Col} from "react-bootstrap";
import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserDetails } from "../actions/UserActions";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function ProfilePage(){
    const  [ name,setName] = useState(' ')
    const  [ email, setEmail] = useState(' ')
    const  [ password, setPassword] = useState(' ')
    const  [ confirmPassword, setConfirmPassword] = useState(' ')
    const [message, setMessage] = useState(' ')

    const dispatch = useDispatch()

    const userDetails = useSelector(state=>state.userDetails)
    const {error,loading,user} = userDetails
    return (

        <Row>
            <Col md={3}>
                <h2>
                    User Profile
                </h2>
                {/* <ListGroup variant="flush">
                    
                </ListGroup> */}
            </Col>
            <Col md={9}>
                <h2>
                    My orders
                </h2>
            </Col>
            
        </Row>
    )

}

export default ProfilePage;