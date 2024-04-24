import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom';

const Layout = (props) => {
  return (
    <>
    <NavBar/>
    <main className="">
        {props.children} 
    </main>
    <Footer/>
    </>
  )
}

export default Layout