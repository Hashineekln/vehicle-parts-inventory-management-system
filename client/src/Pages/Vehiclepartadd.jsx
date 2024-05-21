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
    
                console.log("Categories:", categoriesRes.data);
                console.log("Shelves:", shelvesRes.data);
                console.log("Vehicle Types:", vehicleTypesRes.data);
    
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

    const handleMultiSelectChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setPartData(prev => ({ ...prev, vehicle_type_ids: selectedOptions }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!partData.part_no || !partData.part_name || !partData.price || !partData.shelf_id || !partData.category_id) {
            alert('Please fill in all required fields.');
            return;
        }
    
        try {
            await axios.post('http://localhost:5000/vehiclepart', partData);
            alert('Vehicle part added successfully!');
            navigate('/vehicleparts'); // using navigate instead of history.push
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
                    <Link to='/vehicleparts' className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Back to List</Link>
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

                    <label className="mb-2" htmlFor="category_id">Category:</label>
                    <select id="category_id" name="category_id" value={partData.category_id} onChange={handleInputChange} className="mb-3 p-2 border rounded-md border-gray-300 w-full">
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>

                    <label className="mb-2" htmlFor="shelf_id">Shelf:</label>
                    <select id="shelf_id" name="shelf_id" value={partData.shelf_id} onChange={handleInputChange} className="mb-3 p-2 border rounded-md border-gray-300 w-full">
                        {shelves.map(shelf => (
                            <option key={shelf.id} value={shelf.id}>{shelf.shelf_id}</option>
                        ))}
                    </select>

                    <label className="mb-2" htmlFor="vehicle_type_ids">Vehicle Types:</label>
                    <select id="vehicle_type_ids" multiple value={partData.vehicle_type_ids.map(id => id.toString())} onChange={handleMultiSelectChange} className="mb-3 p-2 border rounded-md border-gray-300 w-full">
                        {vehicleTypes.map(vehicle_type => (
                            <option key={vehicle_type.vehicle_id} value={vehicle_type.vehicle_id}>{vehicle_type.model}</option>
                        ))}
                    </select>

                    <button type="submit" className='mt-3 rounded-md bg-blue-500 px-4 py-2 text-white shadow-sm hover:bg-green-700'>Add Vehicle Part</button>
                </form>

            </div>
        </div>
    );
}

export default VehiclePartAdd;
