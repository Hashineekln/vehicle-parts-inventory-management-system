import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import Dashboard from '../Components/AdminDash';

function AddTransaction() {
    const [suppliers, setSuppliers] = useState([]);
    const [vehicleParts, setVehicleParts] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [buyingPrice, setBuyingPrice] = useState('');
    const [vehiclePartPartNo, setVehiclePartPartNo] = useState('');
    const [supplierSupplierId, setSupplierSupplierId] = useState('');
    const [shelfId, setShelfId] = useState('');
    const [shelves, setShelves] = useState([]);
    const [error, setError] = useState(null);
    const [transactionId, setTransactionId] = useState(null);
    const [transactionAdded, setTransactionAdded] = useState(false);
    const componentRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch vehicle parts
        axios.get('http://localhost:5000/vehiclepart')
            .then(response => setVehicleParts(response.data))
            .catch(error => console.error('Error fetching vehicle parts:', error));

        // Fetch suppliers
        axios.get('http://localhost:5000/supplier')
            .then(response => setSuppliers(response.data))
            .catch(error => console.error('Error fetching suppliers:', error));

        // Fetch shelves
        axios.get('http://localhost:5000/shelf')
            .then(response => setShelves(response.data))
            .catch(error => console.error('Error fetching shelves:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/transaction', {
                quantity,
                buying_price: buyingPrice,
                vehicle_part_part_no: vehiclePartPartNo,
                supplier_supplier_id: supplierSupplierId,
                shelf_id: shelfId
            });

            const transaction_id = response.data.transactionData.insertId;
            setTransactionId(transaction_id);

            if (transaction_id) {
                alert('Transaction added successfully');
                setTransactionAdded(true);
            } else {
                setError('Error retrieving transaction ID from server response.');
            }
        } catch (err) {
            console.error('Error adding transaction:', err);
            setError('Error adding transaction. Please try again.');
        }
    };

    const handleAfterPrint = () => {
        // Clear form fields after printing
        setQuantity('');
        setBuyingPrice('');
        setVehiclePartPartNo('');
        setSupplierSupplierId('');
        setShelfId('');

        // Reset transaction state
        setTransactionId(null);
        setTransactionAdded(false);

        // Navigate to the transaction page
        navigate('/transaction');
    };

    return (
        <div className="flex h-screen">
            
            <main className="flex-grow m-5 p-5 bg-white rounded shadow overflow-auto">
                <style>
                    {`
                        @media print {
                            .no-print {
                                display: none;
                            }
                        }
                    `}
                </style>
                {transactionAdded && (
                    <ReactToPrint
                        trigger={() => <button className="bg-blue-500 text-white p-2 mt-4 no-print">Print/Download</button>}
                        content={() => componentRef.current}
                        onAfterPrint={handleAfterPrint}
                    />
                )}
                <div ref={componentRef} className="p-5">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="text-center mb-4">
                        <h1 className="font-bold uppercase tracking-wide text-3xl mb-3">Transaction Receipt</h1>
                        <div className="flex items-center justify-center mb-4">
                            <img src="src/assets/Logo.jpg" alt="LHI Company" className="w-36 h-36 mr-6 rounded-full border-2 border-gray-300 shadow-md" />
                        </div>
                        <div className="font-bold text-lg">LHI LOGISTIC</div>
                        <div>Address: No 164/B, Kottawa - Malabe Rd, Pannipitiya</div>
                        <div>Tel: +94 7652 996</div>
                        <div>Fax: 7684935493</div>
                    </div>
                    {transactionId && (
                        <div className="text-center mb-4">
                            <div className="font-bold bg-yellow-200 p-2 rounded shadow-md">Transaction ID: {transactionId}</div>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-end mb-4 space-x-4 no-print">
                            <Link to="/supplieradd" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add New Supplier</Link>
                            <Link to="/Vehiclepartadd" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add New Part</Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className='mb-4'>
                                <label className='block text-gray-700'>Supplier ID</label>
                                <select
                                    value={supplierSupplierId}
                                    onChange={(e) => setSupplierSupplierId(e.target.value)}
                                    className='w-full px-3 py-2 border rounded-md'
                                    required
                                    disabled={transactionAdded}
                                >
                                    <option value=''>Select Supplier</option>
                                    {suppliers.map(supplier => (
                                        <option key={`${supplier.supplier_id}-${supplier.first_name}`} value={supplier.supplier_id}>
                                            {supplier.supplier_id} - {supplier.first_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700'>Vehicle Part No</label>
                                <select
                                    value={vehiclePartPartNo}
                                    onChange={(e) => setVehiclePartPartNo(e.target.value)}
                                    className='w-full px-3 py-2 border rounded-md'
                                    required
                                    disabled={transactionAdded}
                                >
                                    <option value=''>Select Vehicle Part</option>
                                    {vehicleParts.map(part => (
                                        <option key={`${part.part_no}-${part.part_name}`} value={part.part_no}>
                                            {part.part_no} - {part.part_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className='mb-4'>
                                <label className='block text-gray-700'>Quantity</label>
                                <input
                                    type='number'
                                    min='0'
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className='w-full px-3 py-2 border rounded-md'
                                    required
                                    disabled={transactionAdded}
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700'>Buying Price</label>
                                <input
                                    type='number'
                                    min='0'
                                    value={buyingPrice}
                                    onChange={(e) => setBuyingPrice(e.target.value)}
                                    className='w-full px-3 py-2 border rounded-md'
                                    required
                                    disabled={transactionAdded}
                                />
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>Total Amount</label>
                            <input
                                type='text'
                                value={quantity && buyingPrice ? (buyingPrice * quantity).toFixed(2) : ''}
                                className='w-full px-3 py-2 border rounded-md'
                                readOnly
                            />
                        </div>
                        {!transactionAdded && (
                            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Create Bill</button>
                        )}
                    </form>
                </div>
            </main>
        </div>
    );
}

export default AddTransaction;
