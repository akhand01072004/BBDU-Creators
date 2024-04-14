import { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import './Sign.css';

function Projects() {
    const [projects, setProjects] = useState([]);

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

    return (
        <div>
            <nav className="flex justify-between items-center py-4 px-6 bg-blue-500 text-white">
                <h1 className="font-bold text-lg">Projects</h1>
                {/* Search functionality can be implemented here as needed */}
            </nav>
            <div className="p-4 ">
                {projects.length > 0 ? projects.map((project, index) => (
                    <div key={index} className="border p-4 m-2 flex justify-between bg-white rounded-lg shadow-md ">
                        {project.projectImage && (
                            <img src={project.projectImage} alt="Project" className=" w-80 object-cover rounded-lg" />
                        )}
                        <div className='flex flex-col w-2/3 justify-around '>
                            <h3 className=" text-3xl ">Name: {project.name}</h3>
                            <p className=" text-3xl ">Department: {project.department}</p>
                            {project.githubRepo && <a href={project.githubRepo} className="text-blue-500 hover:underline text-3xl">GitHub Repo</a>}
                            {project.projectVideo && <a href={project.projectVideo} className="text-blue-500 hover:underline">Project Video</a>}
                            <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-32'><Link to={`/projectDetail/${project._id}`} >View More</Link></button>
                        </div>
                    </div>
                )) : <p className="text-center">No projects found.</p>}
            </div>
        </div>
    );
}

export default Projects;
