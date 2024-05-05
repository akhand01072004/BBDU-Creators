import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaVideo, FaGithub } from "react-icons/fa";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [school, setSchool] = useState('');
    const [course, setCourse] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:3000/project/api/Approvedprojects');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setProjects(data);
                // if (response.status === 200) {
                //     enqueueSnackbar('Project Fetch Successfully', { variant: 'success' });
                // } else {
                //     enqueueSnackbar('Not Uploaded', { variant: 'error' });
                // }
            } catch (error) {
                console.error("Error fetching projects:", error);
                enqueueSnackbar('Failed to fetch projects', { variant: 'error' });
            }
        };
        fetchProjects();
    }, []);

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleSchoolChange = (e) => setSchool(e.target.value);
    const handleCourseChange = (e) => setCourse(e.target.value);
    const handleYearChange = (e) => setYear(e.target.value);

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (school ? project.school === school : true) &&
        (course ? project.course === course : true) &&
        (year ? project.year === year : true)
    );

    return (
        <div>
            <nav className="flex justify-between items-center py-4 px-6 bg-blue-500 text-white">
                <h1 className="font-bold text-lg">Projects</h1>
                <div className="relative w-full max-w-xs">
                    <input
                        type="text"
                        className="w-full bg-white text-black h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                    />
                    <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
                        <i className="fa fa-search text-gray-600"></i>
                    </button>
                </div>
            </nav>
            <div className="p-4">
                <div className="flex gap-4 mb-4 justify-center">
                    <select value={school} onChange={handleSchoolChange} className="p-2 rounded">
                        <option value="">All Schools</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Business">Business</option>
                        <option value="Arts">Arts</option>
                    </select>
                    <select value={course} onChange={handleCourseChange} className="p-2 rounded">
                        <option value="">All Courses</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Project Management">Project Management</option>
                    </select>
                    <select value={year} onChange={handleYearChange} className="p-2 rounded">
                        <option value="">All Years</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProjects.length > 0 ? filteredProjects.map((project, index) => (
                        <div key={index} className="border-2 p-4 bg-white rounded-lg shadow-lg flex flex-col md:flex-row">
                            <div className="flex flex-row md:flex-col md:w-3/4 rounded-lg">
                                <img src={project.projectImage || 'path/to/default-placeholder.png'} alt="Project" className="object-cover rounded-lg w-full md:w-auto md:h-48" />
                                {project.projectVideo ? (
                                    <Link to={project.projectVideo} className="w-1/4 md:w-full border-l-2 md:border-l-0 md:border-t-2 flex justify-center items-center">
                                        <FaVideo className='w-8 h-8' />
                                    </Link>
                                ) : (
                                    <div className="w-1/4 md:w-full border-l-2 md:border-l-0 md:border-t-2 flex justify-center items-center text-gray-500">
                                        Video Not Added
                                    </div>
                                )}
                            </div>
                            <div className='flex flex-col ml-4 justify-between flex-grow'>
                                <div>
                                    <h3 className="text-xl md:text-lg mb-1">Name: {project.name}</h3>
                                    <p className="text-md md:text-lg mb-1">Department: {project.department}</p>
                                    {project.githubRepo && (
                                        <div className="flex items-center">
                                            <p className='mr-2 text-lg'>GitHub: </p><FaGithub className='w-5 h-5 text-blue-500 hover:text-blue-700' />
                                        </div>
                                    )}
                                </div>
                                <Link to={`/projectDetail/${project._id}`} className="self-center bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 md:mt-auto w-full md:w-32">
                                    View More
                                </Link>
                            </div>
                        </div>
                    )) : <p className="h-screen text-center">No projects found.</p>}
                </div>
            </div>
        </div>
    );
}

export default Projects;
