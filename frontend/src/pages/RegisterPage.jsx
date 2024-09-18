import React from "react";
import FormContainer from "../components/FormContainer";
import Message from "../components/message";
import Loader from "../components/loader";
import { Form,Button,Row,Col} from "react-bootstrap";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { register } from "../actions/UserActions";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location= useLocation();
    const userRegister = useSelector(state=>state.userRegister)
    const {err,loading,userInfo} = userRegister
    const redirect  = new URLSearchParams(location.search).get('redirect') || '/';
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo,redirect,navigate])
    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            alert('Passwords do not match')
            return
        }
        dispatch(register(name,email,password))
    }
    return(
        <div>
            <FormContainer>
                <h1>Register</h1>
                {err&&<Message>{err}</Message>}
                {loading&&<Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name </Form.Label>
                        <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value )}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label> Email Adrress</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value )}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password </Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value )}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label> Confirm Password </Form.Label>
                        <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value )}></Form.Control>
                    </Form.Group>
                    <Button className=" my-4" type='submit' variant='primary'> 
                        Register
                    </Button>
                </Form>
                <Row className=" py-3">
                        <Col>
                            Have an account ?<Link to={redirect ?`/login?redirect=${redirect}`:'/register'}>Sign In</Link>
                        </Col>
                </Row>
            </FormContainer>
        </div>
        )
}
export default RegisterPage;