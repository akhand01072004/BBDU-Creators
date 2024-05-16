import { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Link } from 'react-router-dom';

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

const ManageProject = () => {
    const [projects, setProjects] = useState([]);
    const [school, setSchool] = useState('');
    const [course, setCourse] = useState('');
    const [coursesOptions, setCoursesOptions] = useState([]);
    const [year, setYear] = useState('');


    // Fetch projects from the backend when the component mounts
    const fetchProjects = async () => {
        try {
            const response = await fetch('https://bbdu-backend-2.onrender.com/project/api/projects'); 

            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };
    useEffect(() => {
        fetchProjects();
    }, []); // The empty dependency array ensures this effect runs once on mount

    useEffect(() => {
        if (school) {
            setCoursesOptions(schoolsAndCourses[school] || []);
        } else {
            setCoursesOptions([]);
        }
    }, [school]);


    const handleSchoolChange = (e) => {
        setSchool(e.target.value);
        setCourse(''); // Reset course when school changes
    };
    const handleCourseChange = (e) => setCourse(e.target.value);
    const handleYearChange = (e) => setYear(e.target.value);

    const filteredProjects = projects.filter(project =>

        (school ? project.school === school : true) &&
        (course ? project.course === course : true) &&
        (year ? project.yearOfSubmission === year : true)
    );





    const Approve = async (id) => {
        try {
            const data = await fetch(`https://bbdu-backend-2.onrender.com/project/api/project/${id}`);
            const proj = await data.json();
            const emailbody = {
                emailto: proj.email,
                name: proj.name
            }
            const resp = await fetch('http://localhost:3000/project/api/ApproveProject', {
            method: 'POST',
            body: JSON.stringify(proj),
            headers: {
            "Content-Type":"application/json"
            },
        });
         //send email to the student if his/her project get approved
         const response = await fetch('http://localhost:3000/project/SendProjectStatusEmail',{
            method: "POST",
            body: JSON.stringify(emailbody),
            headers: {
                "Content-Type":"application/json"
            }
        })
        if(response.status === 201){
            enqueueSnackbar('Email Sent', {variant: 'success'})
        }


            RejectProject(id);
            if (!resp) {
                enqueueSnackbar('Project Approved', { variant: 'success' })
            }
        } catch (error) {
            console.log("facing error while uploading")
        }
    }

    const RejectProject = async (id) => {
        try {
            const response = await fetch(`https://bbdu-backend-2.onrender.com/project/api/deleteProject/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            fetchProjects();
            if (response.status === 200) {
                enqueueSnackbar('Project Deleted Successfully', { variant: 'success' })
            } else {
                enqueueSnackbar('Facing error while deleting', { variant: 'error' })
            }
        } catch (error) {
            console.log("Facing error while deleting")
        }
    }
    return (
        <div>
            <nav className="flex justify-between items-center py-4 px-6 bg-blue-500 text-white">
                <h1 className="font-bold text-lg">Manage Projects</h1>
            </nav>
            <div className='p-4'>
            <div className="flex flex-wrap gap-4 mb-4 justify-center">
                    <select value={school} onChange={handleSchoolChange} className="p-2 rounded bg-white">
                        <option value="">All Schools</option>
                        {Object.keys(schoolsAndCourses).map(key => (
                            <option key={key} value={key}>{key}</option>
                        ))}
                    </select>
                    <select value={course} onChange={handleCourseChange} className="p-2 rounded bg-white" disabled={!school}>
                        <option value="">Select Course</option>
                        {coursesOptions.map(course => (
                            <option key={course} value={course}>{course}</option>
                        ))}
                    </select>
                    <select value={year} onChange={handleYearChange} className="p-2 rounded bg-white">
                        <option value="">All Years</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredProjects.length > 0 ? filteredProjects.map((project, index) => (
                        <div key={index} className="border p-4 bg-white rounded-lg shadow">
                            <div className='flex flex-col'>
                                <p><strong>Name:</strong> {project.name}</p>
                                <p><strong>Department:</strong> {project.school}</p>
                                {project.githubRepo && <a href={project.githubRepo} className="text-blue-500 hover:underline">GitHub Repo</a>}
                                {/* {project.projectVideo && <a href={project.projectVideo} className="text-blue-500 hover:underline">Project Video</a>} */}
                                <Link to={`/Dashboard/Manageprojectdetail/${project._id}`} className='text-rose-500 hover:text-rose-700'>View More</Link>
                                <div className='flex gap-2 mt-2'>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            Approve(project._id);
                                        }}
                                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Accept</button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            RejectProject(project._id)
                                        }}
                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Reject</button>
                                </div>
                            </div>
                        </div>
                    )) : <p className="text-center">No projects found.</p>}
                </div>
            </div>
        </div>

    );
}

export default ManageProject;
