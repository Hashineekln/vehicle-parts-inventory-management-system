import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Transaction() {
    const [transactions, setTransactions] = useState([]);
    const [vehicleParts, setVehicleParts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [shelves, setShelves] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const transactionsRes = await axios.get('http://localhost:5000/transaction');
                const vehiclePartsRes = await axios.get('http://localhost:5000/vehiclepart');
                const suppliersRes = await axios.get('http://localhost:5000/supplier');
                const shelvesRes = await axios.get('http://localhost:5000/shelf');

                setTransactions(transactionsRes.data);
                setVehicleParts(vehiclePartsRes.data);
                setSuppliers(suppliersRes.data);
                setShelves(shelvesRes.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error fetching data. Please try again.');
            }
        };

        fetchData();
    }, []);

    const formattedDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleString(); // You can customize the formatting as needed
    };

    const formatDecimal = (value) => {
        return parseFloat(value).toFixed(2); // Formats value to two decimal places
    };

    const filteredTransactions = transactions.filter(tx => {
        if (searchQuery.trim() === '') {
            return true;
        } else {
            const lowerQuery = searchQuery.toLowerCase();
            return (
                tx.transaction_id.toString().includes(searchQuery) ||
                tx.quantity.toString().includes(searchQuery) ||
                formattedDateTime(tx.create_time).toLowerCase().includes(lowerQuery) ||
                vehicleParts.find(vp => vp.part_no === tx.vehicle_part_part_no)?.name.toLowerCase().includes(lowerQuery) ||
                suppliers.find(sp => sp.supplier_id === tx.supplier_supplier_id)?.name.toLowerCase().includes(lowerQuery) ||
                shelves.find(s => s.shelf_id === tx.shelf_id)?.name.toLowerCase().includes(lowerQuery)
            );
        }
    });

    return (
        <div className='overflow-x-auto relative flex-1 p-4'>
            <div className='w-full bg-white rounded p-3'>
            
                <div className='flex justify-between mb-3'>
                    <h1 className='text-2xl font-semibold text-gray-200 dark:text-gray-950'>Transactions</h1>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search by Transaction ID, Quantity, Time, Part, Supplier, or Shelf"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-72 mr-3 px-3 py-1.5"
                        />
                        <Link to='/transactionadd' className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700'>
                            Add Transaction
                        </Link>
                    </div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <table className='w-full text-sm text-left text-gray-900'>
                    <thead className='text-xs uppercase bg-gray-200'>
                        <tr>
                            <th className='py-3 px-6'>Transaction ID</th>
                            <th className='py-3 px-6'>Vehicle Part</th>
                            <th className='py-3 px-6'>Quantity</th>
                            <th className='py-3 px-6'>Buying Price</th>
                            <th className='py-4 px-6'>Total Price</th>
                            <th className='py-3 px-6'>Supplier</th>
                            
                            <th className='py-3 px-6'>Create Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map(tx => (
                            <tr key={tx.transaction_id} className='bg-white border-b'>
                                <td className='py-4 px-6'>{tx.transaction_id}</td>
                                <td className='py-4 px-6'>{vehicleParts.find(vp => vp.part_no === tx.vehicle_part_part_no)?.part_no}</td>
                                <td className='py-4 px-6'>{tx.quantity}</td>
                                <td className='py-4 px-6'>{formatDecimal(tx.buying_price)}</td>
                                <td className='py-4 px-6'>{formatDecimal(tx.buying_price * tx.quantity)}</td>
                                <td className='py-4 px-6'>{suppliers.find(sp => sp.supplier_id === tx.supplier_supplier_id)?.supplier_id}</td>
                                
                                <td className='py-4 px-6'>{formattedDateTime(tx.create_time)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Transaction;
