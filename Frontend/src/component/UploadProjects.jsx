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
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectName: '',
        school: '',
        course: '',
        githubRepo: '',
        projectDescription: '',
        projectImage: '',
        projectVideo: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (event, field) => {
        const file = event.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ml_default");
        data.append("cloud_name", "dl81ig8l5");

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/dl81ig8l5/${field}/upload`, {
                method: "POST",
                body: data
            });
            const result = await response.json();
            setFormData(prev => ({ ...prev, [field]: result.url }));
        } catch (error) {
            console.error("Failed to upload file", error);
            enqueueSnackbar('Failed to upload file.', { variant: 'error' });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 upb">
            <div className="bg-white p-8 rounded-lg shadow w-full max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-6">Upload Project</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Text inputs */}
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name" type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">Project Name</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="projectName" type="text" name="projectName" value={formData.projectName} onChange={handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="school">School</label>
                                <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="school" name="school" value={formData.school} onChange={handleChange} required>
                                    <option value="">Select School</option>
                                    {Object.keys(schoolsAndCourses).map(school => (
                                        <option key={school} value={school}>{school}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course">Course</label>
                                <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="course" name="course" value={formData.course} onChange={handleChange} disabled={!formData.school}>
                                    <option value="">Select Course</option>
                                    {schoolsAndCourses[formData.school]?.map(course => (
                                        <option key={course} value={course}>{course}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            {/* GitHub Repo Input shown based on the selected school */}
                            {(formData.school === "SCHOOL OF ENGINEERING" || formData.school === "SCHOOL OF COMPUTER APPLICATIONS") && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="githubRepo">GitHub Repository</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="githubRepo" type="url" name="githubRepo" value={formData.githubRepo} onChange={handleChange} />
                                </div>
                            )}
                            {/* Project Description input */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectDescription">Project Description</label>
                                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="projectDescription" name="projectDescription" value={formData.projectDescription} onChange={handleChange} required rows="4"></textarea>
                            </div>

                            {/* Year of Submission input */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yearOfSubmission">Year of Submission</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="yearOfSubmission" type="number" name="yearOfSubmission" value={formData.yearOfSubmission} onChange={handleChange} required />
                            </div>

                            {/* File inputs */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Project Image</label>
                                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'projectImage')}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Project Video</label>
                                <input type="file" onChange={(e) => handleFileChange(e, 'projectVideo')}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    
                            </div>
                        </div>
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
