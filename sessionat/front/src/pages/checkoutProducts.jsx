import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51Pq8qdRr1S70aw7OTJtAwrka7pZ46PKd5fh71Lv7SwXg6EB0hYB7Duydyj3S2Lrr0wUcai5nqSiTpBXx4LmS6NaJ00c7gAz0nh');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

const CheckoutForm = ({ cartItems, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setError('Stripe has not been properly initialized');
      setProcessing(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/createPaymentproduct',
        {
          cartItems,
          totalAmount: parseFloat(totalAmount)
        },
        { withCredentials: true }
      );

      const clientSecret = response.data;

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (stripeError) {
        setError(`Payment failed: ${stripeError.message}`);
      } else if (paymentIntent.status === 'succeeded') {
        navigate('/payment-success');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(
        err.response?.data?.details ||
        err.message ||
        'An error occurred during payment processing'
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <CardElement options={CARD_ELEMENT_OPTIONS} className="p-4 border rounded-md" />
        </div>
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={!stripe || processing}
          className={`w-full py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200
            ${processing 
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#704e81] hover:bg-[#5a3d6a] transform hover:scale-[1.02]'
            }`}
        >
          {processing ? 'Processing...' : `Pay ${totalAmount} JD`}
        </button>
      </div>
    </form>
  );
};

const OrderSummary = ({ cartItems, totalAmount }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-8 lg:mb-0">
    <h2 className="text-2xl font-bold text-[#704e81] mb-6">Order Summary</h2>
    <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
      {cartItems.map((item) => (
        <div key={item.cart_id} className="flex items-center space-x-4 pb-4 border-b border-gray-200">
          <img src={item.image_url} alt={item.product_name} className="w-16 h-16 object-cover rounded-md" />
          <div className="flex-1">
            <h3 className="font-semibold text-[#704e81]">{item.product_name}</h3>
            <p className="text-gray-600">Quantity: {item.quantity}</p>
            <p className="text-gray-600">{(item.price * item.quantity).toFixed(2)} JD</p>
          </div>
        </div>
      ))}
    </div>
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <p className="text-gray-600">Subtotal</p>
        <p className="font-semibold">{totalAmount} JD</p>
      </div>
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <p className="text-gray-600">Shipping</p>
        <p className="font-semibold">Free</p>
      </div>
      <div className="flex justify-between items-center pt-2">
        <p className="text-lg font-bold text-[#704e81]">Total</p>
        <p className="text-2xl font-bold text-[#704e81]">{totalAmount} JD</p>
      </div>
    </div>
  </div>
);

const CheckoutProducts = () => {
  const location = useLocation();
  const { cartItems, totalAmount } = location.state;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-[#704e81] mb-8 text-center">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">
            <Elements stripe={stripePromise}>
              <CheckoutForm cartItems={cartItems} totalAmount={totalAmount} />
            </Elements>
          </div>
          <div className="order-1 lg:order-2">
            <OrderSummary cartItems={cartItems} totalAmount={totalAmount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProducts;
