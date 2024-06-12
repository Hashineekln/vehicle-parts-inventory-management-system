import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function VehiclePartUpdate() {
    const navigate = useNavigate();
    const { part_no } = useParams();
    console.log("Part Number:", part_no);

    const [partData, setPartData] = useState({
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
                const [partRes, categoriesRes, shelvesRes, vehicleTypesRes] = await Promise.all([
                    axios.get(`http://localhost:5000/vehiclepart/${part_no}`),
                    axios.get('http://localhost:5000/category'),
                    axios.get('http://localhost:5000/shelf'),
                    axios.get('http://localhost:5000/vehicletype')
                ]);

                console.log("Fetched Part Data:", partRes.data);
                console.log("Fetched Categories Data:", categoriesRes.data);
                console.log("Fetched Shelves Data:", shelvesRes.data);
                console.log("Fetched Vehicle Types Data:", vehicleTypesRes.data);

                const part = partRes.data;
                const vehicle_type_ids = part.models ? part.models.split(', ').map(model => {
                    const vt = vehicleTypesRes.data.find(vt => vt.model === model);
                    return vt ? vt.vehicle_id.toString() : null; // Convert to string here
                }).filter(id => id !== null) : [];

                setPartData({
                    ...part,
                    category_id: part.category_category_id, // Ensure correct category ID
                    shelf_id: part.shelf_shelf_id.toString(), // Convert to string if necessary
                    vehicle_type_ids
                });
                setCategories(categoriesRes.data);
                setShelves(shelvesRes.data);
                setVehicleTypes(vehicleTypesRes.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data. Please try again.');
            }
        };

        fetchData();
    }, [part_no]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPartData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        const stringValue = value.toString(); // Ensure value is a string

        if (checked) {
            setPartData(prev => ({ ...prev, vehicle_type_ids: [...prev.vehicle_type_ids, stringValue] }));
        } else {
            setPartData(prev => ({ ...prev, vehicle_type_ids: prev.vehicle_type_ids.filter(id => id !== stringValue) }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!partData.part_name || !partData.price || !partData.threshold_no || !partData.quantity || !partData.image_url || !partData.category_id || !partData.shelf_id || partData.vehicle_type_ids.length === 0) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            await axios.put(`http://localhost:5000/vehiclepart/${part_no}`, partData);
            alert('Vehicle part updated successfully!');
            navigate('/vehiclepart');
        } catch (err) {
            console.error('Error updating vehicle part:', err);
            setError('Failed to update vehicle part. Please try again.');
        }
    };

    return (
        <div className='overflow-x-auto relative flex-1 p-4'>
            <div className='w-full bg-white rounded p-3 shadow'>
                <div className='flex justify-between mb-3'>
                    <h1 className='text-2xl font-semibold text-gray-200 dark:text-gray-950'>Update Vehicle Part</h1>
                    <Link to='/vehiclepart' className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Back to List</Link>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col justify-between items-start">
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
                           <option key={category.category_id} value={category.category_id}>
                               {category.category_id} - {category.name}
                           </option>
                        ))}
                    </select>

                    <label className="mb-2" htmlFor="shelf_id">Shelf:</label>
                    <select id="shelf_id" name="shelf_id" value={partData.shelf_id} onChange={handleInputChange} className="mb-3 p-2 border rounded-md border-gray-300 w-full">
                        <option value="">Select Shelf</option>
                        {shelves.map(shelf => (
                           <option key={shelf.shelf_id} value={shelf.shelf_id}>
                               {shelf.shelf_id} - {shelf.shelf_name}
                           </option>
                        ))}
                    </select>

                    <label className="mb-2">Vehicle Types:</label>
                    {vehicleTypes.map(vehicle_type => (
                        <div key={vehicle_type.vehicle_id}>
                            <input 
                                type="checkbox" 
                                id={`vehicle_type_${vehicle_type.vehicle_id}`} 
                                name="vehicle_type_ids" 
                                value={vehicle_type.vehicle_id.toString()} // Convert to string here
                                checked={partData.vehicle_type_ids.includes(vehicle_type.vehicle_id.toString())} // Ensure comparison is correct
                                onChange={handleCheckboxChange} 
                            />
                            <label htmlFor={`vehicle_type_${vehicle_type.vehicle_id}`}>{vehicle_type.model}-{vehicle_type.year} </label>
                        </div>
                    ))}

                    <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default VehiclePartUpdate;
