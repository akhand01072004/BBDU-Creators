import { useContext, useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import './Sign.css';
import { LoginContext } from '../Context/LoginContext';


const UploadProjects = () => {

    const loginState = useContext(LoginContext);
    console.log(import.meta.env.Preset_Key)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [projectName, setProjectName] = useState('');
    const [department, setDepartment] = useState('');
    const [githubRepo, setGithubRepo] = useState('');
    // const [projectVideo, setProjectVideo] = useState(null);
    const [projectImage, setProjectImage] = useState('');
    const [projectVideo,  setProjectVideo] = useState('');
    const [showGitHub, setShowGitHub] = useState(false);

    const handleDepartmentChange = (event) => {
        const selectedDepartment = event.target.value;
        setDepartment(selectedDepartment);
        setShowGitHub(selectedDepartment === 'School of Computer Applications' || selectedDepartment === 'School of Engineering');
    };

//    const uploadFile = async(e) => {
//         const file = e.target.files[0];
//         if(!file) return;
//         const res = await fetch('http://localhost:3000/util/uploadfile', {
//             method: "POST",
//             body: projectImage,
//         })
//         if(res.status == 200){
//             console.log("file uploaded successfully")
//         }
//    }


const UploadImage = async(event) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dl81ig8l5")
    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dl81ig8l5/image/upload', {
        method : "POST",
        body: data
        });
        const resp = await response.json();
        setProjectImage(resp.url);
        console.log(resp.url);
        console.log(projectImage);
    } catch (error) {
        console.log("failed to upload");
    }
}

const UploadVideo = async(event) => {
    const file = event.target.files[0];
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
        setProjectVideo(resp.url);
        console.log(resp.url);
        console.log(projectVideo);
    } catch (error) {
        console.log("failed to upload");
    }
}

   const handleSubmit = async (e) => {
    e.preventDefault();
    const  formData = {
        name : name,
        email : email,
        projectName : projectName,
        department : department,
        githubRepo : githubRepo,
        projectImage: projectImage,
        projectVideo : projectVideo
    }

    if(LoginContext.login == false){
        enqueueSnackbar('Please Login', {variant : "error"});
    }

    try {
      const response = await fetch('http://localhost:3000/project/api/uploadprojects', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          "Content-Type":"application/json"
        },
      });
      const data = await response.json();
      if(response.status === 201){
        enqueueSnackbar("Project Submitted", {variant : "success"});
      }else{
        enqueueSnackbar("Project Not Submitted", {variant : "error"});
      }
      console.log('Form submission successful',data);
      // Reset form and states if needed
    } catch (error) {
      console.error('Form submission error', error);
    }
};

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 upb">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg bg-opacity-30 bg-gray-700">
                <h2 className="text-2xl font-semibold mb-4 text-center">Upload Project</h2>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    {/* Project Name */}
                    <div className="mb-4">
                        <label htmlFor="projectName" className="block text-gray-700 text-sm font-bold mb-2">Project Name</label>
                        <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} id="projectName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    {/* Department Name */}
                    <div className="mb-4">
                        <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">Department Name</label>
                        <select id="department" value={department} onChange={handleDepartmentChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">Select a Department</option>
                            <option value="School of Computer Applications">School of Computer Applications</option>
                            <option value="School of Engineering">School of Engineering</option>
                            <option value="School of Management">School of Management</option>
                            <option value="School Of Pharmacy">School Of Pharmacy</option>
                            <option value="School of Legal Studies">School of Legal Studies</option>
                            <option value="School of Basic Science">School of Basic Science</option>
                            <option value="School of Education">School of Education</option>
                            <option value="School of Humanities and Social Science">School of Humanities and Social Science</option>
                        </select>
                    </div>

                    {/* Conditional GitHub Repository or Project Video */}
                    {showGitHub ? (
                        <div className="mb-4">
                            <label htmlFor="githubRepo" className="block text-gray-700 text-sm font-bold mb-2">GitHub Repository</label>
                            <input type="url" value={githubRepo} onChange={(e) => setGithubRepo(e.target.value)} id="githubRepo" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    ) : (
                        <div className="mb-4">
                            <label htmlFor="projectVideo" className="block text-gray-700 text-sm font-bold mb-2">Project Video</label>
                            <input type="file" onChange={(e) => setProjectVideo(e.target.files[0])} id="projectVideo" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" accept="video/*" />
                        </div>
                    )}

                    {/* Project Image */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Project Image</label>
                        <input type="file"  onChange={UploadImage} accept="image/*" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Project Video</label>
                        <input type="file"  onChange={UploadVideo} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-6">
                        <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadProjects;
