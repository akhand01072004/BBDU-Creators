import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
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
              <svg className="w-4 h-4 mr-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM2 18s3-4 6-4 6 4 6 4H2z" />
              </svg>
              Manage Users
            </Link>
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
