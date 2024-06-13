import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReturnTable() {
    const [returnItems, setReturnItems] = useState([]);
    const [filteredReturnItems, setFilteredReturnItems] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/returnitems') // Assuming your API endpoint for return items is '/api/return_items'
            .then(res => {
                console.log('API response:', res.data); // Log the response data
                setReturnItems(res.data);
                setFilteredReturnItems(res.data);
                setError(null);
            })
            .catch(err => {
                console.error('Error fetching return items:', err);
                setError('Error fetching return items. Please try again.');
            });
    }, []);

    const filterReturnItems = () => {
        if (searchQuery.trim() === '') {
            setFilteredReturnItems(returnItems);
        } else {
            const filtered = returnItems.filter(item => {
                return (
                    item.bill_bill_id.toString().includes(searchQuery) ||
                    item.return_id.toString().includes(searchQuery) ||
                    item.vehicle_part_part_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.vehicle_part_part_name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
            setFilteredReturnItems(filtered);
        }
    };

    useEffect(() => {
        filterReturnItems();
    }, [searchQuery, returnItems]);

    const formatCurrency = (amount) => {
        return amount.toFixed(2);
    };

    return (
        <div className='overflow-x-auto relative flex-1 p-4'>
            <div className='w-full bg-white rounded p-3'>
                <div className='flex justify-between mb-3'>
                    <h1 className='text-2xl font-semibold text-gray-200 dark:text-gray-950'>Return Item View</h1>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search by Return ID or Part Name"
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
                            <th className='py-3 px-6'>Return ID</th>
                            <th className='py-3 px-6'>Part Number</th>
                            <th className='py-3 px-6'>Part Name</th>
                            <th className='py-3 px-6'>Price</th>
                            <th className='py-3 px-6'>Quantity</th>
                            <th className='py-3 px-6'>Total Amount</th>
                            <th className='py-3 px-6'>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReturnItems.map(item => (
                            <tr key={item.return_id} className='bg-white border-b dark:bg-gray-100 dark:border-gray-200'>
                                <td className='py-4 px-6'>{item.bill_bill_id}</td>
                                <td className='py-4 px-6'>{item.return_id}</td>
                                <td className='py-4 px-6'>{item.vehicle_part_part_no}</td>
                                <td className='py-4 px-6'>{item.vehicle_part_part_name}</td>
                                <td className='py-4 px-6'>{item.price}</td>
                                <td className='py-4 px-6'>{item.quantity}</td>
                                <td className='py-4 px-6'>{formatCurrency(item.price * item.quantity)}</td>
                                <td className='py-4 px-6'>{item.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ReturnTable;
