import { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Link } from 'react-router-dom';

const ManageProject = () => {
    const [projects, setProjects] = useState([]);
    // Fetch projects from the backend when the component mounts
    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:3000/project/api/projects'); // Ensure the URL matches your server's endpoint
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
    useEffect(() => {
        fetchProjects();
    }, []); // The empty dependency array ensures this effect runs once on mount

    //Approved Project
    const Approve = async(id) => {
        try {
            const data = await fetch(`http://localhost:3000/project/api/project/${id}`);
            const proj = await data.json();
            const emailbody = {
                emailto : proj.email,
                name : proj.name
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
        if(!resp){
            enqueueSnackbar('Project Approved', {variant: 'success'})
        }
        } catch (error) {
            console.log("facing error while uploading")
        }
    }

    //Reject projects
    const RejectProject = async(id) => {
        try {
            const response = await fetch(`http://localhost:3000/project/api/deleteProject/${id}`,{
                method : 'DELETE',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            fetchProjects();
            if(response.status === 200){
                enqueueSnackbar('', {variant: 'success'})
              }else{
                enqueueSnackbar('Facing error while deleting', {variant: 'error'})
            }
        } catch (error) {
            console.log("facing error while deleting")
        }
    }

    return (
        <div>
        <nav className="flex justify-between items-center py-4 px-6 bg-blue-500 text-white">
        <h1 className="font-bold text-lg">Manage Projects</h1>
        {/* Search functionality can be implemented here as needed */}
    </nav>
    <div className="p-4">
        {projects.length > 0 ? projects.map((project, index) => (
            <div key={index} className="border p-4 m-2 flex justify-between bg-white rounded-lg shadow">
                <div className='flex flex-col'>
                    {/* <h2 className="font-bold"></h2> */}
                    <p>Name: {project.name}</p>
                    <p>Department: {project.department}</p>
                    {project.githubRepo && <a href={project.githubRepo} className="text-blue-500 hover:underline">GitHub Repo</a>}
                    {project.projectVideo && <a href={project.projectVideo} className="text-blue-500 hover:underline block">Project Video</a>}
                    <Link to={`/projectDetail/${project._id}`} className='hover:text-rose-500 font'>View More</Link>
                    <div className='flex gap-2'>
                        <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            Approve(project._id);
                        }}
                        className='bg-green-500 text-white p-1 rounded-md'>Accept</button>
                        <button  onClick={(e) => {
                            e.stopPropagation();
                            RejectProject(project._id)
                        }} className='bg-rose-500 text-white p-1 rounded-md'>Reject</button>
                    </div>
                </div>
            </div>
        )) : <p className="text-center">No projects found.</p>}
        </div>
        </div>
    );
}

export default ManageProject;
