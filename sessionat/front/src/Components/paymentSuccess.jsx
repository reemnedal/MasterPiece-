import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/'); // This navigates to the home page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-white to-purple-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-[#704e81] mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <h1 className="text-2xl font-semibold text-[#704e81] mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6"> 
 Thank you for choosing our service! Your transaction was completed successfully.
  A confirmation email with your order details has been sent to your inbox.

        </p>
        <button
          onClick={goToHome}
          className="bg-[#704e81] text-white font-semibold py-2 px-6 rounded-md  transition duration-300 ease-in-out"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
