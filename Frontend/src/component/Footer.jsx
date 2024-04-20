import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaUserShield } from 'react-icons/fa'; // Added FaUserShield for admin icon

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white p-6">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4"> {/* Changed to 4 columns */}
        <div>
          <h2 className="text-lg font-semibold mb-2">About BBD Creators</h2>
          <p className="text-sm">
            BBD Creators is dedicated to building innovative solutions that make a difference. Join us on our journey to create impactful technology.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
          <ul className="text-sm">
            <li>Email: contact@bbdcreators.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 123 Creator St, Innovation City</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex items-center space-x-4">
            <a href="https://facebook.com" className="hover:text-blue-300"><FaFacebook /></a>
            <a href="https://instagram.com" className="hover:text-pink-400"><FaInstagram /></a>
            <a href="https://twitter.com" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="https://linkedin.com" className="hover:text-blue-300"><FaLinkedin /></a>
          </div>
        </div>
        <div> {/* New Admin Panel Div */}
          <div className="flex items-center space-x-2">
            <FaUserShield size={32} /> {/* Larger Icon for Visual Distinction */}
            
            <Link to="/AdminLogin" className="text-lg  hover:underline">Access Panel</Link>
          </div>
          
        </div>
      </div>
      <div className="text-center text-sm mt-4">
        © {new Date().getFullYear()} BBD Creators. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
