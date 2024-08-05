import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { VehicleValidation } from './Vehiclevalidate.jsx';
import Dashboard from '../Components/AdminDash';

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
    const [errors, setErrors] = useState({});

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

        // copy of part data there are no accidental spaces
        const trimmedPartData = {
            ...partData,
            part_no: partData.part_no.trim(),
            part_name: partData.part_name.trim(),
            image_url: partData.image_url.trim(),
        };

        const validationErrors = VehicleValidation(trimmedPartData);
        console.log("Validation Errors:", validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            console.log('Submitting data:', trimmedPartData); // Log the payload
            await axios.post('http://localhost:5000/vehiclepart', trimmedPartData);
            alert('Vehicle part added successfully!');
            navigate('/vehiclepart');
        } catch (err) {
            console.error('Error adding vehicle part:', err.response || err);
            setError('Failed to add vehicle part. Please try again.');
        }
    };

    return (
        <div className="flex h-screen">
           
            <main className="flex-grow m-5 p-5 bg-white rounded shadow overflow-auto">
                <div className='w-full bg-white rounded p-3 shadow'>
                    <div className='flex justify-between mb-3'>
                        <h1 className='text-2xl font-semibold text-gray-200 dark:text-gray-950'>Add Vehicle Part</h1>
                        
                        <Link to='/vehiclepart' className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700'>Back to List</Link>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit} className="flex flex-col justify-between items-start w-full">
                        <label className="mb-2" htmlFor="part_no">Part Number:</label>
                        <input id="part_no" type="text" name="part_no" value={partData.part_no} onChange={handleInputChange} placeholder="Part Number" className="mb-3 p-2 border rounded-md border-gray-300 w-full"/>
                        {errors.part_no && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.part_no} </span>}

                        <label className="mb-2" htmlFor="part_name">Part Name:</label>
                        <input id="part_name" type="text" name="part_name" value={partData.part_name} onChange={handleInputChange} placeholder="Part Name" className="mb-3 p-2 border rounded-md border-gray-300 w-full"/>
                        {errors.part_name && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.part_name} </span>}

                        <label className="mb-2" htmlFor="price">Price:</label>
                        <input id="price" type="number" name="price" value={partData.price} min='0' onChange={handleInputChange} placeholder="Price" className="mb-3 p-2 border rounded-md border-gray-300 w-full"/>
                        {errors.price && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.price} </span>}

                        <label className="mb-2" htmlFor="threshold_no">Threshold Number:</label>
                        <input id="threshold_no" type="number" name="threshold_no" value={partData.threshold_no} min='0' onChange={handleInputChange} placeholder="Threshold Number" className="mb-3 p-2 border rounded-md border-gray-300 w-full"/>
                        {errors.threshold_no && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.threshold_no} </span>}

                        <label className="mb-2" htmlFor="quantity">Quantity:</label>
                        <input id="quantity" type="number" name="quantity" value={partData.quantity} min='0' onChange={handleInputChange} placeholder="Quantity" className="mb-3 p-2 border rounded-md border-gray-300 w-full"/>
                        {errors.quantity && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.quantity} </span>}

                        <label className="mb-2" htmlFor="image_url">Image URL:</label>
                        <input id="image_url" type="text" name="image_url" value={partData.image_url} onChange={handleInputChange} placeholder="Image URL" className="mb-3 p-2 border rounded-md border-gray-300 w-full"/>
                        {errors.image_url && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.image_url} </span>}

                        <div className="flex items-center justify-between w-full mb-2">
                            <label htmlFor="category_id" className="block">Category:</label>
                            <Link to='/category' className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700'>New Category</Link>
                        </div>
                        <select id="category_id" name="category_id" value={partData.category_id} onChange={handleInputChange} className="mb-3 p-2 border rounded-md border-gray-300 w-full">
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.category_id} value={category.category_id}>
                                    {category.category_id} - {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.category_id} </span>}

                        <div className="flex items-center justify-between w-full mb-2">
                            <label htmlFor="shelf_id" className="block">Shelf:</label>
                            <Link to='/shelf' className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700'>New Shelf</Link>
                        </div>
                        <select id="shelf_id" name="shelf_id" value={partData.shelf_id} onChange={handleInputChange} className="mb-3 p-2 border rounded-md border-gray-300 w-full">
                         

                            <option value="">Select Shelf</option>
                            {shelves.map(shelf => (
                                <option key={shelf.shelf_id} value={shelf.shelf_id}>
                                    {shelf.shelf_id} - {shelf.shelf_name}
                                </option>
                            ))}
                        </select>
                        {errors.shelf_id && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.shelf_id} </span>}

                        <div className="flex items-center justify-between w-full mb-2">
                            <label className="block">Vehicle Types:</label>
                            <Link to='/vehicletype' className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700'>New Model</Link>
                        </div>
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
                                <label htmlFor={`vehicle_type_${vehicle_type.vehicle_id}`}>{vehicle_type.model} - {vehicle_type.year}</label>
                            </div>
                        ))}
                        {errors.vehicle_type_ids && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.vehicle_type_ids} </span>}

                        <button type="submit" className="bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Submit</button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default VehiclePartAdd;
