import { useContext, useState} from "react";
import { LoginContext } from "../Context/LoginContext";
import.meta.env;

const Fileupload = () => {

    const LoginState = useContext(LoginContext);

    console.log(LoginState);

    // const [image,SetImage] = useState();

    // const UploadFile = async(event) => {
    //     const file = event.target.files[0];
    //     // SetImage(file);
    //     const data = new FormData();
    //     data.append("file", file);
    //     data.append("upload_preset", "ml_default");
    //     data.append("cloud_name", "dl81ig8l5")
    //     try {
    //         const response = await fetch('https://api.cloudinary.com/v1_1/dl81ig8l5/image/upload', {
    //         method : "POST",
    //         body: data
    //         });
    //         const resp = await response.json();
    //         SetImage(resp.url);
    //         console.log(resp);
    //     } catch (error) {
    //         console.log("failed to upload");
    //     }
    // }
    const [image,SetImage] = useState();

    const UploadFile = async(event) => {
        const file = event.target.files[0];
        // SetImage(file);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ml_default");
        data.append("cloud_name", "dl81ig8l5")
        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dl81ig8l5/video/upload', {
            method : "POST",
            body: data
            });
            const resp = await response.json();
            SetImage(resp.url);
            console.log(resp);
        } catch (error) {
            console.log("failed to upload");
        }
    }
    
    return (
        <div className="m-5">
            <h1>Upload file</h1>
            <form>
                <input type='file' onChange={UploadFile}></input>
                <img src={image} alt="image"/>
                <video width="750" height="500" controls >
                      <source src={image} type="video/mp4"/>
                </video>
             </form>
        </div>
    );
}

export default Fileupload;

