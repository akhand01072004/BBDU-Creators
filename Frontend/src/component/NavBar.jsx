import { Link } from 'react-router-dom'


const NavBar = () => {
  return (
    <nav className="flex justify-around items-center bg-transparent p-6 w-full h-14 ">
      <div className="flex justify-center ml-8 items-center flex-shrink-0 text-white mr-12">
        <span className="text-2xl  tracking-tight text-stone-950 mr-3 font-bold">
          BBDU
        </span>
        <span className="text-2xl tracking-tight pr-3 text-green-500 font-bold">
          CREATORS
        </span>
      </div>
      <div className=" flex items-center justify-center gap-3">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About Us</Link>
      </div>
      <div className=" flex items-center justify-center ">
        <button className="bg-green-400 text-white py-2 px-4 rounded-l-full rounded-br-full mr-100 hover:bg-green-800">
          <Link className="" to="/Sign">
            Sign Up
          </Link>
        </button>
      </div>
    </nav>
  );
};


export default NavBar