import React from "react";
import FormContainer from "../components/FormContainer";
import Message from "../components/message";
import Loader from "../components/loader";
import { Form,Button,Row,Col} from "react-bootstrap";
import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserDetails ,updateUserProfile} from "../actions/UserActions";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { USER_PROFILE_UPDATE_RESET } from "../constants/UserConstatnts";
function ProfilePage(){
    const  [ name,setName] = useState('')
    const  [ email, setEmail] = useState('')
    const  [ password, setPassword] = useState('')
    const  [ confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userDetails = useSelector(state=>state.userDetails)
    const {error,loading,user} = userDetails
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
    const {success} = userUpdateProfile

    useEffect(()=>{
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user || !user.name||success){
                dispatch({type:USER_PROFILE_UPDATE_RESET})
                dispatch(getUserDetails('profile'))
            }else{
                setName(userInfo.name)
                setEmail(userInfo.email)
                setPassword(userInfo.password)
                setConfirmPassword(userInfo.password)
            }
        }
    },[dispatch,userInfo,user,success])

    const submitHandler = (e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            setMessage('Passwords do not match')
            return
        }else{
            dispatch(updateUserProfile({'id':user._id,
                'name':name,
                'email':email,
                'password':password,
            }))
        }
    }
    return (

        <Row>
            <Col md={3}>
                <h2>
                    User Profile
                </h2>
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
                        Update
                    </Button>
                </Form>
                
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