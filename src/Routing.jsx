import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './components/Pages/Landing/Landing';
import Cart from './components/Pages/Cart/CartPage';
import OrderPage from './components/Pages/Order/OrderPage';
import CategoryPage from './components/Pages/CategoryPage/CategoryPage';
import ProductDetail from './components/Pages/ProductDetailPage/ProductDetail';
import PaymentPage from "./components/Pages/PaymentPage/PaymentPage";
import Auth from "./components/Pages/Auth/Auth";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/category/:categoryName' element={<CategoryPage />}/>
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/signin' element={<Auth />} />
        <Route path='/auth' element={<Auth />} />

        {/* Protected Order Page */}
        <Route
          path="/order"
          element={
            <ProtectedRoute msg="Please login to view your orders">
              <OrderPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default Routing;
