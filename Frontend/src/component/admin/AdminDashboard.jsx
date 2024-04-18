import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <>
    <div className='flex gap-4'>
    <Link className='text-blue-400 text-lg' to="ManageProjectAdmin">Manage Project</Link>
    <Link className='text-blue-400 text-lg mr-10' to="ManageUserAdmin">Manage User</Link>
    </div>
    <Outlet />
    </>
  )
}

export default AdminDashboard