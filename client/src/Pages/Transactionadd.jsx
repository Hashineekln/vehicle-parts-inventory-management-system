import React, { useState, useEffect, useRef } from 'react';


//total_amount should be auto calculated in the backend

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "../Components/Header";
import ReactToPrint from 'react-to-print';
import Footer from "../Components/Footer";

function AddTransaction() {
    const [suppliers, setSuppliers] = useState([]);
    const [vehicleParts, setVehicleParts] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [buying_price, setBuyingPrice] = useState('');
    const [vehiclePartPartNo, setVehiclePartPartNo] = useState('');
    const [supplierSupplierId, setSupplierSupplierId] = useState('');
    const [shelfId, setShelfId] = useState('');
    const [shelves, setShelves] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const componentRef = useRef(); // Define the ref here

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
            await axios.post('http://localhost:5000/transaction', {
                quantity,
                buying_price,
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
            <main className="flex-grow m-5 p-5 bg-white rounded shadow overflow-auto">
                <ReactToPrint
                    trigger={() => <button className="bg-blue-500 text-white p-2 mt-4">Print/Download</button>}
                    content={() => componentRef.current}
                />
                <div ref={componentRef} className="p-5">
                    <Header />

                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>

                    <h1 className="font-bold uppercase tracking-wide text-2xl mb-3">
   Transaction Recipt
  </h1>
<br></br>
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
                                onChange={(e) => setBuyingPrice(e.target.value)}
                                className='w-full px-3 py-2 border rounded-md'
                                required
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700'>Shelf ID</label>
                            <select
                                value={shelfId}
                                onChange={(e) => setShelfId(e.target.value)}
                                className='w-full px-3 py-2 border rounded-md'
                                required
                            >
                                <option value=''>Select Shelf</option>
                                {shelves.map(shelf => (
                                    <option key={shelf.shelf_id} value={shelf.shelf_id}>
                                        {shelf.shelf_id} - {shelf.shelf_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Print the Recipt</button>
                    </form>
                    <Footer />
                </div>
            </main>
        </div>
    );
}

export default AddTransaction;
