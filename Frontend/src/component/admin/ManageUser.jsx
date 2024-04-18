import { useEffect, useState } from 'react'
import { enqueueSnackbar } from 'notistack';

const ManageUser = () => {
  const [user, SetUser] = useState([]);

  const fetchUser = async() => {
    try {
        const response = await fetch('http://localhost:3000/user/getAll');
        const data = await response.json();
        SetUser(data);
    } catch (error) {
        console.log("facing error while fetching")
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/user/delete/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      // return response;
      fetchUser();
      if(response.status === 200){
        enqueueSnackbar('User deleted Successfully', {variant: 'success'})
      }else{
        enqueueSnackbar('Facing error while deleting', {variant: 'error'})
      }
    } catch (error) {
        console.log("facing error while deleting")
    }
  }

  useEffect(() => {
    fetchUser();
  }, [user])
  return (
    <div>
      <h1 className='mx-8 font-bold text-2xl'>Manage User</h1>
      {user.map((data) => {
        return (
          <div key={data._id} className='flex justify-between mx-8 my-5 bg-green-500 p-2 rounded-md '>
            <li className='list-none'>{data.name}</li>
            <li className='list-none'>{data.email}</li>
            <button onClick={(e) => {
              e.stopPropagation();
              deleteUser(data._id)}} className='bg-rose-500 px-3 text-white rounded'>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default ManageUser
