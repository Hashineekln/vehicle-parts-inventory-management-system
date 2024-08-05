import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { UpdateValidation } from './Registervalidation'; 

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
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${id}`);
                if (response.data) {
                    setUser(response.data);
                } else {
                    setError('No user found with the given ID');
                }
            } catch (err) {
                setError(`Error fetching user. ${err.response?.data?.details || err.message}`);
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
        const validationErrors = UpdateValidation(user);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/user/${id}`, user);
            alert('User updated successfully');
            navigate('/users');
        } catch (err) {
            setError(`Error updating user. ${err.response?.data?.details || err.message}`);
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
                    {errors.usertype && <p className="text-red-500">{errors.usertype}</p>}
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
                    {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
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
                    {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
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
                    {errors.username && <p className="text-red-500">{errors.username}</p>}
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
                    {errors.NIC && <p className="text-red-500">{errors.NIC}</p>}
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
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
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
                    {errors.contact && <p className="text-red-500">{errors.contact}</p>}
                </div>
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Update User</button>
            </form>
        </div>
    );
}

export default UserUpdate;
