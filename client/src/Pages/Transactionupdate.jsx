import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function TransactionUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState('');
    const [buying_price, setbuying_price] = useState('');

    const [vehiclePartPartNo, setVehiclePartPartNo] = useState('');
    const [supplierSupplierId, setSupplierSupplierId] = useState('');
    const [shelfId, setShelfId] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/transaction/${id}`);
                const transaction = response.data;
                setQuantity(transaction.quantity);
                setbuying_price(transaction.buyingprice);
                setVehiclePartPartNo(transaction.vehicle_part_part_no);
                setSupplierSupplierId(transaction.supplier_supplier_id);
                setShelfId(transaction.shelf_id);
            } catch (err) {
                console.error('Error fetching transaction:', err);
                setError('Error fetching transaction. Please try again.');
            }
        };

        fetchTransaction();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/transaction/${id}`, {
                quantity,
                vehicle_part_part_no: vehiclePartPartNo,
                supplier_supplier_id: supplierSupplierId,
                shelf_id: shelfId
            });

            alert('Transaction updated successfully');
            navigate('/transaction'); // Redirect to transactions page
        } catch (err) {
            console.error('Error updating transaction:', err);
            setError('Error updating transaction. Please try again.');
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-semibold mb-4'>Update Transaction</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>

                <div className='mb-4'>
                    <label className='block text-gray-700'>Vehicle Part Part No</label>
                    <input
                        type='text'
                        value={vehiclePartPartNo}
                        onChange={(e) => setVehiclePartPartNo(e.target.value)}
                        className='w-full px-3 py-2 border rounded-md'
                        required
                    />
                </div>
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
                    <label className='block text-gray-700'>Buying Price</label>
                    <input
                        type='number'
                        value={buying_price}
                        onChange={(e) => setbuying_price(e.target.value)}
                        className='w-full px-3 py-2 border rounded-md'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Supplier Supplier ID</label>
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
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Update Transaction</button>
            </form>
        </div>
    );
}

export default TransactionUpdate;
