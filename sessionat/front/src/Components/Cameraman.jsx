import { Link } from 'react-router-dom';
import useFetch from '../Hooks/get'; // Adjust the path as necessary

function Cameraman() {
  const { data, loading, error } = useFetch('http://localhost:5000/api/photographer'); // Call the custom hook

  // if (loading) return <p className="text-center text-xl">Loading...</p>; // Loading state
  // if (error) return <p className="text-center text-red-500">Error: {error.message}</p>; // Error state

  return (
    <>
      <div className="container mx-auto my-10 px-4">
        <div className="mb-12 space-y-5 text-center">
          <h1 className="text-3xl font-semibold text-[#704e81] md:text-4xl lg:text-5xl">
            Meet Your <br /> Future Photographer
          </h1>
          <p className="text-base text-[#704e81] md:text-lg lg:text-xl">
            Discover talented photographers ready to capture your special moments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {data && data.map((pho) => (
            <div key={pho.user_id} className="bg-[#f3f4f6] h-full rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="flex justify-center p-4">
                <img 
                  src={pho.profile_pic} 
                  alt={`Display Picture of ${pho.full_name}`} 
                  className="rounded-full object-cover h-32 w-32 shadow-md"
                />
              </div>
              <div className="px-4 py-4 flex-1 flex flex-col">
                <h2 className="font-bold text-lg text-center text-[#704e81]">{pho.full_name}</h2>
                <p className="text-gray-700 text-sm text-center">{pho.city}</p>
                <p className="text-gray-600 text-base text-center mt-2 flex-1">
                  {pho.description}
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link
                    className="bg-[#704e81] text-white px-4 py-2 rounded shadow hover:bg-[#704e61]"
                    to={`/details/${pho.user_id}`} 
                  >
                    View More
                  </Link>


                
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cameraman;
