import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-white to-[#F6F2FD]">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
        <div className="bg-[#704e81] rounded-full p-2 inline-block mb-6">
          <CheckCircle className="text-white h-12 w-12" />
        </div>
        <h1 className="text-2xl font-semibold text-[#704e81] mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for choosing our service! Your transaction was completed successfully.
          A confirmation email with your details has been sent to your inbox.
        </p>
        <button
          onClick={goToHome}
          className="bg-[#704e81] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#584069] transition duration-300 ease-in-out"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;