import { useContext, useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import './Sign.css';
import { LoginContext } from '../Context/LoginContext';


const UploadProjects = () => {

const UploadProjects = () => {
    
    const loginState = useContext(LoginContext);
    console.log(import.meta.env.Preset_Key)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [projectName, setProjectName] = useState('');
    const [department, setDepartment] = useState('');
    const [githubRepo, setGithubRepo] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
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
    
const UploadFile = async(event) => {
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

   const handleSubmit = async (e) => {
    e.preventDefault();
    const  formData = {
        name : name,
        email : email,
        projectName : projectName,
        department : department,
        githubRepo : githubRepo,
        projectImage: projectImage
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
      console.log('Form submission successful',data);
      // Reset form and states if needed
    } catch (error) {
      console.error('Form submission error', error);
    }
};


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 upb">
            <div className="bg-white p-8 rounded-lg shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] w-full max-w-4xl bg-opacity-3 bg-gray-700">
                <h2 className="text-4xl font-semibold mb-4 text-center">Upload Project</h2>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div className='flex'>
                        <div className='mr-20'>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>

                            {/* Project Name */}
                            <div className="mb-4">
                                <label htmlFor="projectName" className="block text-gray-700 text-sm font-bold mb-2">Project Name</label>
                                <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} id="projectName" className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            
                            
                        </div>
                        <div>
                            {/* Department Name */}
                            <div className="mb-4">
                                <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">Department Name</label>
                                <select id="department" value={department} onChange={handleDepartmentChange} className="shadow border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
                        <input type="file"  onChange={UploadFile} accept="image/*" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="w-full md:w-1/2 p-2">
                                <label htmlFor="projectDescription" className="block text-gray-700 text-sm font-bold mb-2">Project Description (limit 600 words)</label>
                                <textarea id="projectDescription" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength="3600" placeholder="Describe your project (up to 600 words)"></textarea>
                            </div>


                    <div className="flex justify-center mt-6">
                        <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadProjects;
