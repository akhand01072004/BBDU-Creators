import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';

const ManageUser = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/getAll');
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
                {users.length > 0 ? users.map((user) => (
                    <div key={user._id} className="flex items-center justify-between bg-[#0e1630] p-4 shadow-md rounded-md">
                        <div className="text-[#4DEEEA] text-sm font-medium">{user.name}</div>
                        <div className="text-[#4DEEEA] text-sm">{user.email}</div>
                        <span
                            onClick={() => deleteUser(user._id)}
                            className="cursor-pointer text-red-500 hover:text-red-700"
                        >
                            <i className="fas fa-trash-alt"></i>
                        </span>
                    </div>
                )) : <p className="text-gray-600">No users found.</p>}
            </div>
        </div>
    );
}

export default ManageUser;
