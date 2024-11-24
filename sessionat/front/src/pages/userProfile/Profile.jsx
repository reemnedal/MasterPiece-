import React, { useState, useEffect } from 'react';
import { Camera, User, Calendar, Heart, Image, ChevronRight } from 'lucide-react';
import MainData from './mainData';
import MainData2 from './mainData2';
import Sessions from './session';
import Userfavorites from './favorites';
import Gallery from './gallery';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User, component: MainData2 },
  { id: 'sessions', label: 'Sessions', icon: Calendar, component: Sessions },
  { id: 'favorites', label: 'Favorites', icon: Heart, component: Userfavorites },
  { id: 'gallery', label: 'Gallery', icon: Image, component: Gallery },
];

const TabButton = ({ tab, label, icon: Icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center w-full p-4 gap-3 
      transition-all duration-200 ease-in-out
      rounded-lg font-medium
      ${isActive 
        ? 'bg-[#704e81] text-white shadow-lg transform scale-105' 
        : 'text-gray-600 hover:bg-[#704e81] hover:text-white'
      }
    `}
  >
    <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
    <span>{label}</span>
    {isActive && (
      <ChevronRight 
        className="ml-auto transform transition-transform duration-200" 
        size={20} 
      />
    )}
  </button>
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/userProfile', {
          credentials: 'include',
        });
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setError(null);
    } else {
      setError("Please select a valid image file");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('profile_pic', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/api/pho/uploadProfilePic', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      const data = await response.json();
      
      if (response.ok) {
        setUserData(prev => ({ ...prev, profile_pic: data.profile_pic }));
        setSelectedFile(null);
        setError(null);
      } else {
        throw new Error(data.message || "Failed to upload photo");
      }
    } catch (err) {
      setError("Error uploading photo");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-32 bg-gradient-to-b from-white via-purple-50 to-purple-100">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              {/* Responsive Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-[#704e81] flex items-center justify-center overflow-hidden">
                {userData.profile_pic ? (
                  <img 
                    src={`http://localhost:5000${userData.profile_pic}`}
                    alt="User Profile" 
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Camera size={32} className="text-purple-500" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <div className="bg-[#704e81] p-2 rounded-full text-white hover:bg-[#704e81] transition-colors">
                  <Camera size={16} />
                </div>
              </label>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{userData.full_name}</h1>
              <p className="text-gray-500">{userData.city}</p>
              {selectedFile && (
                <div className="mt-2">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="bg-[#704e81] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#5a3d68] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Uploading...' : 'Upload New Photo'}
                  </button>
                </div>
              )}
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="md:w-64 space-y-2 bg-white p-4 rounded-xl shadow-lg self-start">
            {TABS.map(({ id, label, icon }) => (
              <TabButton
                key={id}
                tab={id}
                label={label}
                icon={icon}
                isActive={activeTab === id}
                onClick={() => setActiveTab(id)}
              />
            ))}
          </nav>

          {/* Content Area */}
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-lg p-6 min-h-[500px]">
              {TABS.map(({ id, component: Component }) => (
                activeTab === id && <Component key={id} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;