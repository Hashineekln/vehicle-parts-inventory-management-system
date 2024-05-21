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

    const filteredTransactions = transactions.filter(tx => {
        if (searchQuery.trim() === '') {
            return true;
        } else {
            const lowerQuery = searchQuery.toLowerCase();
            return (
                tx.transaction_id.toString().includes(searchQuery) ||
                tx.quantity.toString().includes(searchQuery) ||
                tx.create_time.toLowerCase().includes(lowerQuery) ||
                vehicleParts.find(vp => vp.part_no === tx.vehicle_part_part_no)?.name.toLowerCase().includes(lowerQuery) ||
                suppliers.find(sp => sp.supplier_id === tx.supplier_supplier_id)?.name.toLowerCase().includes(lowerQuery) ||
                shelves.find(s => s.shelf_id === tx.shelf_id)?.name.toLowerCase().includes(lowerQuery)
            );
        }
    });

    const handleDelete = async (transaction_id) => {
        try {
            await axios.delete(`http://localhost:5000/transaction/${transaction_id}`);
            setTransactions(transactions.filter(tx => tx.transaction_id !== transaction_id));
            alert('Transaction deleted successfully');
        } catch (err) {
            console.error('Error deleting transaction:', err);
            setError('Error deleting transaction. Please try again.');
        }
    };

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
                            <th className='py-3 px-6'>Quantity</th>
                            <th className='py-3 px-6'>Create Time</th>
                            <th className='py-3 px-6'>Vehicle Part</th>
                            <th className='py-3 px-6'>Supplier</th>
                            <th className='py-3 px-6'>Shelf</th>
                            <th className='py-3 px-6'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map(tx => (
                            <tr key={tx .transaction_id} className='bg-white border-b'>
                                <td className='py-4 px-6'>{tx .transaction_id}</td>
                                <td className='py-4 px-6'>{tx .quantity}</td>
                                <td className='py-4 px-6'>{tx .create_time}</td>
                                <td className='py-4 px-6'>{vehicleParts.find(vp => vp.part_no === tx .vehicle_part_part_no)?.part_no}</td>
                                <td className='py-4 px-6'>{suppliers.find(sp => sp.supplier_id === tx.supplier_supplier_id)?.supplier_id}</td>
                                <td className='py-4 px-6'>{shelves.find(s => s.shelf_id === tx .shelf_id)?.shelf_id}</td>
                                <td className='py-4 px-6'>
                                    <Link to={`/transactionupdate/${tx .transaction_id}`} className='bg-blue-500 px-4 py-2 text-white rounded-md mr-3'>
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(tx .transaction_id)} className='bg-red-500 px-2 py-1.5 text-white rounded-md'>
                                        Delete
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

export default Transaction;
