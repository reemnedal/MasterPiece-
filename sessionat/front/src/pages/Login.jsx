import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setSuccess('Login successful!');
      const role = Cookie.get('role');
      navigate(role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#704e81] to-[#cfbac3] min-h-screen flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-screen-lg mx-auto bg-white shadow-2xl rounded-xl overflow-hidden lg:flex">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-8 text-center text-[#704e81]">Welcome Back</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#704e81] focus:border-[#704e81] transition-all duration-300 ease-in-out"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-[#704e81]">
                Password
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 tracking-wide font-semibold bg-[#704e81] text-white w-full py-4 rounded-lg hover:bg-[#cfbac3] hover:text-[#704e81] transition-all duration-300 ease-in-out shadow-md transform hover:scale-105"
            >
              Log In
            </button>
          </form>
          <p className="mt-8 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#704e81] font-semibold hover:text-[#cfbac3] transition-all duration-300 ease-in-out">
              Register Now 
            </a>
<br />

            <a href="/signupPho" className="text-[#704e81] font-semibold hover:text-[#cfbac3] transition-all duration-300 ease-in-out">
              Join as  Photographer
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
            <p className="text-lg text-[#704e81] mb-6">Capture, Create, Connect</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#704e81] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-[#704e81] font-semibold">Manage Portfolio</p>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#704e81] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-[#704e81] font-semibold">Schedule Sessions</p>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#704e81] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <p className="text-[#704e81] font-semibold">Client Gallery</p>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#704e81] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <p className="text-[#704e81] font-semibold">Client Communication</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;