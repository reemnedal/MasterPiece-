function RightSection() {
    return ( 
 

 
              <div className="text-center mb-6">
                <img 
                //   src={photographerData.image} 
                //   alt={photographerData.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-purple-200"
                />
                <h2 className="text-xl font-bold text-[#704e81]">photographerData.name</h2>
                <p className="text-purple-600">photographerData.role</p>
                {/* <div className="mt-2 inline-block bg-purple-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  Rating: {photographerData.rating}
                </div> */}
              </div>

 

     );
}

export default RightSection;