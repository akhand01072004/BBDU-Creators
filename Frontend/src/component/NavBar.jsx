import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./Sign.css";  // Ensure this file exists and properly styles your components
import Img from '../assets/Nav-logo.png'; // Ensure this image path is correct in your project
import { LoginContext } from '../Context/LoginContext';
import { useSnackbar } from 'notistack';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loginState = useContext(LoginContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    const resp = await fetch('http://localhost:3000/user/logout', {
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (resp.status === 201) {
      enqueueSnackbar('User Logout Successfully', { variant: 'success' });
      window.location.reload();
    } else {
      enqueueSnackbar('Logout Failed', { variant: 'error' });
    }
  };

  return (
    <nav className="bg-white-200 border-black-200  px-2 py-2 md:px-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-3xl text-black-500  fo">BBDU</span>
          <img className="h-12 mr-1" src={Img} alt="Logo" />
          <span className="text-3xl text-blue-500  fo">CREATORS</span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-lg text-black-600 hover:text-blue-500">Home</Link>
          <Link to="/about" className="text-lg text-black-600 hover:text-blue-500">About Us</Link>
          <Link to="/contact" className="text-lg text-black-600 hover:text-blue-500">Contact Us</Link>
          <Link to="/projects" className="text-lg text-black-600 hover:text-blue-500">Projects</Link>
        </div>
        <button className="md:hidden flex items-center bg-blue-500 text-white py-2 px-4 rounded-l-full rounded-br-full  hover:bg-blue-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <div className="hidden md:flex">
          {loginState.login ? (
            <button onClick={handleLogout} className="bg-blue-500 text-white py-2 px-4 rounded-l-full rounded-br-full mr-100 hover:bg-blue-800">
              LogOut
            </button>
          ) : (
            <Link to="/sign" className="bg-blue-500 text-white py-2 px-4 rounded-l-full rounded-br-full mr-100 hover:bg-blue-800">
              Sign In
            </Link>
          )}
        </div>
      </div>
      {isMenuOpen && (
        <>
          <div className="flex flex-col items-center md:hidden bg-white shadow-lg">
            <Link to="/" className="py-2 text-black-600 hover:text-blue-500">Home</Link>
            <Link to="/about" className="py-2 text-black-600 hover:text-blue-500">About Us</Link>
            <Link to="/contact" className="py-2 text-black-600 hover:text-blue-500">Contact Us</Link>
            <Link to="/projects" className="py-2 text-black-600 hover:text-blue-500">Projects</Link>
          </div>
          <div>
            <div className=" flex flex-col items-center md:hidden bg-white shadow-lg">
              {loginState.login ? (
                <button onClick={handleLogout} className="bg-blue-500 text-white py-2 px-4 rounded-l-full rounded-br-full mr-100 hover:bg-blue-800">
                  LogOut
                </button>
              ) : (
                <Link to="/sign" className="bg-blue-500 text-white py-2 px-4 rounded-l-full rounded-br-full mr-100 hover:bg-blue-800">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;
