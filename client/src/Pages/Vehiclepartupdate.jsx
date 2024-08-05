import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { VehicleValidation } from './Vehiclevalidate.jsx';
import Dashboard from '../Components/AdminDash';

function VehiclePartUpdate() {
    const navigate = useNavigate(); //navigate to diffrwnt routes
    const { part_no } = useParams(); //extract the part no from url
    console.log("Part Number:", part_no);


//satate variables initialization
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
    const [errors, setErrors] = useState({});
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

                //vehicle_type_ids are derived by matching models
                const part = partRes.data;
                const vehicle_type_ids = part.models ? part.models.split(', ').map(model => {
                    const vt = vehicleTypesRes.data.find(vt => vt.model === model);
                    return vt ? vt.vehicle_id.toString() : null;
                }).filter(id => id !== null) : [];

                setPartData({
                    ...part,
                    category_id: part.category_category_id,
                    shelf_id: part.shelf_shelf_id.toString(),
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

    // updates the partData state when an name and value input field changes 
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPartData(prev => ({ ...prev, [name]: value }));
    };
//check handled by id
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        const stringValue = value.toString();

        setPartData(prev => ({
            ...prev,
            vehicle_type_ids: checked
                ? [...prev.vehicle_type_ids, stringValue]
                : prev.vehicle_type_ids.filter(id => id !== stringValue)
        }));
    };

    //validation and update of vehicle part
    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = VehicleValidation(partData);
        console.log("Validation Errors:", validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
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
        <div className="flex h-screen">
            
            <main className="flex-grow m-5 p-5 bg-white rounded shadow overflow-auto">
                <div className='w-full bg-white rounded p-3 shadow'>
                    <div className='flex justify-between mb-3'>
                        <h1 className='text-2xl font-semibold text-gray-200 dark:text-gray-950'>Update Vehicle Part</h1>
                        <Link to='/vehiclepart' className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700'>Back to List</Link>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit} className="flex flex-col justify-between items-start">
                        <label className="mb-2" htmlFor="part_name">Part Name:</label>
                        <input id="part_name" type="text" name="part_name" value={partData.part_name} onChange={handleInputChange} placeholder="Part Name" className="mb-3 p-2 border rounded-md border-gray-300 w-full"/>
                        {errors.part_name && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.part_name} </span>}

                        <label className="mb-2" htmlFor="price">Price:</label>
                        <input id="price" type="number" name="price" value={partData.price} onChange={handleInputChange} min='0' placeholder="Price" className="mb-3 p-2 border rounded-md border-gray-300 w-full"/>
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

                        <label className="mb-2" htmlFor="category_id">Category:</label>
                        <select id="category_id" name="category_id" value={partData.category_id} onChange={handleInputChange} className="mb-3 p-2 border rounded-md border-gray-300 w-full">
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.category_id} value={category.category_id}>
                                    {category.category_id} - {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.category_id} </span>}

                        <label className="mb-2" htmlFor="shelf_id">Shelf:</label>
                        <select id="shelf_id" name="shelf_id" value={partData.shelf_id} onChange={handleInputChange} className="mb-3 p-2 border rounded-md border-gray-300 w-full">
                            <option value="">Select Shelf</option>
                            {shelves.map(shelf => (
                                <option key={shelf.shelf_id} value={shelf.shelf_id}>
                                    {shelf.shelf_id} - {shelf.shelf_name}
                                </option>
                            ))}
                        </select>
                        {errors.shelf_id && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.shelf_id} </span>}

                        <label className="mb-2" htmlFor="vehicle_type_ids">Vehicle Types:</label>
                        <div className="mb-3 p-2 border rounded-md border-gray-300 w-full">
                            {vehicleTypes.map(vehicleType => (
                                <div key={vehicleType.vehicle_id}>
                                    <input id={vehicleType.vehicle_id} type="checkbox" name="vehicle_type_ids" value={vehicleType.vehicle_id} checked={partData.vehicle_type_ids.includes(vehicleType.vehicle_id.toString())} onChange={handleCheckboxChange}/>
                                    <label htmlFor={vehicleType.vehicle_id}>{vehicleType.vehicle_id} - {vehicleType.model}</label>
                                </div>
                            ))}
                        </div>
                        {errors.vehicle_type_ids && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.vehicle_type_ids} </span>}

                        <button type="submit" className="self-center rounded-md bg-green-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700">Update Vehicle Part</button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default VehiclePartUpdate;
