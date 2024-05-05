import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import './Sign.css';


const schoolsAndCourses = {
    "SCHOOL OF ENGINEERING": ["B.TECH (CSE)", "B.TECH (CSE-AI)", "B.TECH (CSE-CCML)", "B.TECH (CSE-IOTBC)", "M. TECH (COMPUTER NETWORK)", "M. TECH (SOFTWARE ENGINEERING)", "PH.D (CSE)"],
    "SCHOOL OF MANAGEMENT": ["B.COM. (HONS.)", "BBA", "BBA (LOGISTICS AND SUPPLY CHAIN MANAGEMENT)", "BBA - BUSINESS ANALYTICS (IN COLLABORATION WITH IBM)", "MBA", "PH.D", "IMBA"],
    "SCHOOL OF COMPUTER APPLICATIONS": ["BCA", "MCA", "PH.D", "BCA IN DATA SCIENCE & ARTIFICIAL INTELLIGENCE", "BCA IN CYBER SECURITY & FORENSICS", "MCA IN DATA SCIENCE & ARTIFICIAL INTELLIGENCE"],
    "SCHOOL OF PHARMACY": ["Bachelor of Pharmacy", "Ph.D. Pharmacy"],
    "SCHOOL OF ARCHITECTURE AND PLANNING": ["BACHELOR OF ARCHITECTURE", "MASTERS OF PLANNING (URBAN PLANNING)", "Bachelor of Interior Design"],
    "SCHOOL OF HOTEL MANAGEMENT": ["BACHELOR OF HMCT"],
    "SCHOOL OF LEGAL STUDIES": ["BBA+LL.B (INTEGRATED)", "BA+LL.B (INTEGRATED)", "LLM", "PH.D"],
    "SCHOOL OF BASIC SCIENCES": ["B.SC. (HONS.)", "M.SC.", "PH. D"],
    "SCHOOL OF HUMANITIES & SOCIAL SCIENCES": ["PH. D"],
    "SCHOOL OF EDUCATION": ["PH. D"],
    "BABU BANARASI DAS COLLEGE OF DENTAL SCIENCES": ["DDS", "Ph.D. Dental Sciences"]
};

const UploadProjects = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [projectName, setProjectName] = useState('');
    const [department, setDepartment] = useState('');
    const [githubRepo, setGithubRepo] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectImage, setProjectImage] = useState('');
    const [projectVideo, setProjectVideo] = useState('');
    const [showGitHub, setShowGitHub] = useState(false);

    //video status
    const [uploadStatus, SetUploadStatus] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(`Handling input for ${name} with value ${value}`); // Debugging log
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            ...(name === 'school' && { course: '', githubRepo: '' }) // Reset course and GitHub on school change
        }));
    };

    const uploadFile = async (event, type) => {
        const file = event.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ml_default");
        data.append("cloud_name", "dl81ig8l5");
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/dl81ig8l5/${type}/upload`, {
                method: "POST",
                body: data
            });
            const resp = await response.json();
            setProjectImage(resp.url);
        } catch (error) {
            console.log("failed to upload");
        }
    }

    const UploadVideo = async (event) => {
        const file = event.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ml_default");
        data.append("cloud_name", "dl81ig8l5");
        SetUploadStatus(true);
        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dl81ig8l5/video/upload', {
                method: "POST",
                body: data
            });
            const resp = await response.json();
            setProjectVideo(resp.url);
            SetUploadStatus(false);
            console.log(resp.url);
            console.log(projectVideo);
        } catch (error) {
            console.error("Failed to upload", error);
            enqueueSnackbar('Failed to upload file.', { variant: 'error' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.projectVideo) {
            enqueueSnackbar('Please wait, video is uploading...', { variant: 'warning' });
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/project/api/uploadprojects', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                enqueueSnackbar("Project Submitted Successfully", { variant: "success" });
            } else {
                enqueueSnackbar("Project Submission Failed", { variant: "error" });
            }
        } catch (error) {
            console.error('Form submission error', error);
            enqueueSnackbar("Error submitting project", { variant: "error" });
        }
    };

    // Show GitHub field only for certain schools
    const showGitHubField = formData.school === "SCHOOL OF COMPUTER APPLICATIONS" || formData.school === "SCHOOL OF ENGINEERING";

    return (
        <div className="flex items-center justify-center min-h-screen upb">
            <div className="bg-white p-8 rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] w-full md:max-w-4xl">
                <h2 className="text-3xl mb-5 text-center font-bold">Upload Project</h2>

                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col md:flex-row w-full gap-6 mb-5'>
                        <div className='w-full'>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-bold mb-2">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="projectName" className="block text-sm font-bold mb-2">Project Name</label>
                                <input type="text" id="projectName" name="projectName" value={formData.projectName} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="school" className="block text-sm font-bold mb-2">School</label>
                                <select id="school" name="school" value={formData.school} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                                    <option value="">Select School</option>
                                    {Object.keys(schoolsAndCourses).map(school => (
                                        <option key={school} value={school}>{school}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="course" className="block text-sm font-bold mb-2">Course</label>
                                <select id="course" name="course" value={formData.course} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required disabled={!formData.school}>
                                    <option value="">Select Course</option>
                                    {formData.school && schoolsAndCourses[formData.school].map(course => (
                                        <option key={course} value={course}>{course}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='w-full'>

                            {showGitHubField && (
                                <div className="mb-4">
                                    <label htmlFor="githubRepo" className="block text-sm font-bold mb-2">GitHub Repository</label>
                                    <input type="url" id="githubRepo" name="githubRepo" value={formData.githubRepo} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                            )}

                            <div className="mb-4">
                                <label htmlFor="yearOfSubmission" className="block text-sm font-bold mb-2">Year of Submission</label>
                                <input type="number" id="yearOfSubmission" name="yearOfSubmission" value={formData.yearOfSubmission} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            <div className="mb-4">
                                <label className="block text-black-700 text-lg font-bold">Project Video</label>
                                <input type="file" onChange={UploadVideo} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                {!projectVideo && uploadStatus ? <h1 className='text-2xl text-red-500'>Please wait Video is Uploading...</h1> : null}
                                {projectVideo ? <h1 className='text-2xl text-green-500'>Video Uploaded Successfully..</h1> : null}
                                
                                <label htmlFor="projectDescription" className="block text-sm font-bold mb-2">Project Description</label>
                                <textarea id="projectDescription" name="projectDescription" value={formData.projectDescription} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="projectImage" className="block text-sm font-bold mb-2">Project Image</label>
                                <input type="file" id="projectImage" onChange={(e) => uploadFile(e, 'image')} accept="image/*" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="projectVideo" className="block text-sm font-bold mb-2">Project Video</label>
                                <input type="file" id="projectVideo" onChange={(e) => uploadFile(e, 'video')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default UploadProjects;
