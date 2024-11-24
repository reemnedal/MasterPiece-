import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SessionManagement() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editSession, setEditSession] = useState(null); // State to manage the session being edited
  const [newSession, setNewSession] = useState({ // State for new session
    
    time_from: '',
    time_to: '',
    session_date: '',
    session_place: '',
    price: '',
    notes: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage edit modal visibility
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State to manage add modal visibility
  const [successMessage, setSuccessMessage] = useState(null); // State to show success message

  useEffect(() => {
    fetchSessionData();
  }, []);

  const fetchSessionData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pho/fetchSessionDetailsByAuth', {
        withCredentials: true,
      });
      setSessions(Array.isArray(response.data) ? response.data : [response.data]);
      setLoading(false);
    } catch (err) {
      setError("Error fetching session data: " + err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (sessionId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/pho/deleteSession/${sessionId}`, {
        // withCredentials: true
      });
      console.log('Session deleted:', response.data);
      setSuccessMessage('Session deleted successfully');
      fetchSessionData(); // Refresh session list after deleting
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  const handleEdit = (session) => {
    setEditSession(session);
    setIsEditModalOpen(true); // Open the modal for editing
  };

  const handleAddSession = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('http://localhost:5000/api/pho/addSession', newSession, {
        withCredentials: true,
      });
      console.log('New session added:', response.data);
      setSuccessMessage('Session added successfully');
      setIsAddModalOpen(false); // Close the modal after adding
      fetchSessionData(); // Refresh the session list
      setNewSession({ // Reset new session state
      
        time_from: '',
        time_to: '',
        session_date: '',
        session_place: '',
        price: '',
        notes: '',
      });


 
    } catch (error) {
      console.error('Error adding session:', error);
    }
  };

  const handleUpdateSession = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/pho/updateSession/${editSession.session_id}`, editSession, {
        withCredentials: true,
      });
      console.log('Session updated:', response.data);
      setSuccessMessage('Session updated successfully');
      setIsEditModalOpen(false); // Close the modal after updating
      fetchSessionData(); // Refresh the session list
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editSession) {
      setEditSession({ ...editSession, [name]: value });
    } else {
      setNewSession({ ...newSession, [name]: value });
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Change to desired format
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Session Management</h2>
        <button
          onClick={() => setIsAddModalOpen(true)} // Open add session modal
          className="bg-[#704e81] hover:bg-[#704e81] text-white font-bold py-2 px-4 rounded"
        >
          Add Session
        </button>
      </div>

      {/* Success Message */}
      {successMessage && <div className="text-center text-green-500 p-4">{successMessage}</div>}

      {sessions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((session) => (
            <div key={session.session_id} className="border rounded-lg overflow-hidden shadow-lg">
              <div className="bg-[#704e81] px-4 py-2 flex justify-between items-center">
                <h3 className="font-semibold">Session {session.session_id}</h3>
                <div>
                  <button
                    onClick={() => handleEdit(session)}
                    className="bg-[#704e81]  text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(session.session_id)}
                    className="   text-black  text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p><strong>Date:</strong>{formatDate(session.session_date)}</p>
                <p><strong>Time:</strong> {session.time_from} - {session.time_to}</p>
                <p><strong>Location:</strong> {session.session_place}</p>
                <p><strong>Status:</strong> {session.status}</p>
                <p><strong>Price:</strong> ${session.price}</p>
                <p><strong>Notes:</strong> {session.notes}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-4">No sessions found.</div>
      )}

      {/* Modal for editing session */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Session</h3>
            <form onSubmit={handleUpdateSession}>
              {/* Add input fields for editing session here */}
              {/* Date, Time From, Time To, Location, Price, Notes */}
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  name="session_date"
                  value={editSession.session_date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Time From</label>
                <input
                  type="time"
                  name="time_from"
                  value={editSession.time_from}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Time To</label>
                <input
                  type="time"
                  name="time_to"
                  value={editSession.time_to}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  name="session_place"
                  value={editSession.session_place}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editSession.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={editSession.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for adding a new session */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Session</h3>
            <form onSubmit={handleAddSession}>
              {/* Add input fields for new session here */}
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  name="session_date"
                  value={newSession.session_date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Time From</label>
                <input
                  type="time"
                  name="time_from"
                  value={newSession.time_from}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Time To</label>
                <input
                  type="time"
                  name="time_to"
                  value={newSession.time_to}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  name="session_place"
                  value={newSession.session_place}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newSession.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={newSession.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-[#704e81] hover:  text-white font-bold py-2 px-4 rounded"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SessionManagement;
