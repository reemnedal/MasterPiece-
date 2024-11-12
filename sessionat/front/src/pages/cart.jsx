import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/productInCart', { withCredentials: true });
        setCartItems(response.data.cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleIncrease = (itemId) => {
    setCartItems(cartItems.map(item => 
      item.cart_id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrease = (itemId) => {
    setCartItems(cartItems.map(item => 
      item.cart_id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleRemove = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/removeProduct/${itemId}`, { withCredentials: true });
      setCartItems(cartItems.filter(item => item.cart_id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Ensure all required fields are present
    const checkoutData = cartItems.map(item => ({
      cart_id: item.cart_id,
      product_id: item.product_id, // Make sure this is included in your cart items
      product_name: item.product_name,
      price: item.price,
      quantity: item.quantity,
      image_url: item.image_url
    }));
  
    console.log('Checkout Data:', checkoutData); // For debugging
  
    navigate('/checkoutProducts', { 
      state: { 
        cartItems: checkoutData,
        totalAmount: calculateTotal()
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#704e81]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-24 bg-gradient-to-b from-white to-purple-50 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <FaShoppingCart className="text-gray-400 text-5xl mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Your cart is empty.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.cart_id} className="bg-white rounded-lg shadow-lg p-6 transform transition duration-200 hover:scale-[1.02] hover:shadow-xl">
                    <div className="flex flex-col sm:flex-row items-center">
                      <div className="w-full sm:w-32 h-32 mb-4 sm:mb-0">
                        <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div className="flex-grow px-4">
                        <h2 className="text-xl font-semibold text-[#704e81]">{item.product_name}</h2>
                        <p className="text-gray-600 mt-2">Price: {item.price} JD</p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-4">
                            <button className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-[#704e81] hover:bg-[#704e81] hover:text-white transition duration-200" onClick={() => handleDecrease(item.cart_id)}>
                              <FaMinus size={12} />
                            </button>
                            <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                            <button className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-[#704e81] hover:bg-[#704e81] hover:text-white transition duration-200" onClick={() => handleIncrease(item.cart_id)}>
                              <FaPlus size={12} />
                            </button>
                          </div>
                          <p className="text-[#704e81] font-semibold">
                            Total: {(item.price * item.quantity).toFixed(2)} JD
                          </p>
                        </div>
                      </div>
                      <button className="mt-4 sm:mt-0 p-2 text-red-500 hover:text-red-700 transition duration-200" onClick={() => handleRemove(item.cart_id)}>
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#704e81] mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-semibold">{calculateTotal()} JD</p>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-semibold">Free</p>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <p className="text-lg font-bold text-[#704e81]">Total</p>
                  <p className="text-2xl font-bold text-[#704e81]">{calculateTotal()} JD</p>
                </div>
              </div>
              <button onClick={handleCheckout} className="w-full mt-8 bg-[#704e81] text-white py-4 rounded-lg font-semibold hover:bg-[#5a3d6a] transition duration-200 transform hover:scale-[1.02]">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
