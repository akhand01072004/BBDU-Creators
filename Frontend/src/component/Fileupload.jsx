import { useContext, useEffect, useRef, useState} from "react";

import.meta.env;

const Fileupload = () => {

    const LoginState = useContext(LoginContext);

    console.log(LoginState);

    const UploadWidget = () => {
        const cloudinaryRef = useRef();
            cloudinaryRef.current.createUploadWidget({
                cloudName: 'dl81ig8l5',
                uploadPreset: 'ml_default'
            }, function(error, result){
                console.log(result);
            });
    }


    return (
        <div className="m-5">
            <h1>hello</h1>
            <button onClick={UploadWidget}>Upload</button>
        </div>
    );

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
    // const [image,SetImage] = useState();

    // const UploadFile = async(event) => {
    //     const file = event.target.files[0];
    //     // SetImage(file);
    //     const data = new FormData();
    //     data.append("file", file);
    //     data.append("upload_preset", "ml_default");
    //     data.append("cloud_name", "dl81ig8l5")
    //     try {
    //         const response = await fetch('https://api.cloudinary.com/v1_1/dl81ig8l5/video/upload', {
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
}

export default Fileupload;

