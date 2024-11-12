import React, { useState, useEffect } from 'react';

const MainData2 = () => {
  const [user, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/userProfile', {
          credentials: 'include'
        });
        const data = await response.json();
        setUserData(data);
        setEditedData(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...user });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/userProfile', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        setUserData(editedData);
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      alert('Error updating profile');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(user);
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <div className="text-center p-3 md:p-4 text-sm md:text-base">Loading...</div>;
  if (error) return <div className="text-red-500 p-3 md:p-4 text-sm md:text-base">{error}</div>;

  return (
    <div className="w-full mx-auto p-2 sm:p-4">
      <div className="bg-white rounded-lg p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Personal Information</h2>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="w-full sm:w-auto px-4 py-2 bg-[#704e81] text-white rounded hover:bg-[#5d3d6d] transition-colors text-sm md:text-base flex items-center justify-center gap-2"
            >
              <span>Edit</span>
            </button>
          ) : (
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleSave}
                className="flex-1 sm:flex-none px-4 py-2 bg-[#704e81] text-white rounded hover:bg-[#5d3d6d] transition-colors text-sm md:text-base"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 sm:flex-none px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm md:text-base"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {[
            { label: 'Email', key: 'email' },
            { label: 'Username', key: 'full_name' },
            { label: 'Phone', key: 'phone_number' },
            { label: 'Location', key: 'city' }
          ].map((field) => (
            <div key={field.key} className="border-b border-gray-200 pb-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">
                  {field.label}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name={field.key}
                    value={editedData[field.key] || ''}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#704e81]"
                  />
                ) : (
                  <div className="text-gray-800 text-sm md:text-base">
                    {user[field.key] || 'Not provided'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainData2;