import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Client() {
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/client')
            .then(res => {
                setClients(res.data); // Assuming the response is an array of client objects
                setError(null); // Reset error state if successful
            })
            .catch(err => {
                console.error('Error fetching clients:', err);
                setError('Error fetching clients. Please try again.'); // Set error message
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/client/${id}`)
            .then(() => {
                // Remove the deleted client from the client list
                setClients(clients.filter(client => client.customer_id !== id));
                // Display success message
                alert('Client details deleted successfully');
            })
            .catch(err => {
                console.error('Error deleting client:', err);
                setError('Error deleting client. Please try again.');
            });
    };

    return (
        <div className='overflow-x-auto relative flex-1 p-4'>
            <div className='w-full bg-white rounded p-3'>
                <div className='flex justify-between mb-3'>
                    <h1 className='text-2xl font-semibold text-gray-200 dark:text-gray-950'>Customer View</h1>
                    <Link to='/Clientadd' className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Add Customer</Link>
                </div>
                {error && <div className="alert alert-danger">{error}</div>} {/* Display error message if there's an error */}
                <table className='w-full text-sm text-left text-gray-50 dark:text-gray-950'>
                    <thead className='text-xs text-gray-950 uppercase bg-gray-50 dark:bg-slate-80 dark:text-gray-950'>
                        <tr>
                            <th className='py-3 px-6'>Customer ID</th>
                            <th className='py-3 px-6'>First Name</th>
                            <th className='py-3 px-6'>Last Name</th>
                            <th className='py-3 px-6'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.customer_id} className='bg-white border-b dark:bg-gray-100 dark:border-gray-200'>
                                <td className='py-4 px-6'>{client.customer_id}</td>
                                <td className='py-4 px-6'>{client.first_name}</td>
                                <td className='py-4 px-6'>{client.last_name}</td>
                                <td className='py-4 px-6'>
                                    <Link to={`/Clientupdate/${client.customer_id}`} className='rounded-md bg-blue-500  px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Edit</Link>
                                    
                                    <button className='rounded-md bg-red-500  px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-3' onClick={() => handleDelete(client.customer_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Client;
