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
import Contact from './Contact'
import {Route,Routes,BrowserRouter } from "react-router-dom";

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
 <Nav/>
 <Routes> 


 
   <Route path='/' element={<Hero/>}/>
   <Route path='/signup' element={<Signup/>}/>
   <Route path='/login' element={<Login/>}/>
    <Route path='/profile' element={<Profile/>}/>
   <Route path='/contact' element={<Contact/>}/>  


 
 </Routes>  
 </BrowserRouter>

 
     </>
  )
}

export default App
