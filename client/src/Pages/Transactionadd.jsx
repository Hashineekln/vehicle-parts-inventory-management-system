import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

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
    const navigate = useNavigate();
    const componentRef = useRef();

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

            const { transaction_id } = response.data;
            setTransactionId(transaction_id);

            alert('Transaction added successfully');
            navigate(`/transaction/${transaction_id}`); // Redirect to transaction details page
        } catch (err) {
            console.error('Error adding transaction:', err);
            setError('Error adding transaction. Please try again.');
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <main className="flex-grow m-5 p-5 bg-white rounded shadow overflow-auto">
                <ReactToPrint
                    trigger={() => <button className="bg-blue-500 text-white p-2 mt-4">Print/Download</button>}
                    content={() => componentRef.current}
                />
                <div ref={componentRef} className="p-5">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="text-center mb-4">
                        <h1 className="font-bold uppercase tracking-wide text-3xl mb-3">Transaction Receipt</h1>
                        <div className="flex items-center justify-center">
                            <img src="src/assets/Logo.jpg" alt="LHI Company" className="w-36 h-36 mr-6" />
                        </div>
                        <div className="font-bold text-lg">LHI LOGISTIC</div>
                        <div>Address: No 164/B, Kottawa - Malabe Rd, Pannipitiya</div>
                        <div>Tel: +94 7652 996</div>
                        <div>Fax: 7684935493</div>
                    </div>
                    <div className="text-center mb-4">
                        {transactionId && <div>Transaction ID: {transactionId}</div>}
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-end mb-4 space-x-4">
                            <Link to="/supplieradd" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add New Supplier</Link>
                            <Link to="/Vehiclepartadd" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add New Part</Link>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>Supplier ID</label>
                            <select
                                value={supplierSupplierId}
                                onChange={(e) => setSupplierSupplierId(e.target.value)}
                                className='w-full px-3 py-2 border rounded-md'
                                required
                            >
                                <option value=''>Select Supplier</option>
                                {suppliers.map(supplier => (
                                    <option key={supplier.supplier_id} value={supplier.supplier_id}>
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
                            >
                                <option value=''>Select Vehicle Part</option>
                                {vehicleParts.map(part => (
                                    <option key={part.part_no} value={part.part_no}>
                                        {part.part_no} - {part.part_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>Quantity</label>
                            <input
                                type='number'
                                min='0'
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
                                min='0'
                                value={buyingPrice}
                                onChange={(e) => setBuyingPrice(e.target.value)}
                                className='w-full px-3 py-2 border rounded-md'
                                required
                            />
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
                        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Create bill</button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default AddTransaction;
