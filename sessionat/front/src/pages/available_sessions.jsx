import React from 'react';
import useFetch from '../Hooks/get'; 
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function AvailableSessions() {
  const { phoId } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`http://localhost:5000/api/available_sessions/${phoId}`);

  const handleBookSession = async (sessionId, sessionDate) => {
    try {
      const response = await axios.post('http://localhost:5000/api/booked_sessions', {
        photographerId: phoId,
        sessionId,
        sessionDate
      }, { withCredentials: true });

      Swal.fire({
        title: 'Session Booked!',
        text: 'Your photography session has been successfully booked.',
        icon: 'success',
        confirmButtonText: 'Great!',
        confirmButtonColor: '#704e81',
        background: '#F3E8FF',
        iconColor: '#704e81',
        customClass: {
          title: 'text-[#704e81] font-bold',
          content: 'text-[#704e81]',
        }
      });

      const sessionDetails = {
        sessionId: sessionId,
        photographerId: phoId,
      };
      navigate('/payment', { state: sessionDetails });
    } catch (error) {
      Swal.fire({
        title: 'Oops!',
        text: 'You must log in or sign up before booking a new session, or you already have a booked or pending session on this day.',
        icon: 'error',
        confirmButtonText: 'Got it',
        confirmButtonColor: '#704e81',
        background: '#ffffff',
        iconColor: '#DC2626',
        customClass: {
          title: 'text-[#704e81] font-bold',
          content: 'text-red-500',
        }
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  if (!data || data.length === 0) {
    return <p className="text-center text-lg text-gray-600 my-24">No available sessions found for this photographer.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center text-[#704e81] mb-8">
        Available Sessions for Photographer {phoId}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((session) => (
          <div
            key={session.session_id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {formatDate(session.session_date)}
              </h3>
              <p className={`text-sm font-medium ${session.status === 'pending' ? 'text-yellow-600' : session.status === 'confirmed' ? 'text-green-600' : 'text-gray-600'}`}>
                {session.status}
              </p>
            </div>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Time:</span> {session.time_from} - {session.time_to}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Place:</span> {session.session_place || 'Not specified'}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Price:</span> ${session.price}
            </p>
            <button
              onClick={() => handleBookSession(session.session_id, session.session_date)}
              className="bg-[#704e81] text-white py-2 px-4 rounded hover:bg-[#513761] transition duration-300 w-full"
            >
              Book this session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableSessions;