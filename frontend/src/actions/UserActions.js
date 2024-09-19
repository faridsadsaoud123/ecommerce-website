import { USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_DATAILS_REQUEST,USER_DATAILS_SUCCESS,USER_DATAILS_FAIL,
    USER_PROFILE_UPDATE_FAIL,USER_PROFILE_UPDATE_REQUEST,USER_PROFILE_UPDATE_SUCCESS
} from "../constants/UserConstatnts";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({type:USER_LOGIN_REQUEST});
        const config = {
            headers:{
                'Content-Type': 'application/json',
            }
        }
        const {data} = await axios.post('/api/users/login/   ',{'username':email,'password':password},config);
        dispatch({type:USER_LOGIN_SUCCESS,payload:data});
        localStorage.setItem('userInfo',JSON.stringify(data));
    }catch(err){
        console.log(err.message);
    }
}
export const register = (name,email,password)=>async (dispatch)=>{
    try{
        dispatch({type:USER_REGISTER_REQUEST});
        const config = {
            headers:{
                'Content-Type': 'application/json',
            }
        }
        const {data} = await axios.post('/api/users/register/',{'name':name,'email':email,'password':password},config);
        dispatch({type:USER_REGISTER_SUCCESS,payload:data});
        dispatch({type:USER_LOGIN_SUCCESS,payload:data});
        localStorage.setItem('userInfo',JSON.stringify(data));
    }catch(e){
        dispatch({type:USER_LOGIN_FAIL,
            payload:e.response && e.response.data.detail ? e.response.data.detail : e.message
        })
    }
}
export const getUserDetails = (id) => async (dispatch,getState)=>{
    try{
        dispatch({type:USER_DATAILS_REQUEST});
        
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
            }
        }
        const {data} = await axios.get(`/api/users/${id}/`,config);
        dispatch({type:USER_DATAILS_SUCCESS,payload:data});
}catch(e){
        dispatch({type:USER_DATAILS_FAIL,
            payload:e.response && e.response.data.detail ? e.response.data.detail : e.message
        })
    }
}
export const updateUserProfile = (user) =>async(dispatch,getState)=>{
    try{
        dispatch({type:USER_PROFILE_UPDATE_REQUEST});
        
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
            }
        }
        const {data} = await axios.put(`/api/users/profile/update/`,user,config);
        dispatch({type:USER_PROFILE_UPDATE_SUCCESS,payload:data});

        dispatch({type : USER_LOGIN_SUCCESS,payload:data});
        localStorage.setItem('userInfo',JSON.stringify(data));
    }catch(e){
        dispatch({type:USER_PROFILE_UPDATE_FAIL,
            payload:e.response && e.response.data.detail ? e.response.data.detail : e.message
        })
    }}
export const logout =()=>async (dispatch)=>{
    localStorage.removeItem('userInfo');
    dispatch({type:USER_LOGOUT})
}