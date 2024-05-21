import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Supplier() {
    const [suppliers, setSuppliers] = useState([]);
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/supplier')
            .then(res => {
                setSuppliers(res.data); // Assuming the response is an array of supplier objects
                setFilteredSuppliers(res.data); // Initialize filtered suppliers with all suppliers
                setError(null); // Reset error state if successful
            })
            .catch(err => {
                console.error('Error fetching suppliers:', err);
                setError('Error fetching suppliers. Please try again.'); // Set error message
            });
    }, []);

    // Function to filter suppliers based on search query
    const filterSuppliers = () => {
        if (searchQuery.trim() === '') {
            setFilteredSuppliers(suppliers); // If search query is empty, show all suppliers
        } else {
            const filtered = suppliers.filter(supplier => {
                return (
                    supplier.supplier_id.toString().includes(searchQuery) || // Search by supplier ID
                    supplier.first_name.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by first name
                    supplier.last_name.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by last name
                    supplier.company_name.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by company name
                    supplier.address_line1.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by address line 1
                    supplier.address_line2.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by address line 2
                    supplier.address_line3.toLowerCase().includes(searchQuery.toLowerCase()) // Search by address line 3
                );
            });
            setFilteredSuppliers(filtered);
        }
    };

    useEffect(() => {
        filterSuppliers(); // Update filtered suppliers whenever searchQuery changes
    }, [searchQuery, suppliers]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/supplier/${id}`)
            .then(() => {
                // Remove the deleted supplier from the supplier list
                setSuppliers(suppliers.filter(supplier => supplier.supplier_id !== id));
                // Display success message
                alert('Supplier details deleted successfully');
            })
            .catch(err => {
                console.error('Error deleting supplier:', err);
                setError('Error deleting supplier. Please try again.');
            });
    };

    return (
        <div className='overflow-x-auto relative flex-1 p-4'>
            <div className='w-full bg-white rounded p-3'>
                <div className='flex justify-between mb-3'>
                    <h1 className='text-2xl font-semibold text-gray-200 dark:text-gray-950'>Supplier View</h1>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search by Supplier ID, Name, Company or Address"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-72 mr-3 px-3 py-1.5"
                        />
                        <Link to='/Supplieradd' className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Add Supplier</Link>
                    </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>} {/* Display error message if there's an error */}
                <table className='w-full text-sm text-left text-gray-50 dark:text-gray-950'>
                    <thead className='text-xs text-gray-950 uppercase bg-gray-50 dark:bg-slate-80 dark:text-gray-950'>
                        <tr>
                            <th className='py-3 px-6'>Supplier ID</th>
                            <th className='py-3 px-6'>First Name</th>
                            <th className='py-3 px-6'>Last Name</th>
                            <th className='py-3 px-6'>Company Name</th>
                            <th className='py-3 px-6'>Address Line 1</th>
                            <th className='py-3 px-6'>Address Line 2</th>
                            <th className='py-3 px-6'>Address Line 3</th>
                            <th className='py-3 px-6'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSuppliers.map(supplier => (
                            <tr key={supplier.supplier_id} className='bg-white border-b dark:bg-gray-100 dark:border-gray-200'>
                                <td className='py-4 px-6'>{supplier.supplier_id}</td>
                                <td className='py-4 px-6'>{supplier.first_name}</td>
                                <td className='py-4 px-6'>{supplier.last_name}</td>
                                <td className='py-4 px-6'>{supplier.company_name}</td>
                                <td className='py-4 px-6'>{supplier.address_line1}</td>
                                <td className='py-4 px-6'>{supplier.address_line2}</td>
                                <td className='py-4 px-6'>{supplier.address_line3}</td>
                                <td className='py-4 px-6'>
                                    <Link to={`/Supplierupdate/${supplier.supplier_id}`} className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Edit</Link>
                                    
                                    <button className='rounded-md bg-red-500 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-3' onClick={() => handleDelete(supplier.supplier_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Supplier;
