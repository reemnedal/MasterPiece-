import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BookedSessions = () => {
  const [bookedSessions, setBookedSessions] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookedSessions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pho/bookedSessions", {
          withCredentials: true,
        });
        setBookedSessions(response.data.bookedSessions);
      } catch (err) {
        setError("Error fetching booked sessions");
      } finally {
        setLoading(false);
      }
    };
    fetchBookedSessions();
  }, []);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      Swal.fire({
        title: "Error!",
        text: "Please select images",
        icon: "error",
        confirmButtonColor: "#704e81",
      });
      return;
    }

    setUploadLoading(true);
    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => formData.append("photos", file));

    try {
      await axios.post(
        `http://localhost:5000/api/upload/${currentSessionId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            session_id: currentSessionId,
            user_id: selectedUserId, // Pass user_id as part of the params
          },
        }
      );

      const updatedSessions = bookedSessions.map((session) =>
        session.booked_session_id === currentSessionId
          ? { ...session, status: "completed" }
          : session
      );
      setBookedSessions(updatedSessions);
      handleCloseModal();

      Swal.fire({
        title: "Success!",
        text: "Images uploaded successfully!",
        icon: "success",
        confirmButtonColor: "#704e81",
      });
    } catch (err) {
      console.error("Upload error:", err);
      Swal.fire({
        title: "Error!",
        text: "Error uploading images. Please try again.",
        icon: "error",
        confirmButtonColor: "#704e81",
      });
    } finally {
      setUploadLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowUploadModal(false);
    setSelectedFiles([]);
  };

  return (
    <div className="container ml-12 mx-auto py-8">
      <h1 className="text-2xl font-semibold text-center">Booked Sessions</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {bookedSessions.map((session) => (
          <div
            key={session.booked_session_id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="bg-[#704e81] p-4 rounded-t-lg">
              <h2 className="text-white font-semibold text-lg">
                Session #{session.session_id}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start space-x-2">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="text-gray-800">{session.email}</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-gray-600 font-medium">Phone:</span>
                <span className="text-gray-800">{session.phone}</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-gray-600 font-medium">City:</span>
                <span className="text-gray-800">{session.city}</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-gray-600 font-medium">Date:</span>
                <span className="text-gray-800">
                  {formatDate(session.session_date)}
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-gray-600 font-medium">Status:</span>
                <span
                  className={`px-3 py-1 rounded text-sm ${
                    session.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {session.status}
                </span>
              </div>
              {session.status !== "completed" && (
                <button
                  onClick={() => {
                    setCurrentSessionId(session.booked_session_id);
                    setSelectedUserId(session.user_id); // Store user_id here
                    setShowUploadModal(true);
                  }}
                  className="w-full mt-4 px-4 py-2 bg-[#704e81] text-white rounded-lg hover:bg-[#5c3f6a] transition-colors"
                >
                  Complete Session
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Upload Photos for Session #{currentSessionId}</h2>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={uploadLoading}
                className="px-4 py-2 bg-[#704e81] text-white rounded-lg hover:bg-[#5c3f6a] transition-colors"
              >
                {uploadLoading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedSessions;
