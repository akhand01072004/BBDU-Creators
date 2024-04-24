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
import UserProfile from './component/UserProfile';
import Layout from './component/Layout';
import ProfilePage from './component/ProfilePage';



function App() {

  const MainLayout = () => (
    <>
      <div className="background">
        <NavBar />
        <Header />

      </div>
      <Section1 />
      <Section2 />
      <Footer />

    </>
  );

  return (


    <BrowserRouter>
      <SnackbarProvider maxSnacl={1}>
        <Routes>
          <Route path="/home" element={<Header />} />
          <Route index element={<MainLayout />} /> 
          <Route path="/" element={<Layout />} >
          <Route path="sign" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path='ManageUserAdmin' element={<ManageUserAdmin />} />
          <Route path="UploadProjects" element={<UploadProjects />} />
          <Route path="Projects" element={<Projects />} />
          <Route path="projectDetail/:id" element={<ProjectDetail />} />
          <Route path='ManageProjectAdmin' element={<ManageProject />} />
          <Route path="fileupload" element={<Fileupload />} />
          <Route path="email-verification" element={<EmailVerify />} />
          <Route path='UserProfile' element={<UserProfile />} />
          <Route path='ProfilePage' element={<UserProfile />}/>
          <Route path='AdminLogin' element={<AdminLoginProvider><AdminLogin /></AdminLoginProvider>} />
          <Route path='AdminSignup' element={<AdminLoginProvider><AdminSignup /></AdminLoginProvider>} />
          <Route path='Dashboard' element={<AdminLoginProvider><AdminDashboard /></AdminLoginProvider>}>
            <Route path='ManageProjectAdmin' element={<ManageProject />} />
            <Route path='ManageUserAdmin' element={<ManageUserAdmin />} />
          </Route>
          </Route>
     </Routes>
     </SnackbarProvider>
    </BrowserRouter>

  );

}

export default App
