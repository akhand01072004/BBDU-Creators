
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './/component/Design.css'
import NavBar from './component/NavBar'
import SignUp from './component/SignUp'
import LogIn from './component/LogIn';
import Header from './component/Header';
import About from './component/About';
import Contact from './component/Contact'
// import ManageUser from './component/ManageUser';
import {SnackbarProvider} from 'notistack'
import UploadProjects from './component/UploadProjects';
import Projects from './component/Projects';
import ProjectDetail from './component/ProjectDetail';
import Footer from './component/Footer';
import ManageUserAdmin from './component/admin/ManageUser';
import ManageProject from './component/admin/ManageProject';
import Fileupload from './component/Fileupload';
import './App.css';

function App() {

  const MainLayout = () => (
    <>
      <div className="background">
        <NavBar />
        <Header />
        <Footer />
      </div>
      
      
      
    </>
  );

  return (
   
      
    <BrowserRouter>
     <SnackbarProvider>
      <Routes>
        <Route path="/" element={<MainLayout />} /> {/* Define other routes as needed here */}
        <Route path="/sign" element={<SignUp />} />
        <Route path="/home" element={<Header />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/ManageUserAdmin' element={<ManageUserAdmin />} />
        <Route path="/UploadProjects" element={<UploadProjects/>}/>
        <Route path="/Projects" element={<Projects/>}/>
        <Route path="/projectDetail/:id" element={<ProjectDetail />} />
        <Route path='/ManageProjectAdmin' element={<ManageProject />} />
        <Route path="/fileupload" element={<Fileupload />} />
      </Routes>
      </SnackbarProvider>
    </BrowserRouter>
    
  );

}

export default App
