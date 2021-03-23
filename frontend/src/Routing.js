import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductDetail from './screens/ProductDetail';

const Routing = () => {
    return (
        <Router>
            <Header />
            <Route exact path="/" component={HomeScreen} />
            <Route path='/product/:id' component={ProductDetail} />
            <Footer />
        </Router>
    )
}

export default Routing
