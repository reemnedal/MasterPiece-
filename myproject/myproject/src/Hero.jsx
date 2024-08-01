
import Feedback from "./Feedback";
import Footer from "./Footer";
 
import Images from "./Images";
import img from "./imgs/ff.png"
 

function Hero() {
    return ( 

  <>
  
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
        <a
          className="block w-full rounded bg-[#704e81] px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="#"
        >
          Book Now 
        </a>

    
      </div>
    </div>
  </div> <img src={img}  alt="" />

 
</section>

<Images/>
<Feedback/>
  <br />
  <Footer/>

  </>
     );
}

export default Hero;