import { useState } from 'react'
import img from './imgs/img.jpg'
import img2 from './imgs/img2.jpg'
import img3 from './imgs/img3.jpg'
import img4 from './imgs/img4.jpg'
import img5 from './imgs/img5.jpg'
function Images() {
 
  const[Hover,setHover]=useState();
  const hover=()=>{

    setHover(true);

  }

  const hoverOut=()=>{

setHover(false);


  }
  

    return ( 

        <>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-5 m-24">
      <div>
      <div class="image-container relative">
      <img class="h-full max-w-full rounded-lg  " src={img4} alt="Gallery image" onMouseOver={hover} onMouseOut={hoverOut}/>
    {Hover &&      <p className='text-overlay absolute left-0 top-0 p-4 bg-gray-100 text-purple-500 font-2xl'> Taken By Alaa</p>
 }
    </div>
      </div>
      <div>
      <div class="image-container relative">
      <img class="h-full max-w-full rounded-lg" src={img} alt="Gallery image"  onMouseOver={hover} onMouseOut={hoverOut}/>
      {Hover &&      <p className='text-overlay absolute left-0 top-0 p-4 bg-gray-100 text-purple-500 font-2xl'> Taken By Rahaf</p>
 }
    </div>
      </div>
      <div>
      <div class="image-container relative h-full">
      <img class="h-full  max-w-full rounded-lg" src="https://klinestudios.com/wp-content/uploads/2022/09/Beautiful-newborn-baby-in-basket-photography-for-northampton-and-corby.jpg"alt="Gallery image" />
      {Hover &&      <p className='text-overlay absolute left-0 top-0 p-4 bg-gray-100 text-purple-500 font-2xl'> Taken By Alaa</p>
 }
    </div>
      </div>
      <div>
      <div class="image-container relative">
      <img class="h-full max-w-full rounded-lg" src={img3}alt="Gallery image" onMouseOver={hover} onMouseOut={hoverOut} />
      {Hover &&      <p className='text-overlay absolute left-0 top-0 p-4 bg-gray-100 text-purple-500 font-2xl'> Taken By Reem</p>
 }
    </div>
      </div>
      <div>
         <div class="image-container relative">
      <img class="h-full max-w-full rounded-lg" src={img2} alt="Gallery image" onMouseOver={hover} onMouseOut={hoverOut}/>
      {Hover &&      <p className='text-overlay absolute left-0 top-0 p-4 bg-gray-100 text-purple-500 font-2xl'> Taken By Maha</p>
 }
    </div>
      </div>
      <div>
      <div class="image-container relative">
      <img 
      class="h-full max-w-full rounded-lg"  src={img5}  alt="Gallery image"  onMouseOver={hover} onMouseOut={hoverOut}/>
         {Hover &&      <p className='text-overlay absolute left-0 top-0 p-4 bg-gray-100 text-purple-500 font-2xl'> Taken By Tala</p>
 }
    </div>
      </div>
       
      </div>
        
        </>
     );
}

export default Images;