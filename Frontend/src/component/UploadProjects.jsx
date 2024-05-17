import { useState } from 'react';
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
    const [school, setSchool] = useState('');
    const [course, setCourse] = useState('');
    const [yearOfSubmission, setYear] = useState('');
    const [githubRepo, setGithubRepo] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectImage, setProjectImage] = useState('');
    const [projectVideo, setProjectVideo] = useState('');
    // const [showGitHub, setShowGitHub] = useState(false);

    const [uploadStatus, setUploadStatus] = useState(false);

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData(prev => ({ ...prev, [name]: value }));
    // };

    const UploadImage = async (event) => {
        const file = event.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ml_default");
        data.append("cloud_name", "dl81ig8l5")
        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dl81ig8l5/image/upload', {
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
        data.append("cloud_name", "dl81ig8l5")
        setUploadStatus(true);
        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dl81ig8l5/video/upload', {
                method: "POST",
                body: data
            });
            const resp = await response.json();
            setProjectVideo(resp.url);
            setUploadStatus(false);
        } catch (error) {
            console.log("failed to upload");
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            name: name,
            email: email,
            projectName: projectName,
            school: school,
            course: course,
            projectDescription: projectDescription,
            githubRepo: githubRepo,
            projectImage: projectImage,
            projectVideo: projectVideo,
            yearOfSubmission: yearOfSubmission
        }

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
            if (response.status === 201) {
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
                                    id="name" type="text" name="name" onChange={(e) => {setName(e.target.value)}} required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email" type="email" name="email" onChange={(e) => {setEmail(e.target.value)}} required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">Project Name</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="projectName" type="text" name="projectName" onChange={(e) => {setProjectName(e.target.value)}} required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="school">School</label>
                                <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="school" name="school" onChange={(e) => {setSchool(e.target.value)}} required>
                                    <option value="">Select School</option>
                                    {Object.keys(schoolsAndCourses).map(school => (
                                        <option key={school} value={school}>{school}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course">Course</label>
                                <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="course" name="course" onChange={(e) => {setCourse(e.target.value)}} disabled={!school}>
                                    <option value="">Select Course</option>
                                    {schoolsAndCourses[school]?.map(course => (
                                        <option key={course} value={course}>{course}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            {/* GitHub Repo Input shown based on the selected school */}
                            {(school === "SCHOOL OF ENGINEERING" || school === "SCHOOL OF COMPUTER APPLICATIONS") && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="githubRepo">GitHub Repository</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="githubRepo" type="url" name="githubRepo" onChange={(e) => {setGithubRepo(e.target.value)}} />
                                </div>
                            )}
                            {/* Project Description input */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectDescription">Project Description</label>
                                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="projectDescription" name="projectDescription" onChange={(e) => {setProjectDescription(e.target.value)}} required rows="4"></textarea>
                            </div>

                            {/* Year of Submission input */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yearOfSubmission">Year of Submission</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="yearOfSubmission" type="number" name="yearOfSubmission" onChange={(e) => {setYear(e.target.value)}} required />
                            </div>

                            {/* File inputs */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Project Image</label>
                                <input type="file" accept="image/*" onChange={UploadImage}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Project Video</label>
                                <input type="file" onChange={UploadVideo} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                {!projectVideo && uploadStatus ? <h2 className='text-2xl m-1 text-red-500'>Please wait Video is Uploading...</h2> : null}
                                {projectVideo ? <h2 className='text-2xl m-1 text-green-500'>Video Uploaded Successfully..</h2> : null}
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
