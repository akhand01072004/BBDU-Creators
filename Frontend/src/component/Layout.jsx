import NavBar from './NavBar'
import Footer from './Footer'


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