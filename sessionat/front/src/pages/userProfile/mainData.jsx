import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MainData() {
  const [UserData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/userProfile', {
          withCredentials: true
        });
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching photographer data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (  
    <>
      <div className="w-32 h-32 rounded-full bg-[#704e81] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
        {/* Display user's initials */}
        {UserData.full_name?.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-800">{UserData.full_name}</h1>
        <p className="text-gray-600 mt-1">{UserData.email}</p>
        <p className="text-gray-600">{UserData.city}</p>
        <div className="mt-4">
          {/* <button     className="bg-[#704e81] text-white px-6 py-2 rounded-lg hover:bg-[#5d3d6d] transition">
            Edit Profile
          </button> */}
        </div>
      </div>
    </>
  );
}

export default MainData;
