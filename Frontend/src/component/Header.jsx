import React from 'react';
import "./Design.css"
import {ReactTyped} from "react-typed";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
import { enqueueSnackbar } from "notistack";
import yourImage from '../assets/Back1.png';


  

const Header = () => {
  const navigate = useNavigate();
    const LoginState = useContext(LoginContext);
    const handleclick = async () => {
      if (LoginState.login === false) {
        enqueueSnackbar('Please Login to upload project', { variant: "error" });
        return;
      }
      navigate("/UploadProjects")
    }
    return (
        <header className="min-h-screen flex items-center justify-center bg-gray-100 bg-head bg-center">
            <div className="w-full  md:max-h-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex justify-between items-center content-start py-6  ">
                    <div className="lg:w-0 lg:flex-1 flex flex-col justify-center items-center  ">
                      <div>
                        <h1 className="text-5xl    fs">  BABU <span className="text-blue-800">BANARASI</span>  </h1>
                        <h1 className='text-5xl  fs'> DAS UNIVERSITY </h1>
                        <h5 className="mt-12"><ReactTyped className="text-2xl " strings={["Innovate. Create. Showcase"]} typeSpeed={100} loop /></h5>
                        <button onClick={handleclick} className="w-40 mt-12 text-white text-lg cursur-pointer bg-blue-500 p-1 rounded-md px-4 py-3 hover:bg-blue-700">Upload Project</button>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center md:flex-1 lg:w-0">
                        <img src={yourImage} alt="Brand" className="max-w-full" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
