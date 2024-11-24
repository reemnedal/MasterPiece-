import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Swal from 'sweetalert2';

 

  function Payment() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { state } = location;
  const { sessionId, photographerId } = state || {};
  const [sessionDetails, setSessionDetails] = useState(null);
  const [photographerDetails, setPhotographerDetails] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/session_details/${sessionId}`);
        setSessionDetails(response.data);
      } catch (error) {
        console.error('Error fetching session details:', error);
      }
    };



    const fetchPhotographerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/photographer/${photographerId}`);
        setPhotographerDetails(response.data);
      } catch (error) {
        console.error('Error fetching photographer details:', error);
      }
    };

    if (sessionId) fetchSessionDetails();
    if (photographerId) fetchPhotographerDetails();
  }, [sessionId, photographerId]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Change to desired format
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentStatus('processing');

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setPaymentStatus('error');
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/process_payment', {
          paymentMethodId: paymentMethod.id,
          amount: sessionDetails.price * 100, // Convert to cents
          sessionId,
          photographerId,
          return_url: '/' 
        }, { withCredentials: true });

        if (response.data.success) {
          setPaymentStatus('success');

          Swal.fire({
            title: 'Payment Successful!',
            text: 'Thank you for your payment!',
            icon: 'success',
          }).then(() => {
            navigate('/payment-success'); // Navigate to home page
          });        } else {
          setPaymentStatus('error');
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        setPaymentStatus('error');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setPaymentStatus('processing');
  //   setTimeout(() => {
  //     setPaymentStatus('success');
  //   }, 2000);
  // };

  return (
    <div className="container mx-auto my-10 px-4 max-w-6xl mt-32">
      <div className="mb-12 space-y-5 text-center">
        <h1 className="text-4xl font-bold text-[#704e81] md:text-5xl lg:text-6xl">
          Secure Payment
        </h1>
        <p className="text-lg text-[#704e81] md:text-xl lg:text-2xl">
          Complete your payment securely and book your photography session.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-[#704e81] text-white p-4">
            <h2 className="text-2xl font-semibold">Session Details</h2>
          </div>
          {sessionDetails && photographerDetails ? (
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  // src={photographerDetails.profile_pic || '/api/placeholder/100/100'} 
                src={`http://localhost:5000${photographerDetails?.profile_pic}`}
                  alt={photographerDetails.full_name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{photographerDetails.full_name}</h3>
                  <p className="text-gray-600">{photographerDetails.description}</p>
                </div>
              </div>
              <p><span className="font-semibold">Date:</span> { formatDate (sessionDetails.session_date)}</p>
               <p><span className="font-semibold">Time:</span> {sessionDetails.time_from} - {sessionDetails.time_to}</p>
              <p><span className="font-semibold">Place:</span> {sessionDetails.session_place || 'Not specified'}</p>
              <p className="text-2xl font-bold text-[#704e81]"><span className="font-semibold">Price:</span> ${sessionDetails.price}</p>
            </div>
          ) : (
            <div className="p-6">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-[#704e81] text-white p-4">
            <h2 className="text-2xl font-semibold">Payment Information</h2>
          </div>
          

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <CardElement options={{style: {base: {fontSize: '16px'}}}} />
        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-[#704e81] text-white px-4 py-3 rounded-lg shadow hover:bg-[#5d3f6a] focus:outline-none focus:ring-2 focus:ring-[#704e81] transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Pay Now
        </button>
      </form>
        </div>
      </div>

      {paymentStatus && (
        <div className={`mt-8 p-4 rounded-lg ${paymentStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          <h3 className="font-bold text-lg mb-2">
            {paymentStatus === 'success' ? 'Payment Successful!' : 'Processing Payment...'}
          </h3>
          <p>
            {paymentStatus === 'success'
              ? 'Your booking is confirmed. Thank you for choosing our service!'
              : 'Please wait while we process your payment.'}
          </p>
        </div>
      )}
    </div>
  );
}

export default Payment;