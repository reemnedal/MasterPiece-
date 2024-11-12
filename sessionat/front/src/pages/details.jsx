import Nav from "../Components/Nav";
import Portfolio from "./porfolio";
import { Link, useParams } from "react-router-dom";
import useFetch from "../Hooks/get"; // Adjust the path to your hook
import AvailableSessions from "./available_sessions";
import Footer from "../Components/Footer";

function Details() {
  const { phoId } = useParams(); // Get the photographer ID from the URL
  const { data, loading, error } = useFetch(`http://localhost:5000/api/photographer/${phoId}`); // Fetch the photographer's details by ID

//   if (loading) return <p className="text-center text-xl">Loading...</p>; // Loading state
//   if (error) return <p className="text-center text-red-500">Error: {error.message}</p>; // Error state

  return (
    <>
       <>
        <br />
        <br />
        <br />
        <div className="mr-5 ml-32 mt-12 bg-white rounded-xl shadow-md overflow-hidden md:max-w-7xl">
          <div className="md:flex">
            <div className="md:shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-56"
                src={data?.profile_pic || "default-image.jpg"} // Use the fetched profile pic or a default image
                alt={`Profile of ${data?.full_name}`}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-purple-700 font-semibold">
                {data?.session_type || "Indoor sessions"} {/* Example dynamic session type */}
              </div>
              <p className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                {data?.full_name || "Alaa AbuFares"} {/* Photographer's name */}
              </p>
              <p className="mt-2 text-slate-500">
                {data?.description || "Lorem ipsum dolor, sit amet consectetur adipisicing elit."} {/* Photographer's description */}
                <br />
                {data?.rating || "4.9"} ⭐⭐⭐⭐⭐
              </p>
              <br />
              <button className="bg-[#704e81] p-4 text-white">
                <Link to="/booking">Go to Booking Page</Link>
              </button>
            </div>
          </div>
        </div>
      </>
    
      <Portfolio />     
        <AvailableSessions/>

        <Footer/>
    </>
  );
}

export default Details;
