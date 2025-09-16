import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './components/Pages/Landing/Landing';
import Cart from './components/Pages/Cart/Cart';
import Order from './components/Pages/Order/Order';
import Login from './components/Pages/Auth/Login';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
};

export default Routing;
