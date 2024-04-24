import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

const UserProfile = () => {
    const [user, SetUser] = useState('');
    const UserDetail = async () => {
        try {
            const resp = await fetch('http://localhost:3000/user/validatetoken',{
            credentials : "include",
            headers : {
                'Content-Type' : 'application/json'
            }
        });
            const userdata = await resp.json();
            SetUser(userdata);
            console.log(userdata);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        UserDetail();
    }, [])
    return (
        <div className="w-[400px] h-max-content m-10 ml-10 mx-[15%] border-2 border-green-500 bg-white-200">
            <div>
                <div className="relative left-2 top-3 w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"/>
                </svg>
                </div>
                <h1 className='m-2 my-4 mt-4'>{user?.name}</h1>
                <h1 className='m-2 my-4'>Email : {user?.email}</h1>
                <h2 className='m-2 mt-4'>Projects</h2>
                {user?.projects?.map((data,index) => {
                    return (
                        <Link key={index} to={`/projectDetail/${data}`} className='mx-6 my-4 hover:text-blue-500'>{data}<br/></Link>
                    )
                })}
                
            </div>
        </div>
    );
}

export default UserProfile;
