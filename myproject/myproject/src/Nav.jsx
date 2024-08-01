import img from './imgs/imglogo.png'

import React, { useState } from 'react';


import { Link } from "react-router-dom";

function Nav() {
 const [isOpen, setIsOpen] = useState(false);

 return (
   <nav className="flex items-center justify-between flex-wrap p-6 bg-[#704e81]">
     <div  className='text-2xl text-white ml-24  '>
     SESSIONAT 
     </div>
     <div className="block lg:hidden">
       <button
         onClick={() => setIsOpen(!isOpen)}
         className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"     >
         <svg
           className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
           viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
         </svg>
         <svg
           className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
           viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg"
         >
          </svg>
       </button>
     </div>
     <div
       className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}
     >
       <div className="text-sm  ml-96  flex justify-end space-x-9 lg:flex-grow">
         <Link to="/" className="block mt-4 text-lg lg:inline-block lg:mt-0 text-white mr-4 hover:bg-[#cfbac3] pl-4 pr-4 rounded ">
           Home
         </Link>
         <Link to="/profile" className="block mt-4  text-lg  lg:inline-block lg:mt-0 text-white mr-4 hover:bg-[#cfbac3] pl-4 pr-4 rounded">
           Profile
         </Link>
          <Link to="/signup" className="block mt-4  text-lg  lg:inline-block lg:mt-0 text-white mr-4 hover:bg-[#cfbac3] pl-4 pr-4 rounded">
           Signup
         </Link>
         <Link to= "/login#" className="block mt-4  text-lg  lg:inline-block lg:mt-0 text-white   mr-4 hover:bg-[#cfbac3] pl-4 pr-4 rounded">
          Login 
         </Link>
       </div>
       <div>
         
       </div>
     </div>  
   </nav>
 );
}
export default Nav;