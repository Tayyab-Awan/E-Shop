import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
    userLoginReducer, userRegisterReducer,
    getUserProfileReducer, updateUserProfileReducer
} from './reducers/userReducers';
import { placeOrderReducer } from './reducers/orderReducer'

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: getUserProfileReducer,
    updatedProfile: updateUserProfileReducer,
    placedOrder: placeOrderReducer
});

const placedOrderFromStorage = localStorage.getItem('order')
    ? JSON.parse(localStorage.getItem('order'))
    : {}

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : ''

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
    placedOrder: placedOrderFromStorage
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(
    applyMiddleware(...middleware)
));


export default store;