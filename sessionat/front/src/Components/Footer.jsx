import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Services",
      links: [
        { name: "Photographers", path: "/cameraman" },
        { name: "Products", path: "/products" },
        { name: "Courses", path: "/courses" },
        { name: "Catalog", path: "/catalog" },
      ]
    },
    {
      title: "Account",
      links: [
        { name: "Sign Up", path: "/signup" },
        { name: "Login", path: "/login" },
        { name: "Profile", path: "/profile" },
        { name: "Cart", path: "/cart" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Join us as photographer", path: "/signupPho" },
      ]
    }
  ];

  const socialLinks = [
    { Icon: Facebook, href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Youtube, href: "#" }
  ];

  return (
    <footer className="bg-[#704e81] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Sessionat</h3>
            <p className="text-gray-200">
              Capture your special moments with our professional photography services.
            </p>
            {/* Social Links */}
            {/* <div className="flex space-x-4 mt-4">
              {socialLinks.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="bg-white p-2 rounded-full text-[#704e81] hover:bg-gray-100 transition-colors duration-200"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div> */}
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-lg font-semibold">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-gray-200 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200/20">
          <div className="text-center text-gray-200">
            <p>© {currentYear} sessionat. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;