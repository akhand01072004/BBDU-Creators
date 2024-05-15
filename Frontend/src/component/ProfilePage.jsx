import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Img from "../assets/male.png"
import male from "../assets/about-male-bg.jpg"
import './Sign.css';

const ProfilePage = () => {

    const [user, SetUser] = useState('');
    const UserDetail = async () => {
        try {
            const resp = await fetch('http://localhost:3000/users/validatetoken', {
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const userdata = await resp.json();
            SetUser(userdata);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(user)
    useEffect(() => {
        UserDetail();
    }, [])

    return (
        <div className="min-h-screen w bg-white flex justify-center items-start p-4">

            <div className="flex flex-col  gap-4 w-full md:max-w-8xl rounded-4xl  ">
                <div className='w-full flex justify-end mt-4 mr-3'>
                    <div>
                        <Link to='/EditUser' className='self-center bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 md:mt-auto w-full md:w-24'> Edit Profile</Link>
                    </div>
                </div>
                {/* First Column */}
                <div className="flex flex-col w-full  md:flex-row items-center justify-center bg-white  p-4 md:p-8 ">
                    <div className="w-full md:w-1/3 flex justify-center">
                        {user?.imageurl  ? <img src={Img} alt='avatar'/> :
                        <img src={user?.userimage} alt="Profile" className="w-64 h-64 md:w-72 md:h-72 rounded-full object-cover border-4 border-blue-500 shadow-xl" />}
                    </div>

                    <div className="w-full md:w-2/3 text-center md:text-left">
                        <h2 className="text-2xl md:text-5xl font-bold">Hi there, My name is <span className='text-blue-600'>{user.name}</span></h2>
                        <p className="mt-4 md:text-xl">
                            {user?.about} {user.school}. .
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-white">

                    <h1 className="text-3xl md:text-5xl font-bold my-2">About Me</h1>
                    <div className='md:flex md:flex-row flex flex-col justify-center'>
                        <div className="flex flex-col justify-center text-start gap-2 m-8 md:w-2/4 ">
                            <p className=' text-xl md:text-2xl'><strong className='text-blue-600 text-xl md:text-2xl'>School:</strong> {user.school}</p>
                            <p className='text-xl md:text-2xl'><strong className='text-blue-600 '>Course:</strong> {user.course}</p>
                            <p className='text-xl md:text-2xl'><strong className='text-blue-600 '>Duration:</strong> {user.duration}</p>
                            <p className='text-xl md:text-2xl'><strong className='text-blue-600 '>Email:</strong> {user.email}</p>
                        </div>
                        <div className='md:w-2/4'>
                            <img src={male} alt="" className='h-96' />
                        </div>

                    </div>
                </div>
                <div className="flex flex-col items-center  rounded-2xl bg-white-100 ">
                    <h1 className="text-4xl md:text-5xl font-bold my-2">Projects</h1>

                    {user?.projects?.map((project, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg flex flex-col md:flex-row justify-between shadow-md w-full md:max-w-6xl mb-4">
                            <h3 className="font-bold mt-2 cursor-text">ProjectId : {project}</h3>
                            <Link to={`/projectDetail/${project}`} className="self-center bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 md:mt-auto w-full md:w-32">
                                View Project
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default ProfilePage;
