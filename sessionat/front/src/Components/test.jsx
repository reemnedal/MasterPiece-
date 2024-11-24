import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AvailableSessions from '../pages/available_sessions';

const PhotographerProfile = () => {
  const { phoId } = useParams();
  const [photographerData, setPhotographerData] = useState(null);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showImage, setShowImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const features = [
    'Professional Quality Photos',
    'Personalized Session',
    'High-Resolution Images',
    'Creative Editing',
    'Memorable Experience'
  ];

  useEffect(() => {
    const fetchPhotographerData = async () => {
      try {
        const photographerResponse = await axios.get(`http://localhost:5000/api/phoDetails/${phoId}`);
        setPhotographerData(photographerResponse.data);

        const imagesResponse = await axios.get(`http://localhost:5000/api/phoDetailsImages/${phoId}`);
        setImages(imagesResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchPhotographerData();
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowImage(null);
  };

  const handleImageClick = (image) => {
    setShowImage(image);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex items-center justify-center">
        <div className="text-[#704e81] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-32 bg-gradient-to-b from-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={`http://localhost:5000${photographerData?.profile_pic}`}
                alt="Photographer Profile"
                className="w-full h-[400px] rounded-lg shadow-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleImageClick(`http://localhost:5000${photographerData?.profile_pic}`)}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:5000${image.img_url}`}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-24 rounded-md cursor-pointer hover:opacity-75 transition-opacity object-cover"
                  onClick={() => handleImageClick(`http://localhost:5000${image.img_url}`)}
                />
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{photographerData?.full_name}</h1>
              <div className="flex items-center gap-3 text-gray-600">
                <span>📍 {photographerData?.city}</span>
                <span>•</span>
                <span>{photographerData?.years_of_experience} Years Experience</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Equipment</h2>
              <p className="text-gray-600">{photographerData?.camera_and_equipment}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">About</h2>
              <p className="text-gray-600">{photographerData?.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">
                What You'll Get:
              </h2>
              <ul className="space-y-2">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <svg
                      className="w-5 h-5 text-[#704e81] flex-shrink-0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
<br /><br /> 
            <button
              onClick={handleShowModal}
              className="w-full bg-[#704e81] hover:bg-[#5d4069] text-white py-3 px-6 rounded-md font-semibold transition-colors"
            >
              Book a Session
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImage(null)}
        >
          <img
            src={showImage}
            alt="Displayed Image"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      {/* Session Booking Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-4xl w-full bg-white p-6 rounded-lg">
            <button
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={handleCloseModal}
            >
              <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <AvailableSessions phoId={phoId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographerProfile;