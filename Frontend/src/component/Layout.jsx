import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
    <NavBar/>
    <main className="">
        <Outlet />  
    </main>
    <Footer/>
    
    </>
  )
}

export default Layout