import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { ReactTyped } from 'react-typed';
4
export default function Projectdetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  // const navigate = useNavigate();

  // const ShowUserProfile = () => {
  //   navigate('/UserPublicProfile')
  // }

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/project/api/project/${id}`);
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
          <h2 className='text-black text-2xl md:text-5xl font-bold mt-7'><ReactTyped className="text-4xl border-t-2 border-b-2 p-1 rounded-md border-blue-500" strings={['Project Details']} typeSpeed={120} cursorChar='' /></h2>

        </div>
        <div className='flex flex-col md:flex-row m-8  text-blue-500  justify-between '>
          <div className="flex flex-col md:flex-row justify-center items-center md:w-2/3 mx-auto gap-4">
            <div className="flex flex-col items-center mb-4 md:mb-0 border-2 border-black rounded-lg">
              <img
                src={project.projectImage}
                alt='Project'
                className='w-80 h-56 md:w-80 md:h-56 object-cover rounded-lg'
              />
            </div>
            <div className="flex flex-col items-center border-2 border-black rounded-lg">
              <video
                src={project.projectVideo}
                controls
                className='w-80 h-56 md:w-80 md:h-56 rounded-lg'
              ></video>
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
          <p className='text-lg mb-6 text-black border-b-2 border-black p-2 rounded-md'>
            {project.projectDescription ?
              <ReactTyped className="text-xl  rounded-md " strings={[project.projectDescription]} typeSpeed={0} cursorChar='.' /> : "No Project Description"}
          </p>  {/* Assuming 'description' is a field in the project data */}
        </div>
      </div>
    </>
  )
}
