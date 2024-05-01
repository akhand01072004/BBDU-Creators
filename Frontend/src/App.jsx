import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './/component/Design.css'
import NavBar from './component/NavBar'
import SignUp from './component/SignUp'
import LogIn from './component/LogIn';
import Header from './component/Header';
import About from './component/About';
import Contact from './component/Contact'
// import ManageUser from './component/ManageUser';
import { SnackbarProvider } from 'notistack'
import UploadProjects from './component/UploadProjects';
import Projects from './component/Projects';
import ProjectDetail from './component/ProjectDetail';
import Footer from './component/Footer';
import ManageUserAdmin from './component/admin/ManageUser';
import ManageProject from './component/admin/ManageProject';
import Fileupload from './component/Fileupload';
import EmailVerify from './component/EmailVerification';
import Section1 from './component/Section1';
import Section2 from './component/Section2';
import AdminDashboard from './component/admin/AdminDashboard';
import AdminSignup from './component/admin/AdminSignup';
import AdminLogin from './component/admin/AdminLogin';
import { AdminLoginProvider } from './component/admin/AdminContext/AdminLoginContext';
import './App.css';
import AdminProfile from './component/admin/AdminProfile';
import Layout from './component/Layout';
import UserProfile from './component/ProfilePage';




function App() {

  const MainLayout = () => (
    <>
      <NavBar />
      <Header />
      <Section1 />
      <Section2 />
      <Footer />

    </>
  );

  return (


    <BrowserRouter>
      <SnackbarProvider maxSnacl={1}>
        <Routes>
          <Route path="/" element={<MainLayout />} /> {/* Define other routes as needed here */}
          <Route path="/sign" element={<Layout><SignUp /></Layout>} />
          <Route path="/home" element={<Header />} />
          <Route path="/login" element={<Layout><LogIn /></Layout>} />
          <Route path="/UserProfile" element={<Layout><UserProfile /></Layout>}/>
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/UploadProjects" element={<Layout><UploadProjects /></Layout>} />
          <Route path="/Projects" element={<Layout><Projects /></Layout>} />
          <Route path="/projectDetail/:id" element={<Layout><ProjectDetail /></Layout>} />
          <Route path="/fileupload" element={<Fileupload />} />
          <Route path="/email-verification" element={<Layout><EmailVerify /></Layout>} />
          <Route path='/AdminLogin' element={<Layout><AdminLoginProvider><AdminLogin /></AdminLoginProvider></Layout>} />
          <Route path='/AdminSignup' element={<Layout><AdminLoginProvider><AdminSignup /></AdminLoginProvider></Layout>} />
          <Route path='/Dashboard' element={<Layout><AdminLoginProvider><AdminDashboard /></AdminLoginProvider></Layout>}>
            <Route path='UserProfile' element={<AdminProfile />}/>
            <Route path='ManageProjectAdmin' element={<ManageProject />} />
            <Route path='ManageUserAdmin' element={<ManageUserAdmin />}/>
          </Route>
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>

  );

}

export default App
