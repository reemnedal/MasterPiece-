import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "./imgs/sessionat.png";  

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/profile", label: "Profile" },
    { to: "/signup", label: "Signup" },
    { to: "/login", label: "Login" },
    { to: "/booking", label: "Book Now" },
  ];

  const MenuLink = ({ to, children }) => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
      <Link to={to} className={`${scrolled ? 'text-[#704e81]' : 'text-white'} hover:text-[#704e81] transition-colors duration-300`}>
        {children}
      </Link>
    </motion.div>
  );

  return (
    <nav className={` fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white text-[#704e81] bg-opacity-90 shadow-lg' : ' text-white bg-transparent bg-opacity-0'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <span className={`text-2xl font-bold ${scrolled ? 'text-[#704e81]' : 'text-white'}`}>SESSIONAT</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <MenuLink key={item.to} to={item.to}>
                {item.label}
              </MenuLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className={`${scrolled ? 'text-[#704e81]' : 'text-white'} hover:text-[#cfbac3] transition-colors duration-300`}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="md:hidden bg-white shadow-lg overflow-hidden">
            <div className="container mx-auto px-4 py-2">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.li key={item.to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: index * 0.1 }}>
                    <MenuLink to={item.to}>{item.label}</MenuLink>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
