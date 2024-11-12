import Swal from 'sweetalert2';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataPho } from '../Thunks/signupPho'; // Corrected import
import { updateField, clearFields } from '../slices/phoSignup';

const RegisterPho = () => {
  const dispatch = useDispatch();
  const photographer = useSelector((state) => state.photographer); // Assume you have a separate slice for photographer data
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const photographerData = {
      full_name: photographer.full_name,
      email: photographer.email,
      password: photographer.password,
      city: photographer.city,
      phone_number: photographer.phone_number,
      portfolio_link: photographer.portfolio_link,
      years_of_experience: photographer.years_of_experience,
      camera_and_equipment: photographer.camera_and_equipment,
      description: photographer.description,
    };
    
    try {
      await dispatch(fetchDataPho(photographerData)).unwrap();
     
    // Show SweetAlert notification
    await Swal.fire({
      title: 'Success!',
      text: 'Admin will review your request.',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    navigate('/');
    dispatch(clearFields());
    } catch (error) {
      // console.error('Signup failed:', error);
      // setNotification(error);

     

      setNotification("Signup faild or email already exist!");
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#704e81] to-[#cfbac3] min-h-screen   items-center justify-center py-12 px-6">
      <div className="w-full max-w-screen-lg mx-auto bg-white shadow-2xl rounded-xl overflow-hidden  ">
        {/* Left Side - Form */}
        <div className="w-full lg: p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-8 text-center text-[#704e81]">Photographer Signup</h2>
          {notification && (
            <p className={`text-center mb-4 ${notification.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
              {notification}
            </p>
          )}
          <form onSubmit={handleSignup} className="w-full flex flex-col gap-6">
            <div className="flex flex-row gap-4"> {/* Flex row for horizontal layout */}
              <div className="relative flex-1">
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#704e81] focus:border-[#704e81] transition-all duration-300 ease-in-out"
                  type="text"
                  placeholder="Enter your full name"
                  name="full_name"
                  value={photographer.full_name}
                  onChange={handleInputChange}
                  required
                />
                <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-[#704e81]">
                  Full Name
                </label>
              </div>
              <div className="relative flex-1">
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#704e81] focus:border-[#704e81] transition-all duration-300 ease-in-out"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={photographer.email}
                  onChange={handleInputChange}
                  required
                />
                <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-[#704e81]">
                  Email
                </label>
              </div>
            </div>
            <div className="flex flex-row gap-4"> {/* Flex row for horizontal layout */}
              <div className="relative flex-1">
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#704e81] focus:border-[#704e81] transition-all duration-300 ease-in-out"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={photographer.password}
                  onChange={handleInputChange}
                  required
                />
                <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-[#704e81]">
                  Password
                </label>
              </div>
              <div className="relative flex-1">
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#704e81] focus:border-[#704e81] transition-all duration-300 ease-in-out"
                  type="text"
                  placeholder="Enter your city"
                  name="city"
                  value={photographer.city}
                  onChange={handleInputChange}
                  required
                />
                <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-[#704e81]">
                  City
                </label>
              </div>
            </div>
            <div className="flex flex-row gap-4"> {/* Flex row for horizontal layout */}
              <div className="relative flex-1">
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#704e81] focus:border-[#704e81] transition-all duration-300 ease-in-out"
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phone_number"
                  value={photographer.phone_number}
                  onChange={handleInputChange}
                  required
                />
                <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-[#704e81]">
                  Phone Number
                </label>
              </div>
              {/* New Fields for Photographers */}
              <div className="relative flex-1">
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#704e81] focus:border-[#704e81] transition-all duration-300 ease-in-out"
                  type="text"
                  placeholder="Portfolio Link"
                  name="portfolio_link"
                  value={photographer.portfolio_link}
                  onChange={handleInputChange}
                  required
                />
                <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-[#704e81]">
                  Portfolio Link
                </label>
              </div>
            </div>
            <div className="flex flex-row gap-4"> {/* Flex row for horizontal layout */}
              <div className="relative flex-1">
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#704e81] focus:border-[#704e81] transition-all duration-300 ease-in-out"
                  type="number"
                  placeholder="Years of Experience"
                  name="years_of_experience"
                  value={photographer.years_of_experience}
                  onChange={handleInputChange}
                  required
                />
                <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-[#704e81]">
                  Years of Experience
                </label>
              </div>
              <div className="relative flex-1">
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#704e81] focus:border-[#704e81] transition-all duration-300 ease-in-out"
                  placeholder="Camera and Equipment"
                  name="camera_and_equipment"
                  value={photographer.camera_and_equipment}
                  onChange={handleInputChange}
                  required
                />
                <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-[#704e81]">
                  Camera and Equipment
                </label>
              </div>
            </div>
            <div className="relative">
              <textarea
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#704e81] focus:border-[#704e81] transition-all duration-300 ease-in-out"
                placeholder="Short Description"
                name="description"
                value={photographer.description}
                onChange={handleInputChange}
                required
              />
              <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-[#704e81]">
                Short Description
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 tracking-wide font-semibold bg-[#704e81] text-white w-full py-4 rounded-lg hover:bg-[#cfbac3] transition-all duration-300 ease-in-out"
            >
              Signup
            </button>
          </form>
        </div>
        {/* Right Side - Image or Additional Content */}
        <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url()' }} />
      </div>
    </div>
  );
};

export default RegisterPho;
