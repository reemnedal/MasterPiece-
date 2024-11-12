import Cameraman from "../Components/Cameraman";
import Footer from "../Components/Footer";
import imga from "../imgs/imga.jpg"
import imgb from "../imgs/imgb.jpg"
import imgc from "../imgs/imgc.jpg"
import imgd from "../imgs/imgd.jpg"
import imge from "../imgs/imge.jpg"
import imgf from "../imgs/imgf.jpg"
import imgg from "../imgs/imgg.jpg"
import img from "../imgs/img.jpg"

function Portfolio() {
    return (  


<>

 
<br />
<h1 className=" ml-32 text-2xl text-[#704e81]"> Photographer Portfolio : </h1>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ml-28 mr-24">
 
  <div class="group cursor-pointer relative">
    <img
      src={imga}
      alt="Image 1"
      class="w-full  object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
    />
    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
        View
      </button>
    </div>
  </div>
 
  <div class="group cursor-pointer relative">
    <img
      src={imgb}
      alt="Image 1"
      class="w-full   object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
    />
    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
        View
      </button>
    </div>
  </div>
 
  <div class="group cursor-pointer relative">
    <img
      src={imgc}
      alt="Image 1"
      class="w-full object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
    />
    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
        View
      </button>
    </div>
  </div>
 
  <div class="group cursor-pointer relative">
    <img
      src={imgd}
      alt="Image 1"
      class="w-full   object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
    />
    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
        View
      </button>
    </div>
  </div>
 
  <div class="group cursor-pointer relative">
    <img
      src={imge}
      alt="Image 1"
      class="w-full object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
    />
    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
        View
      </button>
    </div>
  </div>
 
  <div class="group cursor-pointer relative">
    <img
      src={imgg}
      alt="Image 1"
      class="w-full   object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
    />
    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
        View
      </button>
    </div>
  </div>
 
  <div class="group cursor-pointer relative">
    <img
      src={imgf}
      alt="Image 1"
      class="w-full   object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
    />
    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
        View
      </button>
    </div>
  </div>
 
  <div class="group cursor-pointer relative">
    <img
      src={img}
      alt="Image 1"
      class="w-full  object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
    />
    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
        View
      </button>
    </div>
  </div>
 
 
 
 
 
 
 


 </div>
 <br />

 


</>
    );
}

export default Portfolio;