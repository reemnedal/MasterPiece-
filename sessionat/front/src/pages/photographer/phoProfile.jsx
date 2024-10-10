import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaCity, FaCamera, FaEdit } from 'react-icons/fa';
import { FiSave } from 'react-icons/fi';

function PhoProfile() {
  const [photographerData, setPhotographerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchPhotographerData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pho/phoProfile', {
          withCredentials: true
        });
        setPhotographerData(response.data);
        setEditData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching photographer data");
        setLoading(false);
      }
    };

    fetchPhotographerData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:5000/api/pho/phoProfile', editData, {
        withCredentials: true
      });
      setPhotographerData(editData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  if (loading) return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-2xl mt-10">Loading...</motion.div>;
  if (error) return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-2xl mt-10 text-red-500">{error}</motion.div>;
  if (!photographerData) return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-2xl mt-10">No data available</motion.div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-8 bg-white rounded-lg relative"
    >
      <div className="absolute top-4 right-4">
        {isEditing ? (
          <button onClick={handleSave} className="flex items-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            <FiSave className="mr-2" /> Save
          </button>
        ) : (
          <button onClick={handleEditToggle} className="flex items-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            <FaEdit className="mr-2" /> Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: FaUser, label: "Full Name", key: "full_name" },
          { icon: FaEnvelope, label: "Email", key: "email" },
          { icon: FaPhone, label: "Phone Number", key: "phone_number" },
          { icon: FaCity, label: "City", key: "city" },
          { icon: FaCamera, label: "Camera and Equipment", key: "camera_and_equipment" },
          { icon: FaEdit, label: "Years of Experience", key: "years_of_experience" },
        ].map((item) => (
          <div key={item.key} className="mb-4">
            <label className="flex items-center text-lg font-semibold text-[#704e81] mb-2">
              <item.icon className="mr-2" />
              {item.label}
            </label>
            {isEditing ? (
              <input
                type="text"
                name={item.key}
                value={editData[item.key] || ''}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p className="text-gray-700">{photographerData[item.key]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="flex items-center text-lg font-semibold text-[#704e81] mb-2">
          <FaEdit className="mr-2" />
          Description
        </label>
        {isEditing ? (
          <textarea
            name="description"
            value={editData.description || ''}
            onChange={handleInputChange}
            rows="4"
            className="border p-2 rounded w-full"
          />
        ) : (
          <p className="text-gray-700">{photographerData.description}</p>
        )}
      </div>
    </motion.div>
  );
}

export default PhoProfile;