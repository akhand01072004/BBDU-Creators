import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { ReactTyped } from "react-typed";
import './Sign.css';

export default function ProjectDetail() {
  const [project, setProject] = useState(null);
  const { id } = useParams();
  // const navigate = useNavigate();

  // const ShowUserProfile = () => {
  //   navigate('/UserPublicProfile')
  // }

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/project/api/Approvedproject/${id}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error("Error fetching project:", error);
      enqueueSnackbar('Facing error while fetching', { variant: 'error' });
    }
  };


  useEffect(() => {
    fetchData();
  }, [id]);  // Include `id` to refetch if the ID changes

  if (!project) {
    return <div className='text-4xl m-[20%] ml-[45%]'>Loading...</div>;  // Loading state or placeholder
  }

  return (
    <>
      <div className='min-h-screen upb'>
        <div className='flex justify-center text-center items-center '>
          <h2 className='text-black text-2xl md:text-5xl font-bold mt-4'><ReactTyped className="text-2xl md:text-4xl border-t-2 border-b-2 p-1 rounded-md border-black" strings={['Project Details']} typeSpeed={120} cursorChar='' /></h2>

        </div>
<<<<<<< HEAD
        <div className='p-4 m-4 bg-white text-black rounded-lg shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] h-80 w-full flex justify-between'>
          <div>
            <h1 className='text-3xl font-bold mb-6'>Project Owner Details </h1>
            <h2 className='text-xl  mb-4'>Name: {project.name}</h2>
            <h3 className='text-xl  mb-4'>Email: {project.email}</h3>
            <p className='text-xl  mb-4'>Project Name: {project.projectName}</p>
            <p className='text-xl  mb-4'>Department: {project.department}</p>

            {project.githubRepo && <a href={project.githubRepo} className=" text-xl font-bold mb-4 text-blue-500 hover:underline">GitHub Repo</a>}
          </div>
          <div>
            <div className="flex flex-col items-center p-4 ">
              <div className="w-40 h-40 rounded-full bg-blue-300 flex items-center justify-center text-white text-lg font-bold mb-8 border-2 border-black">
                <p className='text-6xl'>S</p>
              </div>
              {/* <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                View Profile
              </button> */}
=======
        <div className='flex flex-col md:flex-row m-8  text-blue-500  justify-between '>
          <div className="flex flex-col md:flex-row justify-center items-center md:w-2/3 mx-auto gap-4">
            <div className="flex flex-col items-center mb-4 md:mb-0 border-2 border-black rounded-lg">
              <img
                src={project.projectImage}
                alt='Project'
                className='w-80 h-56 md:w-96 md:h-72 object-cover rounded-lg'
              />
            </div>
            <div className="flex flex-col items-center border-2 border-black rounded-lg">
              <video
                src={project.projectVideo}
                controls
                className='w-80 h-56 md:w-96 md:h-72 rounded-lg'
              ></video>
>>>>>>> 1eb59ef5108eb05f8b7643cc1289eea4265dd058
            </div>
          </div>

          <div className='flex flex-col md:w-1/3 mt-4 '>
            <h1 className='text-3xl text-black font-bold mb-6 border-t-2 border-b-2 p-1 rounded-md border-black'>Project Owner Details </h1>
            <h2 className='text-xl text-black  mb-4'><span className='text-black font-bold'>Name :</span> {project.name}</h2>
            <h3 className='text-xl text-black   mb-4'><span className='text-black font-bold'>Email :</span> {project.email}</h3>
            <p className='text-xl text-black  mb-4'><span className='text-black font-bold'>ProjectName :</span> {project.projectName}</p>
            <p className='text-xl text-black   mb-4'><span className='text-black font-bold'>School :</span> {project?.school}</p>
            <p className='text-xl text-black   mb-4'><span className='text-black font-bold'>Course :</span> {project?.course}</p>
            {project.githubRepo && <a href={project.githubRepo} className=" text-xl font-bold mb-4 text-blue-500 hover:underline ">GitHub Repo</a>}<br></br>
            <Link to={`/UserPublicProfile/${project.email}`} className=" w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              View Profile
            </Link>


          </div>

        </div>

        <div className='m-12 p-4 rounded-lg  flex-grow'>
          <h2 className='text-2xl md:text-4xl text-black font-bold text-center mb-12 '><span className=' rounded-md p-2 border-t-2 border-b-2 border-black'>Project Description </span></h2>
          <p className='text-lg mb-6  text-black border-b-2 border-black p-2 rounded-md'>
            {project?.projectDescription}
          </p>  {/* Assuming 'description' is a field in the project data */}
        </div>
      </div>
    </>
  );
}
