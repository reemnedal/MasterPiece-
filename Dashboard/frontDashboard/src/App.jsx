 
import './App.css' 
import Photographer from './Photographer'
import Users from './Users'
import Messages from './Messages'
import {Route,Routes,BrowserRouter } from "react-router-dom";
import Nav from './components/header';
   
function App() {
 
return (

    <>

 <BrowserRouter>
 <Nav/>
 <Routes> 


{/* THIS I SROUTE TAG  WE ADD IT IN NAV BAR SECTION  */}

{/* 
   <Route path='/' element={<Photographer/>}/>
    <Route path='/Users' element={<Users/>}/>
   <Route path='/Messages' element={<Messages/>}/> */}


 
 </Routes>  
 </BrowserRouter>

   </>
 

)
}

 
 

export default App
