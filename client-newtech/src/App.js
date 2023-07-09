import React from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import ContactUs from "./pages/contactUs/ContactUs.js";

import HomePage from "./pages/HomePage";
import Shop from "./pages/shop/Shop";
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import CreateCategory from './pages/Admin/CreateCategory';
import AdminRoute from "./Routes/AdminRoute.js";
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateProducts from "./pages/Admin/CreateProducts.js";
import AdminProducts from "./pages/Admin/AdminProducts.js";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import Category from './pages/Category';
import FavoritePage from './pages/FavoritePage.js'
import CartPage from "./pages/CartPage.js";
import AdminOrder from "./pages/Admin/AdminOrder.js";
import UserRoute from "./Routes/UserRoute.js";
import UserDashboard from "./pages/UserAccount/UserDashboard.js";
import Orders from "./pages/UserAccount/Orders.js";
import ProductDetails from "./pages/ProductDetails.js";
import Profile from "./pages/UserAccount/Profile.js"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/category/:id' element={<Category />} />
        <Route path='/myfavorite' element={<FavoritePage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<UserRoute />}>
          <Route path='user' element={<UserDashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Orders />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-products' element={<CreateProducts />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          {/* <Route path='admin/create-users' element={<CreateUsers />} /> */}
          <Route path='admin/orders' element={<AdminOrder />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
