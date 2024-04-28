import React from 'react';
import Img from "../assets/male.png"
import male from "../assets/about-male-bg.jpg"
import './Sign.css';

const ProfilePage = () => {
    const userInfo = {
        name: "Akhand",
        school: "Babu Banarasi Das University",
        course: "B.Tech Computer Science",
        duration: "2018 - 2022",
        experience: "2 years in software development",
        email: "akhand@example.com",
        phone: "+1234567890",
        projects: [
            { name: "Project Management Tool", date: "2021-10-15" },
            { name: "E-commerce Website", date: "2022-01-20" }
        ]
    };

    return (
        <div className="min-h-screen w bg-white flex justify-center items-start p-4">
            <div className="flex flex-col  gap-4 w-full md:max-w-8xl rounded-4xl shadow-[0px_20px_20px_10px_#00000024] ">
                {/* First Column */}
                <div className="flex flex-col w-full  md:flex-row items-center justify-center bg-white  p-4 md:p-8 ">
                    <div className="w-full md:w-1/3 flex justify-center">
                        <img src={Img} alt="Profile" className="w-64 h-64 md:w-72 md:h-72 rounded-full object-cover border-4 border-blue-500 shadow-xl" />
                    </div>

                    <div className="w-full md:w-2/3 text-center md:text-left">
                        <h2 className="text-2xl md:text-5xl font-bold">Hi there, My name is <span className='text-blue-600'>{userInfo.name}</span></h2>
                        <p className="mt-4 text-lg md:text-base">
                            I am a graduate of {userInfo.school}.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, voluptate?

                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, voluptate?
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-start bg-white">

                    <h1 className="text-3xl md:text-5xl font-bold my-2">About Me</h1>
                    <div className='md:flex md:flex-row flex flex-col justify-around'>
                        <div className="flex flex-col justify-center text-start gap-2 m-2">
                            <p className=' text-xl md:text-3xl'><strong className='text-blue-600 '>School:</strong> {userInfo.school}</p>
                            <p className='text-xl md:text-3xl'><strong className='text-blue-600 '>Course:</strong> {userInfo.course}</p>
                            <p className='text-xl md:text-3xl'><strong className='text-blue-600 '>Duration:</strong> {userInfo.duration}</p>
                            <p className='text-xl md:text-3xl'><strong className='text-blue-600 '>Experience:</strong> {userInfo.experience}</p>
                            <p className='text-xl md:text-3xl'><strong className='text-blue-600 '>Email:</strong> {userInfo.email}</p>
                            <p className='text-xl md:text-3xl'><strong className='text-blue-600 '>Phone:</strong> {userInfo.phone}</p>
                        </div>
                        <div>
                            <img src={male} alt="" className='h-96' />
                        </div>

                    </div>
                </div>
                <div className="flex flex-col items-center  rounded-2xl bg-white-100 ">
                    <h1 className="text-4xl md:text-5xl font-bold my-2">Projects</h1>
                    {userInfo.projects.map((project, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg flex justify-between shadow-md w-full md:w-3/5 mb-4">
                            <h3 className="font-bold">{project.name}</h3>
                            <p>Submission Date: {project.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default ProfilePage;
