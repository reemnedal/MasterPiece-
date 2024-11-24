import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Sparkles } from 'lucide-react';

const CategoryAndCityGrid = () => {
  const navigate = useNavigate();
  const cities = ['Amman', 'Zarqa'];
  const categories = ['Kids', 'Family', 'Newborn', 'Graduation', 'Birthday'];

  const handleClick = (type, value) => {
    navigate(`/cameraman?${type}=${value.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700"></div>
        </div>

        {/* Header */}
        <div className="relative mb-16 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 inline-flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-600" />
            Capture Your Moments
          </h1>
        </div>

        {/* Cities Section */}
        <div className="mb-16 relative">
          <div className="flex items-center justify-center gap-2 mb-8">
            <MapPin className="w-6 h-6 text-[#704e81]" />
            <h2 className="text-2xl font-semibold text-gray-800">Choose Your City</h2>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {cities.map((city, index) => (
              <div
                key={city}
                onClick={() => handleClick('city', city)}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative h-40 bg-white rounded-lg shadow-lg cursor-pointer 
                             hover:shadow-2xl transition-all duration-500 
                             flex items-center justify-center overflow-hidden
                             transform hover:-translate-y-1 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="text-2xl font-bold text-gray-800 group-hover:text-[#704e81] relative z-10 transition-colors duration-300">
                    {city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="relative">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Camera className="w-6 h-6 text-[#704e81]" />
            <h2 className="text-2xl font-semibold text-gray-800">Select Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <div
                key={category}
                onClick={() => handleClick('category', category)}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative h-32 bg-white rounded-lg shadow-lg cursor-pointer 
                             hover:shadow-2xl transition-all duration-500
                             flex items-center justify-center overflow-hidden
                             transform hover:-translate-y-1 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="text-lg font-semibold text-gray-800 group-hover:text-[#704e81] relative z-10 transition-colors duration-300">
                    {category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAndCityGrid;