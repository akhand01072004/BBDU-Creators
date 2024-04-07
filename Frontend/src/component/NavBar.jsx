import { Link } from 'react-router-dom'
import "./Sign.css"
import Img from '../assets/Logo.png'

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-white-300 p-6 w-full h-14  ">
      <div className="flex justify-center ml-6 items-center flex-shrink-0 text-white ">
        <span><img className="nav-icon mr-1" src={Img} alt="" /></span>
        <span className="text-2xl  text-stone-950 mr-2  fo">
          BBDU
          
        </span>
        <span className="text-2xl tracking-tight pr-3 text-blue-500  fo">
          CREATORS
        </span>
      </div>
      <div className=" flex items-center justify-center gap-4 text-lg ">
        <Link className='hover:text-blue-500' to="/">Home</Link>
        <Link className='hover:text-blue-500' to="/contact">Contact</Link>
        <Link className='hover:text-blue-500' to="/about">About Us</Link>
        <Link className='hover:text-blue-500' to='/Projects'>Projects</Link>
      </div>
      <div className=" flex items-center justify-center ml-20">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-l-full rounded-br-full mr-100 hover:bg-blue-800">
          <Link className="" to="/Sign">
            Sign Up
          </Link>
        </button>
      </div>
    </nav>
  );
};


export default NavBar