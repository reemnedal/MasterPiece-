 

import global from 'global';
import { useState } from 'react';
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './stripe';
import './App.css';
import Nav from './Components/Nav';
import Hero from './Components/Hero';
// import Profile from './Profile';
import Login from './pages/Login';
import Signup from './pages/signup';
import Details from './pages/details';
import Payment from './Components/Payment';
import Main from './pages/photographer/mainPage';
import RegisterPho from './pages/signuppho';
import Profile from './pages/userProfile/Profile';
import Catalog from './pages/catalog';
import Products from './pages/productPage';
import Cart from './pages/cart';
import CheckoutProducts from './pages/checkoutProducts';
import PaymentSuccess from './Components/paymentSuccess';
import Courses from './pages/courses';
import VideoChat from './Components/video';
import CameraMan from './pages/Cameraman';
import ProductComponent from './Components/test';
import FAQSection from './Components/FAQ';

function App() {
  const [count, setCount] = useState(0);

  // Define a component that can access useLocation within BrowserRouter
  const Layout = () => {
    const location = useLocation(); // Access the current route

    // List of routes where you don't want to show Nav
    const noNavRoutes = ['/signup', '/Login','/signupPho','/payment-success','/checkoutProducts','/payment'];

    return (
      <>
        {/* Conditionally render Nav based on the current route */}
        {!noNavRoutes.includes(location.pathname) && <Nav />}

        {/* Wrap your Routes with Elements */}
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path='/' element={<Hero />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signupPho' element={<RegisterPho />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/details/:phoId' element={<Details />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/photographerProfile' element={<Main />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/products' element={<Products />} />
            <Route path='/Tips' element={<Courses />} />
            <Route path='/cameraman' element={<CameraMan/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/checkoutProducts' element={<CheckoutProducts/>} />
            <Route path='/payment-success' element={<PaymentSuccess/>} />
            <Route path='/videoChat' element={<VideoChat/>} />
            <Route path='/pp/:phoId' element={<ProductComponent/>} />
             {/* <Route path='/contact' element={<Contact/>} />
            <Route path='/about' element={<About/>} /> */}
          </Routes>
        </Elements>
      </>
    );
  };

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
