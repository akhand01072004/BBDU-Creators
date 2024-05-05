import { useState, useEffect } from 'react';
// import { MdOutlineEmail } from "react-icons/md";


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

  const aboutText = admin.about || `As a part of the ${admin.department} department, our goal is to enhance user experiences by ensuring seamless integration and functionality across platforms. We strive to push the boundaries of what is possible, transforming challenges into solutions that drive our mission forward.`;
  const experienceText = admin.experience || `With extensive experience in the ${admin.department} field, our focus remains on innovative approaches to tackle the evolving challenges of today's digital landscape, ensuring robust and efficient system performance.`;

  return (
    <div className="min-h-screen w bg-white flex justify-center items-start p-4">
      <div className="flex flex-col  gap-4 w-full md:max-w-8xl rounded-4xl shadow-[0px_20px_20px_10px_#00000024] ">
        {/* First Column */}
        <div className="flex flex-col w-full  md:flex-row items-center justify-center bg-white  p-4 md:p-8 ">
          <div className="w-full md:w-1/3 flex justify-center">
            <span className='text-6xl w-64 h-64 md:w-72 md:h-72 rounded-full bg-gray-300 flex items-center justify-center mb-4 object-cover border-4 border-blue-500 shadow-xl'>{admin.name?.[0]}</span>

            
          </div>

          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-2xl md:text-5xl font-bold">Hi there, My name is <span className='text-blue-600'>{admin.name}</span></h2>
            <p className="mt-4 text-lg md:text-base">
              I am Teacher at Babu Banarsi Das University from the department of {admin.department}.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center bg-white">

          <h1 className="text-3xl md:text-5xl font-bold my-2">About Me</h1>
          <div className='md:flex md:flex-row flex flex-col justify-center'>
            <div className="flex flex-col justify-center text-start gap-2 m-8 ">
            <p>{aboutText}</p>
            </div>
            <div>
              <img src={male} alt="" className='h-96' />
            </div>

          </div>
        </div>
        <div className="flex flex-col items-center  rounded-2xl bg-white-100 ">
          <h1 className="text-4xl md:text-5xl font-bold my-2">Experiance</h1>
          
            <div  className="bg-white p-4 rounded-lg flex justify-between shadow-md w-full md:w-3/5 mb-4">
              <p>{experienceText}</p>
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
