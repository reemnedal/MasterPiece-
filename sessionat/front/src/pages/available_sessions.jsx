import React from 'react';
import useFetch from '../Hooks/get'; // Adjust the path to your hook
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for making API requests
import Swal from 'sweetalert2';

function AvailableSessions() {
  const { phoId } = useParams(); // Get photographer ID from URL
  const navigate = useNavigate(); // Initialize navigate
  const { data, loading, error } = useFetch(`http://localhost:5000/api/available_sessions/${phoId}`); // Fetch sessions

  // Function to handle session booking
  const handleBookSession = async (sessionId, sessionDate) => {
    try {
      const response = await axios.post('http://localhost:5000/api/booked_sessions', {
        photographerId: phoId,
        sessionId,
        sessionDate
      }, { withCredentials: true });

      // Optionally handle response (like showing a success message)
      console.log(response.data);
      Swal.fire({
        title: 'Session Booked!',
        text: 'Your photography session has been successfully booked.',
        icon: 'success',
        confirmButtonText: 'Great!',
        confirmButtonColor: '#6D28D9', // Purple color to match your theme
        background: '#F3E8FF', // Light purple background
        iconColor: '#6D28D9', // Purple icon
        customClass: {
          title: 'text-purple-700 font-bold',
          content: 'text-purple-600',
        }
      });

      // Navigate to payment page with session details
      const sessionDetails = {
        sessionId: sessionId,
        photographerId: phoId,
        
        // Include other relevant session data if needed
        // For example: sessionDate: session.session_date, price: session.price
      };
      navigate('/payment', { state: sessionDetails });

    } catch (error) {
      console.error('Error booking session:', error);
      Swal.fire({
        title: 'Oops!',
        text: 'You must log in or sign up before booking a new session, or you already have a booked or pending session on this day.',
        icon: 'error',
        confirmButtonText: 'Got it',
        confirmButtonColor: '#704e81', // Purple color to match your theme
        background: '#ffffff', // Light red background for error
        iconColor: '#DC2626', // Red icon for error
        customClass: {
          title: 'text-[704e81] font-bold',
          content: 'text-red-500',
        }
      });
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Change to desired format
  };
  // Make sure data is not null before rendering
  if (!data || data.length === 0) {
    return <p className="text-center text-lg text-gray-600 my-24">No available sessions found for this photographer.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center text-purple-700 mb-8">
        Available Sessions for Photographer {phoId}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((session) => (
          <div
            key={session.session_id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Session Date: {formatDate(session.session_date)}
            </h3>
            <p className="text-gray-600">
              <span className="font-medium">Time:</span> {session.time_from} - {session.time_to}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Place:</span> {session.session_place || 'Not specified'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Price:</span> ${session.price}
            </p>
            <p className={`text-sm mt-2 font-medium ${session.status === 'pending' ? 'text-yellow-600' : session.status === 'confirmed' ? 'text-green-600' : 'text-gray-600'}`}>
              Status: {session.status}
            </p>
            <div className="mt-4">
              <button
                onClick={() => handleBookSession(session.session_id , session.session_date)} // Pass the session ID to the booking function
                className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition duration-300"

              >
                Book this session
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableSessions;
