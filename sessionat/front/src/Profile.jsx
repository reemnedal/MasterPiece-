import img from './imgs/userr.png'
import Nav from "./Components/Nav";

import img3 from "./imgs/tt.png"
import Footer from './Components/Footer';
function Profile() {
    return (  
  <>
<Nav/>  
  <div class="p-16 ml-24 mr-24">
<div class="p-8 bg-white shadow mt-24">
  <div class="grid grid-cols-1 md:grid-cols-3">
    <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
      <div>
        <p class="font-bold text-gray-700 text-xl">🎥</p>
     
      </div>
      <div>
        </div>
          <div>
     
 
      </div>
    </div>
    <div class="relative">
      <div class="w-48 h-48 bg-[#704e81] mx-auto  rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
 
  <img src={img3} alt="" />
      </div>
    </div>

    <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
<button
  class="text-white py-2 px-4 uppercase rounded bg-[#704e81] hover:bg-[#704e70] shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
>
  Connect
</button>
    <button
  class="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
>
  Message
</button>
    </div>
  </div>

  <div className="flex items-center justify-center  mt-24 ">
        <div className="container max-w-screen-lg mx-auto">
          <div className="bg-white rounded  p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value= ""
                      onChange= ""
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value= ""
                      onChange="" 
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="phone_number">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      id="phone_number"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value= ""
                      onChange= ""
                    />
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <center>
                        <button
                          onClick=""
                          className=" bg-[#704e81] hover:bg-[#704e70]  text-white font-bold py-2 px-5 px-4 rounded mr-96"
                        >
                          Save
                        </button>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

</div>
</div>
  

  <Footer/>
  </>


    );
}

export default Profile;