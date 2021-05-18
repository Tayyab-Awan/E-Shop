import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductDetail from './screens/ProductDetail';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import MyOrders from './screens/MyOrders';
import UserListScreen from './screens/UserListScreen';

const Routing = () => {
    return (
        <Router>
            <Header />
            <Route path='/product/:id' component={ProductDetail} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/orders/myorders" component={MyOrders} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/admin/users" component={UserListScreen} />
            <Footer />
        </Router>
    )
}

export default Routing
