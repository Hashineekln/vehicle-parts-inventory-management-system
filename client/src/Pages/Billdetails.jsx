import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import Dashboard from '../Components/AdminDash';

function Bill() {
    const [bills, setBills] = useState([]);
    const [filteredBills, setFilteredBills] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/bills')
            .then(res => {
                setBills(res.data);
                setFilteredBills(res.data);
                setError(null);
            })
            .catch(err => {
                console.error('Error fetching bills:', err);
                setError('Error fetching bills. Please try again.');
            });
    }, []);

    const filterBills = () => {
        if (searchQuery.trim() === '') {
            setFilteredBills(bills);
        } else {
            const filtered = bills.filter(bill => {
                return (
                    bill.bill_id.toString().includes(searchQuery) ||
                    bill.user_user_id.toString().includes(searchQuery) ||
                    bill.customer_customer_id.toString().includes(searchQuery) ||
                    bill.total_amount.toString().includes(searchQuery)
                );
            });
            setFilteredBills(filtered);
        }
    };

    useEffect(() => {
        filterBills();
    }, [searchQuery, bills]);

    const navigateToReturnForm = (bill_id) => {
        navigate(`/return/${bill_id}`);
    };

    const formatDecimal = (value) => {
        return parseFloat(value).toFixed(2); // Formats value to two decimal places
    };

    const formatCellValues = (values) => {
        return values.split(',').join('\n'); // Joins values with a new line
    };

    return (
        <div className="flex h-screen">
         
            <main className="flex-grow m-5 p-5 bg-white rounded shadow overflow-auto">
                <div className='overflow-x-auto relative flex-1 p-4'>
                    <div className='w-full bg-white rounded p-3'>
                        <div className='flex justify-between mb-3'>
                            <h1 className='text-2xl font-semibold text-gray-900'>Bill View</h1>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search by Bill ID, User ID, or Customer ID"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-72 mr-3 px-3 py-1.5"
                                />
                            </div>
                        </div>
                        {error && <div className="alert alert-danger bg-red-100 text-red-800 p-3 rounded-md mb-4">{error}</div>}
                        <table className='w-full text-sm text-left text-gray-900'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                                <tr>
                                    <th className='py-3 px-6'>Bill ID</th>
                                    <th className='py-3 px-6'>User ID</th>
                                    <th className='py-3 px-6'>Customer ID</th>
                                    <th className='py-3 px-6'>Part Numbers</th>
                                    <th className='py-3 px-6'>Part Names</th>
                                    <th className='py-3 px-6'>Selling Prices</th>
                                    <th className='py-3 px-6'>Selling Quantities</th>
                                    <th className='py-3 px-6'>Total Amount</th>
                                    <th className='py-3 px-6'>Total Discount</th>
                                    <th className='py-3 px-6'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBills.map(bill => (
                                    <tr key={bill.bill_id} className='bg-white border-b'>
                                        <td className='py-4 px-6'>{bill.bill_id}</td>
                                        <td className='py-4 px-6'>{bill.user_user_id}</td>
                                        <td className='py-4 px-6'>{bill.customer_customer_id}</td>
                                        <td className='py-4 px-6 whitespace-pre-wrap'>{formatCellValues(bill.part_nos)}</td>
                                        <td className='py-4 px-6 whitespace-pre-wrap'>{formatCellValues(bill.part_names)}</td>
                                        <td className='py-4 px-6 whitespace-pre-wrap'>{formatCellValues(bill.selling_prices)}</td>
                                        <td className='py-4 px-6 whitespace-pre-wrap'>{formatCellValues(bill.selling_quantities)}</td>
                                        <td className='py-4 px-6'>{formatDecimal(bill.total_amount)}</td>
                                        <td className='py-4 px-6'>{formatDecimal(bill.total_discount)}</td>
                                        <td className='py-4 px-6'>
                                            <button
                                                onClick={() => navigateToReturnForm(bill.bill_id)}
                                                className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                            >
                                                Return
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Bill;
