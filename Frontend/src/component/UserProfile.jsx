import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

const UserProfile = () => {
    const [user, SetUser] = useState('');
    const UserDetail = async () => {
        try {
            const resp = await fetch('http://localhost:3000/users/validatetoken',{
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
        <div className="w-full  max-w-sm bg-white border border-gray-200 rounded-sm shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center mx-2 my-1 pb-10">
            <span className='text-4xl w-24 h-24 rounded-full px-8 py-6 bg-gray-300'>{user?.name?.[0]?.toUpperCase()}</span>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-gray-400">{user?.name}</h5>
            <span className='text-gray-400 mb-1'>{user?.email}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{user?.school}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{user?.course} - {user?.duration}</span>
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
