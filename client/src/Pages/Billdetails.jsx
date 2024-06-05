import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    return (
        <div className='overflow-x-auto relative flex-1 p-4'>
            <div className='w-full bg-white rounded p-3'>
                <div className='flex justify-between mb-3'>
                    <h1 className='text-2xl font-semibold text-gray-200 dark:text-gray-950'>Bill View</h1>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search by Bill ID or User ID"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-72 mr-3 px-3 py-1.5"
                        />
                    </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <table className='w-full text-sm text-left text-gray-50 dark:text-gray-950'>
                    <thead className='text-xs text-gray-950 uppercase bg-gray-50 dark:bg-slate-80 dark:text-gray-950'>
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
                            <tr key={bill.bill_id} className='bg-white border-b dark:bg-gray-100 dark:border-gray-200'>
                                <td className='py-4 px-6'>{bill.bill_id}</td>
                                <td className='py-4 px-6'>{bill.user_user_id}</td>
                                <td className='py-4 px-6'>{bill.customer_customer_id}</td>
                                <td className='py-4 px-6'>{bill.part_nos.split(',').join(', ')}</td>
                                <td className='py-4 px-6'>{bill.part_names.split(',').join(', ')}</td>
                                <td className='py-4 px-6'>{bill.selling_prices.split(',').join(', ')}</td>
                                <td className='py-4 px-6'>{bill.selling_quantities.split(',').join(', ')}</td>
                                <td className='py-4 px-6'>{bill.total_amount}</td>
                                <td className='py-4 px-6'>{bill.total_discount}</td>
                                <td className='py-4 px-6'>
                                    <button
                                        onClick={() => navigateToReturnForm(bill.bill_id)}
                                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
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
    );
}

export default Bill;
