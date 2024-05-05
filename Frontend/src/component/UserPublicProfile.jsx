import { useState , useEffect } from "react";
import { useParams , Link } from "react-router-dom";
import Img from "../assets/male.png"
import male from "../assets/about-male-bg.jpg"
import './Sign.css';

function UserPublicProfile() {

    const [user, SetUser] = useState('');
    const {email} = useParams();
    const data = {
        email : email
    }
    const UserDetail = async () => {
        try {
            const resp = await fetch('http://localhost:3000/users/userbyemail',{
            method : "POST",
            credentials : "include",
            body : JSON.stringify(data),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
            const userdata = await resp.json();
            SetUser(userdata);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        UserDetail();
    }, [])

    return (
        <div className="min-h-screen w bg-white flex justify-center items-start p-4">
            {!user ? <h1>User Not Found</h1> : null}
            <div className="flex flex-col  gap-4 w-full md:max-w-8xl rounded-4xl shadow-[0px_20px_20px_10px_#00000024] ">
                {/* First Column */}
                <div className="flex flex-col w-full  md:flex-row items-center justify-center bg-white  p-4 md:p-8 ">
                    <div className="w-full md:w-1/3 flex justify-center">
                        <img src={Img} alt="Profile" className="w-64 h-64 md:w-72 md:h-72 rounded-full object-cover border-4 border-blue-500 shadow-xl" />
                    </div>

                    <div className="w-full md:w-2/3 text-center md:text-left">
                        <h2 className="text-2xl md:text-5xl font-bold">Hi there, My name is <span className='text-blue-600'>{user.name}</span></h2>
                        <p className="mt-4 md:text-base">
                            I am a final year student at Babu Banarsi Das University from the {user.school}.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-start bg-white">

                    <h1 className="text-3xl md:text-5xl font-bold my-2">About Me</h1>
                    <div className='md:flex md:flex-row flex flex-col justify-around'>
                        <div className="flex flex-col justify-center text-start gap-2 m-2">
                            <p className=' text-xl md:text-3xl'><strong className='text-blue-600 '>School:</strong> {user.school}</p>
                            <p className='text-xl md:text-3xl'><strong className='text-blue-600 '>Course:</strong> {user.course}</p>
                            <p className='text-xl md:text-3xl'><strong className='text-blue-600 '>Duration:</strong> {user.duration}</p>
                            <p className='text-xl md:text-3xl'><strong className='text-blue-600 '>Email:</strong> {user.email}</p>
                        </div>
                        <div>
                            <img src={male} alt="" className='h-96' />
                        </div>

                    </div>
                </div>
                <div className="flex flex-col items-center  rounded-2xl bg-white-100 ">
                    <h1 className="text-4xl md:text-5xl font-bold my-2">Projects</h1>

                    {user?.projects?.map((project, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg flex justify-between shadow-md w-full md:w-3/5 mb-4">
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
}

export default UserPublicProfile