import img from './imgs/img.jpg'
import img2 from './imgs/img2.jpg'
import img3 from './imgs/img3.jpg'
import img4 from './imgs/img4.jpg'
import img5 from './imgs/img5.jpg'
function Images() {
    return ( 

        <>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-5 m-24">
      <div>
      <img class="h-full max-w-full rounded-lg" src={img4} alt="Gallery image" />
      </div>
      <div>
      <img class="h-full max-w-full rounded-lg" src={img} alt="Gallery image" />
      </div>
      <div>
      <img class="h-full  max-w-full rounded-lg" src="https://klinestudios.com/wp-content/uploads/2022/09/Beautiful-newborn-baby-in-basket-photography-for-northampton-and-corby.jpg"alt="Gallery image" />
      </div>
      <div>
      <img class="h-full max-w-full rounded-lg" src={img3}alt="Gallery image" />
      </div>
      <div>
      <img class="h-full max-w-full rounded-lg" src={img2} alt="Gallery image" />
      </div>
      <div>
      <img class="h-full max-w-full rounded-lg"  src={img5}  alt="Gallery image" />
      </div>
       
      </div>
        
        </>
     );
}

export default Images;