import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../imgs/sessionat.png";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const userRole = Cookies.get('role');
    if (userRole) {
      setRole(userRole);
    }

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

  const handleLogout = () => {
    Cookies.remove('role');
    Cookies.remove('token');
    setRole(null);
    navigate('/');
  };

  const menuItems = [
    { to: "/", label: "Home" },
    role === 'admin' && { to: "/admin", label: "Admin" },
    role === 'user' && { to: "/profile", label: "Profile" },
    role === 'photographer' && { to: "/photographerProfile", label: "Photographer Profile" },
    ...(role ? [] : [{ to: "/signup", label: "Signup" }, { to: "/Login", label: "Login" }]),
    { to: "/catalog", label: "Sessions" },
    { to: "/cameraman", label: "Photographers" },
    { to: "/products", label: "Products" },
    { to: "/tips", label: "Tips" },
    role === ('user' || 'photographer' )&& { to: "/cart", label: "Cart" },

  ].filter(item => item && item.to !== null);

  const getTextColor = () => {
    if (scrolled) return 'text-[#704e81]';
    if (isHomePage) return 'text-white';
    return 'text-[#704e81]';
  };

  const MenuLink = ({ to, children }) => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
      <Link to={to} className={`${getTextColor()} hover:text-[#704e81] transition-colors duration-300`}>
        {children}
      </Link>
    </motion.div>
  );

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white text-[#704e81] bg-opacity-90 shadow-lg' : 
      isHomePage ? 'text-white bg-transparent bg-opacity-0' : 'bg-white text-[#704e81]'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-32 w-32" />
            <span className={`text-2xl font-bold ${getTextColor()}`}></span>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <MenuLink key={item.to} to={item.to}>
                {item.label}
              </MenuLink>
            ))}
            {role && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                <button onClick={handleLogout} className={`${getTextColor()} hover:text-[#704e81] transition-colors duration-300`}>
                  Logout
                </button>
              </motion.div>
            )}
          </div>
          
          <div className="md:hidden">
            <button onClick={toggleMenu} className={`${getTextColor()} hover:text-[#cfbac3] transition-colors duration-300`}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }} 
            transition={{ duration: 0.3 }} 
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-2">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.li 
                    key={item.to} 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                  >
                    <MenuLink to={item.to}>{item.label}</MenuLink>
                  </motion.li>
                ))}
                {role && (
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.2, delay: menuItems.length * 0.1 }}
                  >
                    <button onClick={handleLogout} className="text-[#704e81] hover:text-[#cfbac3] transition-colors duration-300">
                      Logout
                    </button>
                  </motion.li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;