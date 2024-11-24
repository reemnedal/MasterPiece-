import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search, Heart } from 'lucide-react';
import { useLocation } from 'react-router-dom';


const CameraMan = () => {
  const [photographers, setPhotographers] = useState([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();

  const cities = ['all', 'Amman', 'Zarqa'];
  const categories = ['all', 'kids', 'family', 'newborn', 'graduation', 'birthday'];

  // Configure axios defaults
  axios.defaults.withCredentials = true;

  const location = useLocation(); // Import useLocation from react-router-dom
const queryParams = new URLSearchParams(location.search);

useEffect(() => {
  const cityParam = queryParams.get('city');
  const categoryParam = queryParams.get('category');
  
  if (cityParam) {
    setSelectedCity(cityParam.toLowerCase());
  }
  if (categoryParam) {
    setSelectedCategory(categoryParam.toLowerCase());
  }
}, []);
  // Fetch existing favorites when component mounts
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/favorites');
        setFavorites(new Set(response.data));
      } catch (error) {
        console.error('Error fetching favorites:', error);
        // If unauthorized, we just leave favorites empty
        if (error.response?.status !== 401) {
          alert('Error fetching favorites. Please try again.');
        }
      }
    };

    fetchFavorites();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/allphotographers');
        const validPhotographers = response.data.map(photographer => ({
          ...photographer,
          category: photographer.category || 'uncategorized'
        }));
        setPhotographers(validPhotographers);
        setFilteredPhotographers(validPhotographers);
      } catch (error) {
        console.error('Error fetching photographers:', error);
      }
    };

    fetchPhotographers();
  }, []);

  useEffect(() => {
    let filtered = [...photographers];

    if (selectedCity !== 'all') {
      filtered = filtered.filter(photographer => 
        photographer.city?.toLowerCase() === selectedCity.toLowerCase()
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(photographer => {
        const photographerCategory = photographer.category?.toLowerCase() || '';
        const selectedCategoryLower = selectedCategory.toLowerCase();
        return photographerCategory === selectedCategoryLower || 
               photographerCategory.split(',').map(cat => cat.trim().toLowerCase())
                                           .includes(selectedCategoryLower);
      });
    }

    if (searchQuery) {
      filtered = filtered.filter(photographer =>
        photographer.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPhotographers(filtered);
  }, [selectedCity, selectedCategory, searchQuery, photographers]);

  const handlePhotographerClick = (phoId) => {
    navigate(`/pp/${phoId}`);
  };

  const handleFavoriteClick = async (e, phoId, isFavorite) => {
    e.stopPropagation(); // Prevent the card click event from firing
    
    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:5000/api/favorites/${phoId}`);
        setFavorites(prev => {
          const newFavorites = new Set(prev);
          newFavorites.delete(phoId);
          return newFavorites;
        });
      } else {
        await axios.post(`http://localhost:5000/api/favorites/${phoId}`);
        setFavorites(prev => new Set([...prev, phoId]));
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
    <div className="min-h-screen mt-32 bg-gradient-to-b from-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Filters Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search photographers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Location</h3>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      selectedCity === city
                        ? 'bg-[#704e81] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {city.charAt(0).toUpperCase() + city.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      selectedCategory === category
                        ? 'bg-[#704e81] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Photographers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPhotographers.map((photographer) => (
            <div
              key={photographer.user_id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => handlePhotographerClick(photographer.user_id)}
            >
              <div className="relative">
                <img
                  src={`http://localhost:5000${photographer.profile_pic}`}
                  alt={photographer.full_name}
                  className="w-full h-[300px] object-cover"
                />
                <button
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  onClick={(e) => handleFavoriteClick(e, photographer.user_id, favorites.has(photographer.user_id))}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      favorites.has(photographer.user_id) ? 'text-red-500 fill-current' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {photographer.full_name}
                </h2>
                <div className="flex items-center gap-3 text-gray-600">
                  <span>📍 {photographer.city}</span>
                  <span>•</span>
                  <span>{photographer.years_of_experience} Years Experience</span>
                  <span>•</span>
                  <span>{photographer.category || 'Uncategorized'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CameraMan;