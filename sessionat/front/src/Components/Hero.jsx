import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";
import Nav from "./Nav";
import Images from "../Images";
import Search from "./Search";
import Feedback from "./Feedback";
import Cameraman from "./Cameraman";
import Footer from "./Footer";
import SubscriptionPlans from "./subscription";
import Cookies from 'js-cookie'; // Add this line at the top
import FAQSection from "./FAQ";
import CategoryAndCityGrid from "./categoryInHomePage";


const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
 
  useEffect(() => {
    const role = Cookies.get('role'); // Replace 'role' with the actual cookie name
    setUserRole(role);
  }, []); 

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isVideoLoaded) {
        console.warn('Video failed to load within 5 seconds');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isVideoLoaded]);

  return (
    <div className="min-h-screen flex flex-col">
  
      <main className="flex-grow">
        <section className="relative h-screen flex items-center justify-center">
          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
          )}
          <video
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={(e) => {
              console.error('Video playback error:', e);
              setIsVideoLoaded(true);
            }}
          >
            <source src="https://assets.mixkit.co/videos/2379/2379-720.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              Capture Every Precious Moment
            </h1>
            <p className="text-xl sm:text-2xl text-white mb-8 max-w-2xl mx-auto">
              Book the perfect photographer for your next session with Sessionat – where every moment is captured beautifully and professionally.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-[#704e81] hover:bg-[#cfbac3] transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 group"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <span className="transition-all duration-300  mr-2 opacity-100">
                <Camera size={24} />
              </span>
              Book Now
            </Link>
          </div>
        </section>
        <Images />
       
      
        {userRole === "photographer" && <SubscriptionPlans />}
        {/* <Feedback /> */}
        <Cameraman />
        <br /><br />
        <CategoryAndCityGrid/>
        <div className=" bg-gradient-to-b from-white to-purple-50"><FAQSection/></div>
        
      </main>
     
      <Footer />
    </div>
  );
};

export default Hero;