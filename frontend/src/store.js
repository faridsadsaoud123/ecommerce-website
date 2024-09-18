import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Import as a named export
import { composeWithDevTools } from '@redux-devtools/extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer,userRegisterReducer,userDatailsReducer } from './reducers/UserReducers';
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer, 
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails:userDatailsReducer,// Add the cart reducer to the combined reducers
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
 ? JSON.parse(localStorage.getItem('cartItems')):[]

 const userInfoFromLocalStorage = localStorage.getItem('userInfo')
 ? JSON.parse(localStorage.getItem('userInfo')):null

const initialState = {
    cart:{cartItems:cartItemsFromLocalStorage},
    user:{userInfo:userInfoFromLocalStorage}
};

// Apply the middleware
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)) // Spread the middleware array
);

export default store;
