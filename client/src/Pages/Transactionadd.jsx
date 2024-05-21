import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddTransaction() {
    const [quantity, setQuantity] = useState('');
    const [vehiclePartPartNo, setVehiclePartPartNo] = useState('');
    const [supplierSupplierId, setSupplierSupplierId] = useState('');
    const [shelfId, setShelfId] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/transaction', {
                quantity,
                vehicle_part_part_no: vehiclePartPartNo,
                supplier_supplier_id: supplierSupplierId,
                shelf_id: shelfId
            });

            alert('Transaction added successfully');
            navigate('/transaction'); // Redirect to transactions page
        } catch (err) {
            console.error('Error adding transaction:', err);
            setError('Error adding transaction. Please try again.');
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-semibold mb-4'>Add New Transaction</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Quantity</label>
                    <input
                        type='number'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className='w-full px-3 py-2 border rounded-md'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Vehicle Part No</label>
                    <input
                        type='text'
                        value={vehiclePartPartNo}
                        onChange={(e) => setVehiclePartPartNo(e.target.value)}
                        className='w-full px-3 py-2 border rounded-md'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Supplier ID</label>
                    <input
                        type='text'
                        value={supplierSupplierId}
                        onChange={(e) => setSupplierSupplierId(e.target.value)}
                        className='w-full px-3 py-2 border rounded-md'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Shelf ID</label>
                    <input
                        type='text'
                        value={shelfId}
                        onChange={(e) => setShelfId(e.target.value)}
                        className='w-full px-3 py-2 border rounded-md'
                        required
                    />
                </div>
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Add Transaction</button>
            </form>
        </div>
    );
}

export default AddTransaction;
