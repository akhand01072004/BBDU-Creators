
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './/component/Design.css'
import NavBar from './component/NavBar'
import SignUp from './component/SignUp'
import LogIn from './component/LogIn';
import Header from './component/Header';
import About from './component/About';
import Contact from './component/Contact'
import ManageUser from './component/ManageUser';
import {SnackbarProvider} from 'notistack'
import UploadProjects from './component/UploadProjects';
import Projects from './component/Projects';
import './App.css';

function App() {

  const MainLayout = () => (
    <>
      <div className="background">
        <NavBar />
        <Header />
      </div>
      
    </>
  );

  return (
    <SnackbarProvider>
      
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} /> {/* Define other routes as needed here */}
        <Route path="/sign" element={<SignUp />} />
        <Route path="/home" element={<Header />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/ManageUser' element={<ManageUser />} />
        <Route path="/UploadProjects" element={<UploadProjects/>}/>
        <Route path="/Projects" element={<Projects/>}/>
      </Routes>
    </BrowserRouter>
    </SnackbarProvider>
  );

}

export default App
