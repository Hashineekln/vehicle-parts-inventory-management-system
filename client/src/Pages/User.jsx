import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function User() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(res => {
                console.log('API response:', res.data); // Log the response data
                setUsers(res.data);
                setFilteredUsers(res.data);
                setError(null);
            })
            .catch(err => {
                console.error('Error fetching users:', err);
                setError('Error fetching users. Please try again.');
            });
    }, []);

    const filterUsers = () => {
        if (searchQuery.trim() === '') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user => {
                return (
                    user.user_id.toString().includes(searchQuery) ||
                    user.usertype.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`.includes(searchQuery.toLowerCase())
                );
            });
            setFilteredUsers(filtered);
        }
    };

    useEffect(() => {
        filterUsers();
    }, [searchQuery, users]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/users/${id}`)
            .then(() => {
                setUsers(users.filter(user => user.user_id !== id));
                alert('User details deleted successfully');
            })
            .catch(err => {
                console.error('Error deleting user:', err);
                setError('Error deleting user. Please try again.');
            });
    };

    return (
        <div className='overflow-x-auto relative flex-1 p-4'>
            <div className='w-full bg-white rounded p-3'>
                <div className='flex justify-between mb-3'>
                    <h1 className='text-2xl font-semibold text-gray-200 dark:text-gray-950'>User View</h1>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search by User ID, Role or Name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-72 mr-3 px-3 py-1.5"
                        />
                <Link to={`/Register`} className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Register</Link>

                    </div>

                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <table className='w-full text-sm text-left text-gray-50 dark:text-gray-950'>
                    <thead className='text-xs text-gray-950 uppercase bg-gray-50 dark:bg-slate-80 dark:text-gray-950'>
                        <tr>
                            <th className='py-3 px-6'>User ID</th>
                            <th className='py-3 px-6'>User Type</th>
                            <th className='py-3 px-6'>Name</th>
                            <th className='py-3 px-6'>Username</th>
                            <th className='py-3 px-6'>NIC</th>
                            <th className='py-3 px-6'>Email</th>
                            <th className='py-3 px-6'>Contact</th>
                            <th className='py-3 px-6'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.user_id} className='bg-white border-b dark:bg-gray-100 dark:border-gray-200'>
                                <td className='py-4 px-6'>{user.user_id}</td>
                                <td className='py-4 px-6'>{user.usertype}</td>
                                <td className='py-4 px-6'>{`${user.first_name} ${user.last_name}`}</td>
                                <td className='py-4 px-6'>{user.username}</td>
                                <td className='py-4 px-6'>{user.NIC}</td>
                                <td className='py-4 px-6'>{user.email}</td>
                                <td className='py-4 px-6'>{user.contact}</td>
                                <td className='py-4 px-6'>
                                    <Link to={`/Userupdate/${user.user_id}`} className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default User;
