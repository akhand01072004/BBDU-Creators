import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext} from 'react';
import "./Sign.css";
import Img from '../assets/Nav-logo.png';
import { LoginContext } from '../Context/LoginContext';
import { useSnackbar } from 'notistack';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const loginState = useContext(LoginContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const OpenProfile = () => {
    navigate('/UserProfile')
  } 
  const LogOut = async () => {
    const response = await fetch('http://localhost:3000/users/logout', {
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      enqueueSnackbar('User Logout Successfully', { variant: 'success' });
      window.location.reload();
    } else {
      enqueueSnackbar('Logout Failed', { variant: 'error' });
    }
  };




  return (
    <div>
    <nav className="relative bg-white shadow-lg  flex items-center h-14  ">
      <div className="max-w-7xl mx-auto px-4   flex justify-between  items-center w-full">
        {/* <div className="flex w-full justify-between border-2 border-black items-center "> */}
          {/* <div className="flex space-x-4 justify-between"> */}
            {/* Logo */}
            <div className=' flex items-center justify-center '>
              <Link to="/" className="flex items-center  text-gray-700 hover:text-gray-900 ">
                <span  className="text-3xl  text-stone-950 fo flex items-center">BBDU</span>
                <img src={Img} alt="Logo" className="h-11 w-11 mr-1" />
                <span className="text-3xl text-blue-500  fo">CREATORS</span>
              </Link>
            </div>

            {/* Primary Nav Menu */}
            <div className="hidden md:flex items-center flex  gap-11 text-lg ">
              <Link to="/" className=" text-black-700 hover:text-blue-600">Home</Link>
              <Link to="/about" className="text-black-700 hover:text-blue-600">About Us</Link>
              <Link to="/contact" className=" text-black-700 hover:text-blue-600">Contact Us</Link>
              <Link to="/projects" className=" text-black-700 hover:text-blue-600">Projects</Link>
            </div>
          {/* </div> */}

          {/* Secondary Nav Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {loginState.login ?
            <button className="bg-blue-500 text-white py-2 px-4 rounded-l-full rounded-br-full mr-100 hover:bg-blue-800">
              <button onClick={OpenProfile}>Profile</button>
            </button> : null}
            
            {loginState.login ? <button className="bg-red-400 text-white py-2 px-4 rounded-l-full mr-100 rounded-br-full mr-64 hover:bg-red-500" onClick={LogOut}>LogOut</button> :
            <button className="bg-blue-500 text-white py-2 px-4 rounded-l-full rounded-br-full mr-100 hover:bg-blue-800">
              <Link to='/Sign'>Signup</Link>
            </button>}

            {/* <button className="bg-blue-500 text-white py-2 px-4 rounded-l-full rounded-br-full mr-100 hover:bg-blue-800">
            //   {loginState.login ? <button className="bg-red-400 rouned-br-full mr-100 hover:bg-red-500" onClick={LogOut}>LogOut</button> : <Link to='/Sign'>Signup</Link>}
            // </button>*/}
            </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className='bg-blue-500 text-white py-2 px-4 rounded-l-full rounded-br-full'>
              <svg className="h-6 w-6 " fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        {/* </div> */}
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute top-14 flex flex-col gap-2 justify-center items-center bg-white w-full`}>
        <Link to="/" className=" py-2 px-4 text-lg text-black-700 hover:bg-blue-200">Home</Link>
        <Link to="/about" className=" py-2 px-4 text-lg text-black-700 hover:bg-blue-200">About Us</Link>
        <Link to="/contact" className=" py-2 px-4 text-lg text-black-700 hover:bg-blue-200">Contact Us</Link>
        <Link to="/projects" className="py-2 px-4 text-lg text-black-700 hover:bg-blue-200">Projects</Link>
        <Link to="/signup" className=" bg-blue-500 text-white py-2 px-4 rounded-l-full rounded-br-full hover:bg-blue-700 mb-2">Sign Up</Link>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
