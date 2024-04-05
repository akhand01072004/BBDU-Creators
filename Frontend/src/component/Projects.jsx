import { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';

function Projects() {
    const [projects, setProjects] = useState([]);

    // Fetch projects from the backend when the component mounts
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:3000/user/api/projects'); // Ensure the URL matches your server's endpoint
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setProjects(data);
                if(response.status === 200){
                    enqueueSnackbar('Project Fetch Successfully', {variant: 'success'})
                }else{
                    enqueueSnackbar('Not Uploaded', {variant: 'error'})
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
            <div className="p-4">
                {projects.length > 0 ? projects.map((project, index) => (
                    <div key={index} className="border p-4 m-2 flex justify-between bg-white rounded-lg shadow">
                        <div>
                            <h2 className="font-bold">{project.projectName}</h2>
                            <p>Name: {project.name}</p>
                            <p>Department: {project.department}</p>
                            {project.githubRepo && <a href={project.githubRepo} className="text-blue-500 hover:underline">GitHub Repo</a>}
                            {project.projectVideo && <a href={project.projectVideo} className="text-blue-500 hover:underline block">Project Video</a>}
                        </div>
                        {project.projectImage && (
                            <img src={project.projectImage} alt="Project" className="w-24 h-24 object-cover rounded-lg" />
                        )}
                    </div>
                )) : <p className="text-center">No projects found.</p>}
            </div>
        </div>
    );
}

export default Projects;
