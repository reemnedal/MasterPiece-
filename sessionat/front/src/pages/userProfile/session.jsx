import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Sessions() {
    const [pendingSessions, setPendingSessions] = useState([]);
    const [bookedSessions, setBookedSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 


  

    const handlePayNow = (session) => {
        const sessionDetails = {
            sessionId: session.session_id,
            photographerId: session.photographer_id, // Make sure this is included in your backend query
            session_date: session.session_date,
            time_from: session.time_from,
            time_to: session.time_to,
            session_place: session.session_place,
            price: session.price, // Make sure this is included in your backend query
            photographer_name: session.photographer_name,
        };
        navigate('/payment', { state: sessionDetails });
    };

 

  
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Change to desired format
      };
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setIsLoading(true);
                setError(null);
         
                 
                const response = await axios.get('http://localhost:5000/api/bookedSessions',  {
                    withCredentials: true,
                  });
                // Add null checks and default to empty arrays if data is missing
                const { pendingSessions = [], bookedSessions = [] } = response.data || {};
                
                setPendingSessions(pendingSessions);
                setBookedSessions(bookedSessions);
            } catch (error) {
                console.error('Error fetching sessions:', error);
                setError('Failed to load sessions. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSessions();
    }, []);

    if (isLoading) {
        return <div className="text-center p-4">Loading sessions...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="pending-sessions">
                <h2 className="text-xl font-bold mb-4">Pending Sessions</h2>
                {pendingSessions.length === 0 ? (
                    <p>No pending sessions found.</p>
                ) : (
                    <div className="space-y-4">
                        {pendingSessions.map(session => (
                            <div key={session.session_id} className="border p-4 rounded">
                                <div className="flex justify-between">
                                    <div>
                                    <p>Session ID: {session.session_id}</p>
              <p>Photographer: {session.photographer_name}</p>
              <p>Date:{formatDate( session.session_date)}</p>
              <p>Place: {session.session_place}</p>
              <p>Status: {session.status}</p>
              <p>Time: {session.time_from} - {session.time_to}</p>
                                    </div>
                                    <div>
                                    <button
                                            onClick={() => handlePayNow(session)} // Pass session to handler
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            Pay Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="booked-sessions">
                <h2 className="text-xl font-bold mb-4">Booked Sessions</h2>
                {bookedSessions.length === 0 ? (
                    <p>No booked sessions found.</p>
                ) : (
                    <div className="space-y-4">
                        {bookedSessions.map(session => (
                            <div key={session.session_id} className="border p-4 rounded">
                                <div className="flex justify-between">
                                    <div>
                                        <p>Session ID: {session.session_id}</p> 
              <p>Photographer: {session.photographer_name}</p>
              <p>Date:{formatDate( session.session_date)}</p>
              <p>Place: {session.session_place}</p>
              <p>Status: {session.status}</p>
              <p>Time: {session.time_from} - {session.time_to}</p>
                                        
                                    </div>
                                    <div>
                                        {/* <button className="bg-green-500 text-white px-4 py-2 rounded">
                                            View Gallery
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sessions;