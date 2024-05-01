import {useState, useEffect} from 'react'
import { MdOutlineEmail } from "react-icons/md";

const AdminProfile = () => {
  const [admin, SetAdmin] = useState('');
    const UserDetail = async () => {
        try {
            const resp = await fetch('http://localhost:3000/admin/validatetoken',{
            credentials : "include",
            headers : {
                'Content-Type' : 'application/json'
            }
        });
            const admindata = await resp.json();
            SetAdmin(admindata);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        UserDetail();
    }, [])
  return (
    <div className="w-full  max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex flex-col items-center mx-2 my-1 pb-10">
        <span className='text-4xl w-24 h-24 rounded-full px-8 py-6 bg-gray-300'>{admin?.name?.[0]}</span>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-gray-400">{admin?.name}</h5>
        <span className='text-gray-400 mb-1'><MdOutlineEmail className='text-gray-300 inline-block mr-4'/>{admin?.email}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{admin?.department}</span>
    </div>
    </div>
  )
}

export default AdminProfile