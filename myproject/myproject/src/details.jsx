import Nav from "./Nav";
import img from "./imgs/img6.jpg"
import Portfolio from "./porfolio";

import { Link } from "react-router-dom";
function Details() {
    return (
        
 <>
<Nav/>
 
<div class=" mr-5 ml-32 mt-12 bg-white rounded-xl shadow-md overflow-hidden md:max-w-7xl">
    <div class="md:flex">
        <div class="md:shrink-0">
            <img class="h-48 w-full object-cover md:h-full md:w-56" src= {img}/>
        </div>
        <div class="p-8">
            <div class="uppercase tracking-wide text-sm text-purple-700 font-semibold">Indoor sessions </div>
            <p href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"> 
                Alaa AbuFares 
            </p>
            <p class="mt-2 text-slate-500"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, repellendus.lorem10
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exceptur.
                      <br />
                4.9 ⭐⭐⭐⭐⭐


            </p>
            <br />

            <button className="bg-[#704e81] p-4 text-white">
                <Link to="/booking">
                Go to Booking Page</Link></button>
        </div>
    </div>
</div>

<Portfolio/>
 </>


    );
}

export default Details;