import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Import as a named export
import { composeWithDevTools } from '@redux-devtools/extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer, // Add the cart reducer to the combined reducers
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
 ? JSON.parse(localStorage.getItem('cartItems')):[]

const initialState = {
    cart:{cartItems:cartItemsFromLocalStorage}
};

// Apply the middleware
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)) // Spread the middleware array
);

export default store;
