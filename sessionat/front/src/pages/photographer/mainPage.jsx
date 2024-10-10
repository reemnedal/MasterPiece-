import React, { useState } from 'react';
import { Camera, User, Calendar, DollarSign, Mail } from 'lucide-react';
import PhoProfile from './phoProfile';
import SessionManagement from './Session Management';
import RightSection from './rightSectionNameImage';

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

const TabButton = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full p-2 rounded-md transition-all ${
      isActive ? 'bg-purple-500 text-white' : 'text-purple-700 hover:bg-purple-100'
    }`}
  >
    {icon}
    <span className="ml-2 text-sm font-medium">{label}</span>
  </button>
);

const Main = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Camera size={16} /> },
    { id: 'sessions', label: 'Sessions', icon: <Calendar size={16} /> },
    { id: 'pricing', label: 'Pricing', icon: <DollarSign size={16} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={16} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <PhoProfile/>
        );
      case 'portfolio':
        return <div>Portfolio content goes here</div>;
      case 'sessions':
        return ( 
           
       <SessionManagement/>

        );
      case 'pricing':
        return <div>Pricing content goes here</div>;
      case 'contact':
        return (
          <div>
            <h3 className="text-2xl font-bold text-[#704e81] mb-4">Contact Information</h3>
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
    <div className="min-h-screen mt-24">
      {/* Placeholder for main website navbar */}
      <nav className="bg-[#704e81] text-white p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">SESSIONAT</h1>
          {/* Add your main navigation items here */}
        </div>
      </nav>

      {/* Profile Component */}
      <div className="min-h-screen h-screen flex">
        <div className="bg-white rounded-lg overflow-hidden w-full">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-1/4 bg-purple-50 p-6">
              
<RightSection/>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    icon={tab.icon}
                    label={tab.label}
                    isActive={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  />
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4 p-6 min-h-screen h-screen flex w-full">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;