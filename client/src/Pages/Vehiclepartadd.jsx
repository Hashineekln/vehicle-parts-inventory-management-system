import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function VehiclePartAdd() {
    const navigate = useNavigate();
    const [partData, setPartData] = useState({
        part_no: '',
        part_name: '',
        price: '',
        threshold_no: '',
        quantity: '',
        image_url: '',
        category_id: '',
        shelf_id: '',
        vehicle_type_ids: []
    });
    const [categories, setCategories] = useState([]);
    const [shelves, setShelves] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, shelvesRes, vehicleTypesRes] = await Promise.all([
                    axios.get('http://localhost:5000/category'),
                    axios.get('http://localhost:5000/shelf'),
                    axios.get('http://localhost:5000/vehicletype')
                ]);

                setCategories(categoriesRes.data);
                setShelves(shelvesRes.data);
                setVehicleTypes(vehicleTypesRes.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data. Please try again.');
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPartData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setPartData(prev => ({ ...prev, vehicle_type_ids: [...prev.vehicle_type_ids, value] }));
        } else {
            setPartData(prev => ({ ...prev, vehicle_type_ids: prev.vehicle_type_ids.filter(id => id !== value) }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!partData.part_no || !partData.part_name || !partData.price || !partData.threshold_no || !partData.quantity || !partData.image_url || !partData.shelf_id || !partData.category_id || partData.vehicle_type_ids.length === 0) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            await axios.post('http://localhost:5000/vehiclepart', partData);
            alert('Vehicle part added successfully!');
            navigate('/vehiclepart');
        } catch (err) {
            console.error('Error adding vehicle part:', err);
            setError('Failed to add vehicle part. Please try again.');
        }
    };

    return (
        <div className='overflow-x-auto relative flex-1 p-4'>
            <div className='w-full bg-white rounded p-3 shadow'>
                <div className='flex justify-between mb-3'>
                    <h1 className='text-2xl font-semibold text-gray-200 dark:text-gray-950'>Add Vehicle Part</h1>
                    <Link to='/vehicleparts' className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700'>Back to List</Link>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col justify-between items-start">
                    <label className="mb-2" htmlFor="part_no">Part Number:</label>
                    <input id="part_no" type="text" name="part_no" value={partData.part_no} onChange={handleInputChange} placeholder="Part Number" className="mb-3 p-2 border rounded-md border-gray-300 w-full"/>

                    <label className="mb-2" htmlFor="part_name">Part Name:</label>
                    <input id="part_name" type="text" name="part_name" value={partData.part_name} onChange={handleInputChange} placeholder="Part Name" className="mb-3 p-2 border rounded-md border-gray-300 w-full"/>

                    <label className="mb-2" htmlFor="price">Price:</label>
                    <input id="price" type="number" name="price" value={partData.price} onChange={handleInputChange} placeholder="Price" className="mb-3 p-2 border rounded-md border-gray-300 w-full"/>

                    <label className="mb-2" htmlFor="threshold_no">Threshold Number:</label>
                    <input id="threshold_no" type="number" name="threshold_no" value={partData.threshold_no} onChange={handleInputChange} placeholder="Threshold Number" className="mb-3 p-2 border rounded-md border-gray-300 w-full"/>

                    <label className="mb-2" htmlFor="quantity">Quantity:</label>
                    <input id="quantity" type="number" name="quantity" value={partData.quantity} onChange={handleInputChange} placeholder="Quantity" className="mb-3 p-2 border rounded-md border-gray-300 w-full"/>

                    <label className="mb-2" htmlFor="image_url">Image URL:</label>
                    <input id="image_url" type="text" name="image_url" value={partData.image_url} onChange={handleInputChange} placeholder="Image URL" className="mb-3 p-2 border rounded-md border-gray-300 w-full"/>

                    <label className="mb-2" htmlFor="category_id">Category:</label>
                    <select id="category_id" name="category_id" value={partData.category_id} onChange={handleInputChange} className="mb-3 p-2 border rounded-md border-gray-300 w-full">
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.category_id}</option>
                        ))}
                    </select>

                    <label className="mb-2" htmlFor="shelf_id">Shelf:</label>
                    <select id="shelf_id" name="shelf_id" value={partData.shelf_id} onChange={handleInputChange} className="mb-3 p-2 border rounded-md border-gray-300 w-full">
                        <option value="">Select Shelf</option>
                        {shelves.map(shelf => (
                            <option key={shelf.id} value={shelf.id}>{shelf.shelf_id}</option>
                        ))}
                    </select>

                    <label className="mb-2">Vehicle Types:</label>
                    {vehicleTypes.map(vehicle_type => (
                        <div key={vehicle_type.vehicle_id}>
                            <input 
                                type="checkbox" 
                                id={`vehicle_type_${vehicle_type.vehicle_id}`} 
                                name="vehicle_type_ids" 
                                value={vehicle_type.vehicle_id} 
                                checked={partData.vehicle_type_ids.includes(vehicle_type.vehicle_id.toString())}
                                onChange={handleCheckboxChange} 
                            />
                            <label htmlFor={`vehicle_type_${vehicle_type.vehicle_id}`}>{vehicle_type.model}</label>
                        </div>
                    ))}

                    <button type="submit" className='mt-3 rounded-md bg-blue-500 px-4 py-2 text-white shadow-sm hover:bg-green-700'>Add Vehicle Part</button>
                </form>
            </div>
        </div>
    );
}

export default VehiclePartAdd;
