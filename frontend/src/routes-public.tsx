import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreateRestaurant from './pages/CreateRestaurant'
import Main from './components/Main'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreateRestaurant} path="/create-restaurant" />
            <Route component={Main} path="/restaurant" />
        </BrowserRouter>
    );
}

export default Routes;