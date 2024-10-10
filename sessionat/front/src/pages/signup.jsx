import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../Thunks/signupThunk';
import { updateField, clearFields } from '../slices/signupSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const userData = {
      full_name: user.full_name,
      email: user.email,
      password: user.password,
      city: user.city,
      phone_number: user.phone_number,
    };
    
    try {
      await dispatch(fetchData(userData)).unwrap();
      navigate('/');
      dispatch(clearFields());
      setNotification('Signup successful!');
    } catch (error) {
      console.error('Signup failed:', error);
      setNotification('Signup failed. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#704e81] to-[#cfbac3] min-h-screen flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-screen-lg mx-auto bg-white shadow-2xl rounded-xl overflow-hidden lg:flex">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-8 text-center text-[#704e81]">Create an Account</h2>
          {notification && (
            <p className={`text-center mb-4 ${notification.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
              {notification}
            </p>
          )}
          <form onSubmit={handleSignup} className="w-full flex flex-col gap-6">
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#704e81] focus:border-[#704e81] transition-all duration-300 ease-in-out"
                type="text"
                placeholder="Enter your full name"
                name="full_name"
                value={user.full_name}
                onChange={handleInputChange}
                required
              />
              <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-[#704e81]">
                Full Name
              </label>
            </div>
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#704e81] focus:border-[#704e81] transition-all duration-300 ease-in-out"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                required
              />
              <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-[#704e81]">
                Email
              </label>
            </div>
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#704e81] focus:border-[#704e81] transition-all duration-300 ease-in-out"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                required
              />
              <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-[#704e81]">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#704e81] focus:border-[#704e81] transition-all duration-300 ease-in-out"
                type="text"
                placeholder="Enter your city"
                name="city"
                value={user.city}
                onChange={handleInputChange}
                required
              />
              <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-[#704e81]">
                City
              </label>
            </div>
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#704e81] focus:border-[#704e81] transition-all duration-300 ease-in-out"
                type="tel"
                placeholder="Enter your phone number"
                name="phone_number"
                value={user.phone_number}
                onChange={handleInputChange}
                required
              />
              <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-[#704e81]">
                Phone Number
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 tracking-wide font-semibold bg-[#704e81] text-white w-full py-4 rounded-lg hover:bg-[#cfbac3] hover:text-[#704e81] transition-all duration-300 ease-in-out shadow-md transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-8 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a href="/Login" className="text-[#704e81] font-semibold hover:text-[#cfbac3] transition-all duration-300 ease-in-out">
              Log In
            </a>
          </p>
        </div>
        {/* Right Side - Photography Theme */}
        <div className="w-full lg:w-1/2 bg-[#cfbac3] p-12 flex flex-col justify-center items-center">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-[#704e81] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-3xl font-bold mb-2 text-[#704e81]">Photographer's Portal</h3>
            <p className="text-lg text-[#704e81] mb-6">Join our community today!</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#704e81] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-[#704e81] font-semibold">Showcase Your Work</p>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#704e81] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-[#704e81] font-semibold">Connect with Clients</p>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#704e81] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[#704e81] font-semibold">Manage Bookings</p>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#704e81] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-[#704e81] font-semibold">Secure Platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;