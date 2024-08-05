
import Cameraman from "./Cameraman";
import Feedback from "./Feedback";
import Footer from "./Footer";
 
import { Link } from "react-router-dom";
import Images from "./Images";
import img from "./imgs/ff.png"
import Search from "./Search";
import Nav from "./Nav";
 

function Hero() {
    return ( 

  <>
  <Nav/>
   <section className=" p-2 grid grid-cols-2 gap-4 bg-gradient-to-r from-[#cfbac3] to-[#704e81]"> 
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center ">
   
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Discover top-rated 
        <strong className="font-extrabold text-[#704e81] sm:block"> Photographers in your area</strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
      Book the perfect photographer for your next session with Sessionat – where every moment is captured beautifully and professionally.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          className="block w-full rounded bg-[#704e81] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#cfbac3] focus:outline-none focus:ring active:bg-[#cfbac3] sm:w-auto"
         to="/booking"
        >
          Book Now 
        </Link>

    
      </div>
    </div>
  </div> <img src={img}  alt="" />

 
</section>

<Images/>
<Search/> 
<Feedback/>
  <br />

 
  <br />
  <Cameraman/>
  
<br />

  <Footer/>

  </>
     );
}

export default Hero;