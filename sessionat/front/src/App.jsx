// import { useState } from 'react';
// import { Route, Routes, BrowserRouter } from 'react-router-dom';
// import { Elements } from '@stripe/react-stripe-js'; // Import Elements
// import { stripePromise } from './stripe'; // Import your stripePromise
// import './App.css';
// import Nav from './Components/Nav';
// import Hero from './Components/Hero';
// import Profile from './Profile';
// import Login from './pages/Login';
// import Signup from './pages/signup';
// import Details from './pages/details';
// import Payment from './Components/Payment';

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <BrowserRouter>
//         {/* Wrap your Routes with Elements */}
//         <Elements stripe={stripePromise}>
//           <Routes>
//             <Route path='/' element={<Hero />} />
//             <Route path='/signup' element={<Signup />} />
//             <Route path='/login' element={<Login />} />
//             <Route path='/profile' element={<Profile />} />
//             <Route path='/details/:phoId' element={<Details />} />
//             <Route path='/payment' element={<Payment />} />
//           </Routes>
//         </Elements>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;



import { useState } from 'react';
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './stripe';
import './App.css';
import Nav from './Components/Nav';
import Hero from './Components/Hero';
import Profile from './Profile';
import Login from './pages/Login';
import Signup from './pages/signup';
import Details from './pages/details';
import Payment from './Components/Payment';
import Main from './pages/photographer/mainPage';

function App() {
  const [count, setCount] = useState(0);

  // Define a component that can access useLocation within BrowserRouter
  const Layout = () => {
    const location = useLocation(); // Access the current route

    // List of routes where you don't want to show Nav
    const noNavRoutes = ['/signup', '/Login'];

    return (
      <>
        {/* Conditionally render Nav based on the current route */}
        {!noNavRoutes.includes(location.pathname) && <Nav />}

        {/* Wrap your Routes with Elements */}
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path='/' element={<Hero />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/details/:phoId' element={<Details />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/photographerProfile' element={<Main />} />
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
