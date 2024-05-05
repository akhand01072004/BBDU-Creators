import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

const schoolsAndCourses = {
  "SCHOOL OF ENGINEERING": ["B.TECH (CSE)", "B.TECH (CSE-AI)", "B.TECH (CSE-CCML)", "B.TECH (CSE-IOTBC)", "M. TECH (COMPUTER NETWORK)", "M. TECH (SOFTWARE ENGINEERING)", "PH.D (CSE)"],
  "SCHOOL OF MANAGEMENT": ["B.COM. (HONS.)", "BBA", "BBA (LOGISTICS AND SUPPLY CHAIN MANAGEMENT)", "BBA - BUSINESS ANALYTICS (IN COLLABORATION WITH IBM)", "MBA", "PH.D", "IMBA"],
  // Include other schools with their courses
};

const UploadProjects = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectName: '',
        school: '',
        course: '',
        yearOfSubmission: '',
        githubRepo: '',
        projectDescription: '',
        projectImage: '',
        projectVideo: ''
    });

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
            const result = await response.json();
            setFormData(prev => ({
                ...prev,
                [type === 'image' ? 'projectImage' : 'projectVideo']: result.url
            }));
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
        console.log('Submitting form with data:', formData); // Debugging log
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

    const showGitHubField = formData.school === "SCHOOL OF COMPUTER APPLICATIONS" || formData.school === "SCHOOL OF ENGINEERING";

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-3xl mb-5 text-center font-bold">Upload Project</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name, Email, ProjectName input fields remain unchanged... */}
                    
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
                            {schoolsAndCourses[formData.school]?.map(course => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </select>
                    </div>

                    {showGitHubField && (
                        <div className="mb-4">
                            <label htmlFor="githubRepo" className="block text-sm font-bold mb-2">GitHub Repository</label>
                            <input type="url" id="githubRepo" name="githubRepo" value={formData.githubRepo} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    )}

                    {/* Remaining form fields like Year of Submission, Project Description, Image and Video uploads, Submit button */}
                </form>
            </div>
        </div>
    );
};

export default UploadProjects;
