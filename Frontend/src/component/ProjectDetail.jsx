import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import {ReactTyped} from "react-typed";
import './Sign.css';

export default function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [email, SetEmail] = useState('');
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/project/api/Approvedproject/${id}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setProject(data);
      SetEmail(data.email);
    } catch (error) {
      console.error("Error fetching project:", error);
      enqueueSnackbar('Facing error while fetching', { variant: 'error' });
    }
  };


  useEffect(() => {
    fetchData();
  }, [id]);  // Include `id` to refetch if the ID changes

  if (!project) {
    return <div>Loading...</div>;  // Loading state or placeholder
  }

  return (
    <>
    <div className='bg-[#0f1730] w-full h-full'>
        <h2 className='text-white ml-[45%] text-4xl font-bold'><ReactTyped className="text-2xl border-t-2 border-b-2 p-1 rounded-md border-[#4defeb]" strings={['Project Details']} typeSpeed={120} cursorChar='' /></h2>
      <div className='flex flex-row mt-6  text-white'>
          <img src={project.projectImage} alt='Project' className='w-[30%]  object-cover rounded-lg mb-2 ml-12' />
          <div className='text ml-[30%]'>
            <h1 className='text-3xl text-white font-bold mb-6 border-t-2 border-b-2 p-1 rounded-md border-[#4defeb]'>Project Owner Details </h1>
            <h2 className='text-xl  mb-4'><span className='text-[#4DEEEA] font-bold'>Name :</span> {project.name}</h2>
            <h3 className='text-xl  mb-4'><span className='text-[#4DEEEA] font-bold'>Email :</span> {project.email}</h3>
            <p className='text-xl  mb-4'><span className='text-[#4DEEEA] font-bold'>ProjectName :</span> {project.projectName}</p>
            <p className='text-xl  mb-4'><span className='text-[#4DEEEA] font-bold'>ProjectDepartment :</span> {project.department}</p>
            {project.githubRepo && <a href={project.githubRepo} className=" text-xl font-bold mb-4 text-blue-500 hover:underline">GitHub Repo</a>}<br></br>
            <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                View Profile
            </button>
          <div>
          </div>
        </div>

      </div>
      <div className='m-12 p-4 rounded-lg  flex-grow'>
        <h2 className='text-4xl text-white font-bold text-center mb-12 '><span className=' rounded-md p-2 border-t-2 border-b-2 border-[#4DEEEA]'>Project Description </span></h2>
        <p className='text-lg mb-6 text-blue-400 border-b-2 border-[#4DEEEA] p-2 rounded-md'>
        {project.projectDescription ?
          <ReactTyped className="text-2xl  rounded-md " strings={[project.projectDescription]} typeSpeed={120} cursorChar='.' /> : "No Project Description"}
        </p>  {/* Assuming 'description' is a field in the project data */}
      </div>
      </div>
    </>
  );
}
