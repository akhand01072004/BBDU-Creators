import React from 'react';
// Assume icons are from a library like react-icons
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white p-6">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">About BBD Creators</h2>
          <p className="text-sm">
            BBD Creators is dedicated to building innovative solutions that make a difference. Join us on our journey to create impactful technology.
          </p>
          <Link to="AdminLogin" className='mt-2 font-bold'>Admin Panel</Link>
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
      </div>
      <div className="text-center text-sm mt-4">
        © {new Date().getFullYear()} BBD Creators. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
