import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pho/profilePortfolio', {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.photographer_images) {
        setImages(data.photographer_images);
      }
    } catch (err) {
      setError('Error fetching images');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start">
          <svg
            className="w-5 h-5 text-red-500 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="ml-3 text-red-700">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div
            key={image.image_id || index}
            className="relative aspect-square group overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1"
          >
            <img
              src={`http://localhost:5000${image.img_url}`}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
