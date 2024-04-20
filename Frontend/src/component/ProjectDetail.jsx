import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
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
      enqueueSnackbar('Project fetched successfully', { variant: 'success' });
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
    <div className='bg-blue-300'>
      <div className='m-4 p-4 bg-white rounded-lg shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] flex-grow text-center'>

        <h2 className='text-4xl font-bold'>Project Details</h2>

      </div>
      <div className='flex flex-col md:flex-row  text-white'>
        <div className='m-4 p-4 bg-white rounded-lg shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]   w-96 h-80'>

          <img src={project.projectImage} alt='Project' className='w-64  object-cover rounded-lg mb-2' />
          <p className='text-blue-900 text-2xl font-bold text-center'> {project.projectName}</p>
        </div>
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
                <p className='text-6xl'>{email[0].toUpperCase()}</p>
              </div>
              <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                View Profile
              </button>
            </div>
          </div>

        </div>

      </div>
      <div className=' m-4 p-4 bg-white rounded-lg  flex-grow  shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] '>
        <h2 className='text-4xl font-bold text-center mb-12'>Project Description</h2>
        <p className='text-lg'>
          Design and Display:
          The Samsung Galaxy S series has consistently pushed the boundaries of smartphone design, and the Samsung S25 is likely to continue this tradition. We can expect the S25 to feature a more refined and possibly even more streamlined design than its predecessors. As display technology continues to evolve, the S25 might boast a Dynamic AMOLED display with a 120Hz or higher refresh rate for ultra-smooth scrolling and responsiveness. The display could also support HDR10+ for superior color accuracy and contrast. Expect a nearly bezel-less experience with under-display camera technology becoming more mature, eliminating the punch-hole camera seen in earlier models, providing a truly immersive viewing experience.

          Performance:
          Under the hood, the Samsung S25 would likely be powered by the latest Qualcomm Snapdragon system-on-chip or Samsung’s own Exynos chipset, depending on the region. These chipsets would not only offer superior performance for general tasks and gaming but also be optimized for better power efficiency and heat management. With 5G technology becoming standard, the S25 would naturally support both mmWave and sub-6 GHz frequencies, ensuring blazing-fast internet speeds wherever 5G is available.

          Camera Capabilities:
          Camera technology in smartphones is one of the most rapidly advancing features, and Samsung has often been at the forefront. For the S25, we can anticipate a multi-lens setup that includes a high-resolution main sensor (108MP or higher), an ultra-wide lens, and a periscopic telephoto lens with improved optical and digital zoom capabilities. Advances might include better night photography, more sophisticated AI-driven photo optimization, and enhanced video recording features such as 8K resolution at higher frame rates.

          Battery and Charging:
          Battery life is a critical aspect of user experience. The S25 could feature a large battery (5000mAh or more) with super-fast charging technology both wired and wireless. Samsung could also improve on its reverse wireless charging, allowing the S25 to efficiently charge other devices like earbuds and smartwatches.

          Software and Ecosystem:
          With the Samsung S25, software would also see enhancements. Running on the latest version of Android, Samsung’s One UI would offer a clean, user-friendly interface with additional customizations and privacy features. Integration with the wider Samsung ecosystem, including SmartThings for home automation, Samsung DeX for desktop experiences, and better connectivity with Windows PCs and other Samsung devices, would be more seamless than ever.

          Sustainability Initiatives:
          As sustainability becomes increasingly important, Samsung may focus more on using recycled materials and offering more energy-efficient features. This could also extend to packaging and the company's overall carbon footprint.

          Innovative Features:
          In line with Samsung’s history of innovation, the S25 could introduce new features such as advanced health monitoring technologies integrated into the smartphone. This might include more sophisticated sensors for measuring aspects like blood pressure, heart rate variability, and even blood glucose levels.
        </p>  {/* Assuming 'description' is a field in the project data */}
      </div>
      </div>
    </>
  );
}
