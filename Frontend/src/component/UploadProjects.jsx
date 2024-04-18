import { useContext, useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import './Sign.css';
import { LoginContext } from '../Context/LoginContext';

const UploadProjects = () => {
    const loginState = useContext(LoginContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [projectName, setProjectName] = useState('');
    const [department, setDepartment] = useState('');
    const [githubRepo, setGithubRepo] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectImage, setProjectImage] = useState('');
    const [projectVideo, setProjectVideo] = useState(null);
    const [showGitHub, setShowGitHub] = useState(false);

    const handleDepartmentChange = (event) => {
        const selectedDepartment = event.target.value;
        setDepartment(selectedDepartment);
        setShowGitHub(selectedDepartment === 'School of Computer Applications' || selectedDepartment === 'School of Engineering');
    };

    const UploadFile = async(event) => {
        const file = event.target.files[0];
        const data = new FormData();
        data.append("file", file);
        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dl81ig8l5/image/upload', {
                method : "POST",
                body: data
            });
            const resp = await response.json();
            setProjectImage(resp.url);
        } catch (error) {
            console.error("Failed to upload", error);
            // Optionally, update the UI to show an error message
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name, email, projectName, department, githubRepo, projectImage
        };

        try {
            const response = await fetch('http://localhost:3000/project/api/uploadprojects', {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Form submission successful', data);
                // Optionally, reset the form state here
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Form submission error', error);
            // Optionally, update the UI to show an error message
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 upb">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h2 className="text-4xl font-semibold mb-4 text-center">Upload Project</h2>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div className='flex'>
                        <div className='mr-20'>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="projectName" className="block text-gray-700 text-sm font-bold mb-2">Project Name</label>
                                <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} id="projectName" className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                        </div>
                        <div>
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
                            <div className="mb-4">
                                <label htmlFor="projectImage" className="block text-gray-700 text-sm font-bold mb-2">Project Image</label>
                                <input type="file" onChange={UploadFile} id="projectImage" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" accept="image/*" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="projectDescription" className="block text-gray-700 text-sm font-bold mb-2">Project Description</label>
                        <textarea id="projectDescription" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength="3600" placeholder="Describe your project (up to 600 words)"></textarea>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadProjects;
