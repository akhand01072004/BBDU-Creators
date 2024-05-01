import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { MdDelete } from "react-icons/md";

const ManageUser = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/getAll');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log("Facing error while fetching");
            enqueueSnackbar('Error fetching users', { variant: 'error' });
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/user/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status === 200) {
                fetchUsers(); // Reload the user list after deletion
                enqueueSnackbar('User deleted successfully', { variant: 'success' });
            } else {
                enqueueSnackbar('Facing error while deleting', { variant: 'error' });
            }
        } catch (error) {
            console.log("Facing error while deleting");
            enqueueSnackbar('Error deleting user', { variant: 'error' });
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="mx-8 my-4">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            <div className="flex flex-col space-y-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                   UserName
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                  Delete
                  </th>
                </tr>
              </thead>
                {users.length > 0 ? users.map((user) => (
                      <tbody key={user._id}>
                        <tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-[#4deeea]">
                            {user.name}
                          </th>
                          <td className="px-6 py-4 text-[#4deeea]">{user?.email}</td>
                          <button onClick={() => deleteUser(user._id)} className="px-6 py-4 text-right">
                          <MdDelete className="text-lg text-red-500"/>
                          </button>
                        </tr>
                      </tbody>
                )) : <p className="text-gray-600">No users found.</p>}
                </table>
                </div>
            </div>
        </div>
    );
}

export default ManageUser;
