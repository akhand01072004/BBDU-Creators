import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { SlLogin } from "react-icons/sl";
import { enqueueSnackbar } from 'notistack';
import { AdminLoginContext } from '../admin/AdminContext/AdminLoginContext';
import { useContext} from 'react';



const AdminDashboard = () => {
  const LoginState = useContext(AdminLoginContext);
  const navigate = useNavigate();

  
  const LogOut = async() => {
    const resp = await fetch('http://localhost:3000/admin/logout',{
              credentials : "include",
              headers : {
                  'Content-Type' : 'application/json'
              }
            });
      if(resp.status === 201){
        enqueueSnackbar('Admin Logout Successfully', {variant : 'success'});
        navigate('/AdminLogin');
      }
  }

  return (
    <>
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-5 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-700">Admin Dashboard</h1>
        </div>
        <ul className="flex flex-col p-2">
          <li>
            <Link className="text-blue-500 hover:text-blue-700 p-2 flex items-center text-sm uppercase font-medium rounded-lg hover:bg-blue-50 transition duration-150" to="ManageProjectAdmin">
              <svg className="w-4 h-4 mr-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM10 11a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Manage Projects
            </Link>
          </li>
          <li>
            <Link className="text-blue-500 hover:text-blue-700 p-2 flex items-center text-sm uppercase font-medium rounded-lg hover:bg-blue-50 transition duration-150" to="ManageUserAdmin">
            <FaUser className='mr-4' />
              Manage Users
            </Link>
          </li>
          <li>
            <Link to="/AdminSignup" className="text-blue-500 hover:text-blue-700 p-2 flex items-center text-sm uppercase font-medium rounded-lg hover:bg-blue-50 transition duration-150">
              <FaUser className='mr-4' />
              SignUp
            </Link>
          </li>
          <li>
          {
            LoginState.Adminlogin ?
            <button onClick={LogOut}>
            <Link className="text-blue-500 hover:text-blue-700 p-2 flex items-center text-sm uppercase font-medium rounded-lg hover:bg-blue-50 transition duration-150" to="/AdminLogin">
              <GrLogout className='mr-4' />
              LogOut
            </Link></button> : 
            <button>
            <Link to="/AdminLogin" className="text-blue-500 hover:text-blue-700 p-2 flex items-center text-sm uppercase font-medium rounded-lg hover:bg-blue-50 transition duration-150">
                <SlLogin className='mr-4' />
                Login
            </Link>
            </button>
          }
          </li>
        </ul>
      </div>
      {/* Main content area */}
      {LoginState.Adminlogin ? 
      <div className="flex-1 ">
        <Outlet />
      </div> : 
      <Link to="/AdminLogin" className='text-xl m-2'>Please Login😒</Link>
    }
    </div> 
    </>
  );
}

export default AdminDashboard;
