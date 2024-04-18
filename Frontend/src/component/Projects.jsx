import { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import './Sign.css';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch projects from the backend when the component mounts
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:3000/project/api/Approvedprojects');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setProjects(data);
                if (response.status === 200) {
                    enqueueSnackbar('Project Fetch Successfully', { variant: 'success' });
                } else {
                    enqueueSnackbar('Not Uploaded', { variant: 'error' });
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []); // The empty dependency array ensures this effect runs once on mount

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <nav className="flex justify-between items-center py-4 px-6 bg-blue-500 text-white">
                <h1 className="font-bold text-lg">Projects</h1>
                <div className="relative">
                    <input
                        type="text"
                        className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                    />
                    <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
                        <i className="fa fa-search text-gray-600"></i>
                    </button>
                </div>
            </nav>
            <div className="p-4 grid grid-cols-2 gap-4">
                {filteredProjects.length > 0 ? filteredProjects.map((project, index) => (
                    <div key={index} className="border p-4 bg-white rounded-lg shadow-md flex">
                        <div>
                            {project.projectImage && (
                                <img src={project.projectImage} alt="Project" className="w-80 object-cover rounded-lg mb-2 " />
                            )}

                        </div>

                        <div className='flex flex-col ml-10 justify-between'>
                            <div>
                                <h3 className="text-2xl mb-3">Name: {project.name}</h3>
                                <p className="text-2xl mb-3">Department: {project.department}</p>
                                {project.githubRepo && <a href={project.githubRepo} className="text-blue-500 hover:underline text-2xl mb-10">GitHub Repo</a>}
                                {project.projectVideo && <a href={project.projectVideo} className="text-blue-500 hover:underline">Project Video</a>}

                            </div>
                            <div className='flex justify-center '>
                                <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-32'>
                                    <Link to={`/projectDetail/${project._id}`}>View More</Link>
                                </button>

                            </div>


                        </div>
                    </div>
                )) : <p className="text-center">No projects found.</p>}
            </div>
        </div>
    );
}

export default Projects;
