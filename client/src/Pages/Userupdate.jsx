import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UserUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        user_id: '',
        usertype: '',
        first_name: '',
        last_name: '',
        username: '',
        NIC: '',
        email: '',
        contact: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log(`Fetching data for user id: ${id}`);
                const response = await axios.get(`http://localhost:5000/api/user/${id}`);
                if (response.data && response.data.length > 0) {
                    console.log('User data fetched successfully:', response.data[0]);
                    setUser(response.data[0]);
                } else {
                    setError('No user found with the given ID');
                }
            } catch (err) {
                console.error('Error fetching user:', err);
                setError('Error fetching user. Please try again.');
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/api/user/${id}`, user);
            alert('User updated successfully');
            navigate('/users'); // Redirect to users page
        } catch (err) {
            console.error('Error updating user:', err);
            setError('Error updating user. Please try again.');
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-semibold mb-4'>Update User</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>User Type</label>
                    <select
                        name='usertype'
                        value={user.usertype || ''}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-md'
                        required
                    >
                        <option value="">Select a type</option>
                        <option value="cashier">Cashier</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Inactive</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>First Name</label>
                    <input
                        type='text'
                        name='first_name'
                        value={user.first_name || ''}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-md'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Last Name</label>
                    <input
                        type='text'
                        name='last_name'
                        value={user.last_name || ''}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-md'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Username</label>
                    <input
                        type='text'
                        name='username'
                        value={user.username || ''}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-md'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>NIC</label>
                    <input
                        type='text'
                        name='NIC'
                        value={user.NIC || ''}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-md'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={user.email || ''}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-md'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Contact</label>
                    <input
                        type='text'
                        name='contact'
                        value={user.contact || ''}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-md'
                        required
                    />
                </div>
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Update User</button>
            </form>
        </div>
    );
}

export default UserUpdate;
