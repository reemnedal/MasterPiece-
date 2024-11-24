import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Userfavorites = () => {
  const [photographers, setPhotographers] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();

  // Configure axios defaults
  axios.defaults.withCredentials = true;

  // Fetch existing favorites when component mounts
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/favorites');
        setFavorites(new Set(response.data));
      } catch (error) {
        console.error('Error fetching favorites:', error);
        if (error.response?.status !== 401) {
          alert('Error fetching favorites. Please try again.');
        }
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/userfavorites');
        const validPhotographers = response.data.map((photographer) => ({
          ...photographer,
          category: photographer.category || 'uncategorized',
        }));
        setPhotographers(validPhotographers);
      } catch (error) {
        console.error('Error fetching photographers:', error);
      }
    };

    fetchPhotographers();
  }, []);

  const handlePhotographerClick = (phoId) => {
    navigate(`/pp/${phoId}`);
  };

  const handleFavoriteClick = async (e, phoId, isFavorite) => {
    e.stopPropagation();

    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:5000/api/favorites/${phoId}`);
        setFavorites((prev) => {
          const newFavorites = new Set(prev);
          newFavorites.delete(phoId);
          return newFavorites;
        });
      } else {
        await axios.post(`http://localhost:5000/api/favorites/${phoId}`);
        setFavorites((prev) => new Set([...prev, phoId]));
      }
    } catch (error) {
      console.error('Error handling favorite:', error);
      if (error.response?.status === 401) {
        alert('Please login to add favorites');
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div >
    <div className=" p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Photographers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photographers.map((photographer) => (
            <div
              key={photographer.user_id}
              className="  rounded-md shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => handlePhotographerClick(photographer.user_id)}
            >
              <div className="relative">
                <img
                  src={`http://localhost:5000${photographer.profile_pic}`}
                  alt={photographer.full_name}
                  className="w-full h-32 object-cover"
                />
                <button
                  className="absolute top-2 right-2   p-1 rounded-full shadow hover:bg-gray-100"
                  onClick={(e) => handleFavoriteClick(e, photographer.user_id, favorites.has(photographer.user_id))}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(photographer.user_id) ? 'text-red-500 fill-current' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
              <div className="p-2">
                <h2 className="text-sm font-bold text-gray-900 truncate">
                  {photographer.full_name}
                </h2>
                <p className="text-xs text-gray-600 truncate">
                  📍 {photographer.city} • {photographer.category || 'Uncategorized'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Userfavorites;
