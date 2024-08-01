
import { Link } from "react-router-dom";
import Photographer from './Photographer'
import Users from './Users'
import Messages from './Messages'
import {Route,Routes,BrowserRouter } from "react-router-dom";
function Nav() {
    return (

        <>
        
        <div className="flex h-screen bg-gray-100">
      <div className="hidden md:flex flex-col w-64 bg-gray-800">
        <div className="flex items-center justify-center h-16 bg-red-700">
            <span className="text-white font-bold uppercase">ADMIN DASHBOARD </span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-red-700">
                <Link to="/" className="flex items-center px-4 py-2 text-gray-100 hover:bg-red-600">
                    Photographers
                </Link>
                <Link to="/Users" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-red-600">
                    Users
                </Link>
                <Link to="/Messages" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-red-600">
                   Messages
                </Link>
            </nav>
        </div>
    </div>

     <div className="flex flex-col flex-1 overflow-y-auto">
 
        <div className="p-4">
        <Routes> 



<Route path='/' element={<Photographer/>}/>
 <Route path='/Users' element={<Users/>}/>
        <Route path='/Messages' element={<Messages/>}/>



</Routes>  
    
        </div>
    </div>
    
</div>
        
        </>
      );
}

export default Nav;