
import "./Design.css"
import {ReactTyped} from "react-typed";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
import { enqueueSnackbar } from "notistack";

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
    <>
      <header className="container-md h-screen bg-[url(./assets/ii.png)] bg-cover bg-center ok">
        <div className="container mx-auto py-4 flex justify-center ">
          <div className=" flex justify-center t1">
            <div className="bg-transparent b2  mr-10">
              <div className="b3 mr-[20%]">
                <h1 className="text-5xl    fs">  BABU <span className="text-blue-800">BANARASI</span>  </h1>
                <h1 className='text-5xl  fs'> DAS UNIVERSITY </h1>
                <h5 className="mt-12"><ReactTyped className="text-2xl " strings={["Innovate. Create. Showcase"]} typeSpeed={100} loop /></h5>
                <button onClick={handleclick} className=" mt-12 text-white text-lg cursur-pointer bg-blue-500 p-1 rounded-md px-4 py-3 hover:bg-blue-700">Upload Project</button>
              </div>

            </div>
            <div className=" flex justify-center bg-transparent image ml-5">

            </div>

          </div>


        </div>
      </header>
      
      
    </>
  )
}

export default Header