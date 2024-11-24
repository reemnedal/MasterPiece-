import React, { useState } from 'react';
import { Camera, User, Calendar, DollarSign, Mail } from 'lucide-react';
import PhoProfile from './phoProfile';
import SessionManagement from './Session Management';
import RightSection from './rightSectionNameImage';
import ProfilePortfolio from './portfolio';
import BookedSessions from './bookedSessions';

const photographerData = {
  name: "Jeremy Rose",
  role: "Product Manager",
  rating: 8.6,
  image: "https://i.pinimg.com/564x/c2/11/b9/c211b9c2c8322ccd4da025281f6c7617.jpg",
  contact: {
    phone: "+1 123 456 7890",
    address: "123 Example Street, New York, NY 10001",
    email: "hello@jeremyrose.com",
    site: "www.jeremyrose.com"
  },
  bio: "Passionate product manager with a keen eye for design and user experience. Bridging the gap between creativity and functionality.",
  skills: ["UX/UI", "Web Design", "Packaging", "Print & Editorial"],
  experience: [
    { company: "Spotify New York", role: "Senior Product Manager", period: "Jan 2018 - Present" },
    { company: "Metropolitan Museum", role: "Product Designer", period: "Nov 2015 - Apr 2018" }
  ]
};

const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center justify-center px-6 py-3 text-sm font-medium
      transition-all duration-200 border-b-2
      hover:text-purple-700 hover:border-purple-300
      ${isActive 
        ? 'text-purple-700 border-purple-700 bg-purple-50' 
        : 'text-gray-600 border-transparent'
      }
    `}
  >
    <Icon size={16} className="mr-2" />
    {label}
  </button>
);

const Main = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'sessions', label: 'Sessions', icon: Calendar },
    { id: 'portfolio', label: 'Portfolio', icon: Camera },
    { id: 'Booked Sessions', label: 'Booked Sessions', icon:  Calendar },
    // { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <PhoProfile />;
      case 'sessions':
        return <SessionManagement />;
      case 'portfolio':
        return (
          <ProfilePortfolio/>
        );
      case 'Booked Sessions':
        return (
       <BookedSessions/>
        );
      case 'contact':
        return (
          <div className="p-6" >
            <h2 className=" text-2xl font-bold text-[#704e81] mb-4">Contact Information</h2>
            <div className="space-y-3">
              <p><strong>Phone:</strong> {photographerData.contact.phone}</p>
              <p><strong>Email:</strong> {photographerData.contact.email}</p>
              <p><strong>Website:</strong> {photographerData.contact.site}</p>
              <p><strong>Address:</strong> {photographerData.contact.address}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b  from-white to-purple-50 mt-32">
      {/* Navbar */}
     

      {/* Main Content */}
      <div className="max-w-7xl mx-auto pt-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Profile Section */}
          <div className="md:col-span-1 bg-white rounded-lg shadow-sm p-6">
            <RightSection />
          </div>

          {/* Tabs Section */}
          <div className="md:col-span-3 bg-white rounded-lg shadow-sm">
            {/* Tab Navigation */}
            <div className="border-b">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    icon={tab.icon}
                    label={tab.label}
                    isActive={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  />
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[500px]">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;