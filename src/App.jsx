import logo from './logo.svg';

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout/layout';
import Home from './pages/home/home';
import Products from './pages/products/products';
import ErrorPage from './pages/notFound/notfound';
import Categories from './pages/categories/categories';
import Cart from './pages/cart/cart';
import Brands from './pages/brands/brands';
import ProductDetails from './pages/productDetails/productDetails';
import { AuthContextProvider } from './context/authContext';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode'
import SignIn from './pages/signIn/signin';
import Signup from './pages/signup/signup';
import ForgetPassword from './pages/forget_password/forgetPassword';
import Wishlist from './pages/wishlist/wishlist';
import { ProductContextProvider } from './context/productContext';
import { CartContextProvider } from './context/cartContext';
import Checkout from './pages/checkout/checkout';

function App() {
  const [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/'
                element={
                  <Layout
                    userData={userData}
                    setUserData={setUserData}
                    saveUserData={saveUserData}
                  />
                } >
                <Route index element={<Home />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/products' element={<Products />} />
                <Route path='/productDetails/:pid' Component={ProductDetails} />
                <Route path='/signin' element={<SignIn saveUserData={saveUserData} />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/forgetPassword' element={<ForgetPassword />} />
                <Route path='/wishlist' element={<Wishlist />} />
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/categories' element={<Categories />} />
                <Route path='/brands' element={<Brands />} />
                <Route path='*' element={<ErrorPage error='404' />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </ProductContextProvider>

    </AuthContextProvider>
  );
}

export default App;
