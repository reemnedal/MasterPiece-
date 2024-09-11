// import {Route,Routes,BrowserRouter } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './Nav'
import Hero from './Hero'
import Signup from './signup'
import Login from './Login'
import Profile from './Profile'
 
import {Route,Routes,BrowserRouter } from "react-router-dom";
import Booking from './Booking'
import Details from './details'
import Payment from './Payment'
 
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 
{/* <Nav/>
 <Hero/>
 <Signup/>
  <Login/>
  <Contact/>
  <Profile/> */}
 
 
 
  <BrowserRouter>
  
 <Routes> 


 
   <Route path='/' element={<Hero/>}/>
   <Route path='/signup' element={<Signup/>}/>
   <Route path='/login' element={<Login/>}/>
    <Route path='/profile' element={<Profile/>}/>  
   <Route path='/booking' element={<Booking/>}/>  
   <Route path='/details' element={<Details/>}/>  
   <Route path='/payment' element={<Payment/>}/>  
  
 
 </Routes>  
 </BrowserRouter>  
 
     </>
  )
}

export default App
