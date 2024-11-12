import React, { useState } from 'react';
import { Camera, User, Calendar, Heart, Image, ChevronRight } from 'lucide-react';
import MainData from './mainData';
import MainData2 from './mainData2';
import Sessions from './session';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Same user data as before
  const user = {
    name: "Emma Rodriguez",
    email: "emma.r@example.com",
    phone: "+1 (555) 123-4567",
    location: "Los Angeles, CA",
    profileImage: null,
    upcomingSessions: [
      {
        id: 1,
        photographer: "John Smith",
        date: "2024-11-15",
        time: "14:00",
        type: "Family Portrait",
        location: "Venice Beach",
        status: "Confirmed"
      },
      {
        id: 2,
        photographer: "Maria Garcia",
        date: "2024-12-01",
        time: "10:00",
        type: "Wedding Photos",
        location: "Rose Garden",
        status: "Pending"
      }
    ],
    pastSessions: [
      {
        id: 3,
        photographer: "Alex Wong",
        date: "2024-09-20",
        type: "Engagement Photos",
        photos: 45,
        status: "Completed"
      }
    ],
    favoritePhotographers: [
      {
        id: 1,
        name: "John Smith",
        specialty: "Family Portraits",
        rating: 4.9,
        bookings: 3
      },
      {
        id: 2,
        name: "Maria Garcia",
        specialty: "Wedding Photography",
        rating: 4.8,
        bookings: 1
      }
    ],
    recentPhotos: [
      { id: 1, session: "Engagement Photos", date: "2024-09-20" },
      { id: 2, session: "Engagement Photos", date: "2024-09-20" },
      { id: 3, session: "Engagement Photos", date: "2024-09-20" }
    ]
  };

  const TabButton = ({ tab, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center w-full p-4 gap-3 transition-all ${
        activeTab === tab
          ? 'bg-[#704e81] text-white rounded-lg'
          : 'text-gray-600 hover:bg-purple-50 rounded-lg'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
      {activeTab === tab && <ChevronRight className="ml-auto" size={20} />}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 m-32">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
          
  

         {/* <MainData/> */}
          </div>
        </div>

        {/* Main Content with Vertical Tabs */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Vertical Tabs Navigation */}
          <div className="md:w-64 space-y-2">
            <TabButton tab="profile" label="Profile" icon={User} />
            <TabButton tab="sessions" label="Sessions" icon={Calendar} />
            <TabButton tab="favorites" label="Favorites" icon={Heart} />
            <TabButton tab="gallery" label="Gallery" icon={Image} />
          </div>

          {/* Tab Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
             <MainData2/>
              )}

              {/* Sessions Tab */}
              {activeTab === 'sessions' && (
               <Sessions/>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-2xl font-semibold text-[#704e81] mb-6">Favorite Photographers</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {user.favoritePhotographers.map(photographer => (
                      <div key={photographer.id} className="bg-white border rounded-xl p-6 hover:shadow-lg transition">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-medium">{photographer.name}</h3>
                            <p className="text-gray-600 mt-1">{photographer.specialty}</p>
                            <div className="mt-3 flex items-center gap-4">
                              <span className="flex items-center text-yellow-500">
                                ★ {photographer.rating}
                              </span>
                              <span className="text-gray-600">{photographer.bookings} bookings</span>
                            </div>
                          </div>
                          <button className="text-[#704e81]">
                            <Heart size={24} />
                          </button>
                        </div>
                        <button className="mt-4 w-full bg-[#704e81] text-white py-3 rounded-lg hover:bg-[#5d3d6d] transition">
                          Book Session
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Tab */}
              {activeTab === 'gallery' && (
                <div>
                  <h2 className="text-2xl font-semibold text-[#704e81] mb-6">My Photos</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {user.recentPhotos.map(photo => (
                      <div key={photo.id} className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                        <div className="w-full h-full flex items-center justify-center bg-purple-50 text-[#704e81] group hover:bg-[#704e81] hover:text-white transition">
                          <span className="font-medium">Photo {photo.id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;