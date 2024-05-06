import { useState, useEffect } from 'react';
// import { MdOutlineEmail } from "react-icons/md";
import exp from '../../assets/admin-profile-experiance.jpg'
import Img from '../../assets/Admin-icon.jpg'
import abt from '../../assets/about-admin.jpg'
import { Link } from 'react-router-dom';


const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/validatetoken', {
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch admin details');
      }
      const adminData = await response.json();
      setAdmin(adminData);
    } catch (error) {
      console.error(error);
      setError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!admin) return <div>No admin data available.</div>;

  const aboutText = admin.about || `As a part of the ${admin.department} department, our goal is to enhance user experiences by ensuring seamless integration and functionality across platforms. We strive to push the boundaries of what is possible, transforming challenges into solutions that drive our mission forward.
  As the Head of the Department at BBD University, I am dedicated to fostering an environment of excellence and innovation.
   With extensive experience in both academia and industry, I am committed to enhancing the quality of our educational programs and ensuring that they remain at the forefront of technological and methodological advancements. 
   I am passionate about mentoring the next generation of leaders and continuously strive to improve our department's impact and outreach`;
  const experienceText = admin.experience || `With extensive experience in the ${admin.department} field, our focus remains on innovative approaches to tackle the evolving challenges of today's digital landscape, ensuring robust and efficient system performance.`;

  return (
    <div className="min-h-screen w bg-white flex justify-center items-start p-4">
      <div className="flex flex-col  gap-4 w-full md:max-w-8xl rounded-4xl  ">
        <div className='w-full flex justify-end mt-4 mr-3'>
          <div>
            <Link to='/EditAdmin' className='self-center bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 md:mt-auto w-full md:w-24'> Edit Profile</Link>
          </div>
        </div>
        {/* First Column */}
        <div className="flex flex-col w-full  md:flex-row items-center justify-center bg-white  p-4 md:p-8 ">
          <div className="w-full md:w-1/3 flex justify-center">
            <img src={Img} alt="Profile" className="w-64 h-64 md:w-72 md:h-72 rounded-full object-cover border-4 border-blue-500 shadow-xl" />
          </div>

          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-2xl md:text-5xl font-bold">Hi there, My name is <span className='text-blue-600'>{admin.name}</span></h2>
            <p className="mt-4 text-lg md:text-xl">
              I am Teacher at Babu Banarsi Das University from the department of {admin.department}.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center bg-white">

          <h1 className="text-3xl md:text-5xl font-bold my-2">About Me</h1>
          <div className='md:flex md:flex-row flex flex-col justify-center'>
            <div className="flex flex-col justify-center text-start gap-2 ml-6 md:w-2/4 ">
              <p className='text-lg'>{aboutText}</p>
            </div>
            <div className='md:w-2/4 '>
              <img src={abt} alt="" className='md:h-full' />
            </div>

          </div>
        </div>
        <div className="flex flex-col  items-center  rounded-2xl bg-white-100 ">
          <h1 className="text-4xl md:text-5xl font-bold my-2">Experience</h1>
          <div className='md:flex md:flex-row flex flex-col justify-center'>
            <div className='md:w-2/4 '>
              <img src={exp} alt="" className='h-96' />
            </div>
            <div className="flex flex-col justify-center text-start gap-2 m-8 md:w-2/4">
              <p className='text-lg'>{experienceText}</p>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
