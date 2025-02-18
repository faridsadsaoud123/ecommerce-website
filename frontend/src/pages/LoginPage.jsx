import React from "react";
import { useState ,useEffect,} from "react";
import { Link } from "react-router-dom";
import { Form,Button,Col,Row } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import Message from "../components/message";
import Loader from "../components/loader";
import { login } from "../actions/UserActions";
import { useParams,useNavigate,useLocation } from "react-router-dom";

import FormContainer from "../components/FormContainer";
function LoginPage(){
    const [email,setEmail]=useState(' ')
    const [password,setPassword]=useState(' ')
    const location= useLocation();
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const redirect  = new URLSearchParams(location.search).get('redirect') || '/';
    const userLogin= useSelector(state=>state.userLogin)
    const {err,loading,userInfo} = userLogin

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo,redirect,navigate])
     const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }
    return(
        <div>
            <FormContainer>
                <h1>Sign In</h1>
                {err && <Message variant='danger'>{err}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label> Email Adrress</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value )}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password </Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value )}></Form.Control>
                    </Form.Group>
                    <Button className=" my-4" type='submit' variant='primary'> 
                        Sign In
                    </Button>
                </Form>
                <Row className=" py-3">
                        <Col>
                            New Customer ?<Link to={redirect ?`/register?redirect=${redirect}`:'/register'}>Register</Link>
                        </Col>
                </Row>
            </FormContainer>
        </div>
    )
}

export default LoginPage;