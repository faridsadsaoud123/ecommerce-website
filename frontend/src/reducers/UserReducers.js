import { USER_LOGIN_FAIL,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGOUT 
    ,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL
    ,USER_DATAILS_REQUEST,USER_DATAILS_SUCCESS,USER_DATAILS_FAIL,
    USER_PROFILE_UPDATE_FAIL,USER_PROFILE_UPDATE_REQUEST,USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_RESET,
} from "../constants/UserConstatnts";


export const userLoginReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
 };

export const userRegisterReducer = (state = { }, action) => {
switch (action.type) {
    case USER_REGISTER_REQUEST:
        return { loading: true };
    case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
    case USER_LOGOUT:
        return {};
    default:
        return state;
}
};
export const userUpdateReducer = (state={},action)=>{
    switch(action.type){
        case USER_PROFILE_UPDATE_REQUEST:
            return {...state,loading:true};
        case USER_PROFILE_UPDATE_SUCCESS:
            return {loading:false, success:true,userInfo:action.payload};
        case USER_PROFILE_UPDATE_FAIL:
            return {loading:false, error:action.payload};
            case USER_PROFILE_UPDATE_RESET:
                return {}
        default:
            return state;
    }
}
export const userDatailsReducer = (state={user:{}},action)=>{
    switch(action.type){
        case USER_DATAILS_REQUEST:
            return {...state,loading:true};
        case USER_DATAILS_SUCCESS:
            return {loading:false, user:action.payload};
        case USER_DATAILS_FAIL:
            return {loading:false, error:action.payload};
       
        default:
            return state;
    }
}