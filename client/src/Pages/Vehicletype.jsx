import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Vehicletype() {
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch data from the backend when the component mounts
        fetchVehicleData();
    }, []);

    const fetchVehicleData = () => {
        axios.get('http://localhost:5000/vehicletype') // Make sure this URL is correct
            .then(res => {
                setVehicles(res.data);
                setFilteredVehicles(res.data);
                setError(null);
            })
            .catch(err => {
                console.error('Error fetching vehicles:', err);
                setError('Error fetching vehicles. Please try again.');
            });
    };

    const filterVehicles = () => {
        if (searchQuery.trim() === '') {
            setFilteredVehicles(vehicles);
        } else {
            const filtered = vehicles.filter(vehicle => {
                return (
                    vehicle.vehicle_id.toString().includes(searchQuery) ||
                    vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    vehicle.year.toString().includes(searchQuery)
                );
            });
            setFilteredVehicles(filtered);
        }
    };

    useEffect(() => {
        filterVehicles();
    }, [searchQuery, vehicles]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/vehicletype/${id}`)
            .then(() => {
                setVehicles(vehicles.filter(vehicle => vehicle.vehicle_id !== id));
                alert('Vehicle details deleted successfully');
            })
            .catch(err => {
                console.error('Error deleting vehicle:', err);
                setError('Error deleting vehicle. Please try again.');
            });
    };

    return (
        <div className='overflow-x-auto relative flex-1 p-4'>
            <div className='w-full bg-white rounded p-3'>
                <div className='flex justify-between mb-3'>
                    <h1 className='text-2xl font-semibold text-gray-200 dark:text-gray-950'>Vehicle Types</h1>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search by Vehicle ID, Brand, Model, or Year"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-72 mr-3 px-3 py-1.5"
                        />
                        <Link to='/VehicleTypeAdd' className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Add Vehicle</Link>
                    </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <table className='w-full text-sm text-left text-gray-50 dark:text-gray-950'>
                    <thead className='text-xs text-gray-950 uppercase bg-gray-50 dark:bg-slate-80 dark:text-gray-950'>
                        <tr>
                            <th className='py-3 px-6'>Vehicle ID</th>
                            <th className='py-3 px-6'>Brand</th>
                            <th className='py-3 px-6'>Model</th>
                            <th className='py-3 px-6'>Year</th>
                            <th className='py-3 px-6'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVehicles.map((vehicle_type, index) => (
                            <tr key={index} className='bg-white border-b dark:bg-gray-100 dark:border-gray-200'>
                                <td className='py-4 px-6'>{vehicle_type.vehicle_id}</td>
                                <td className='py-4 px-6'>{vehicle_type.brand}</td>
                                <td className='py-4 px-6'>{vehicle_type.model}</td>
                                <td className='py-4 px-6'>{vehicle_type.year}</td>
                                <td className='py-4 px-6'>
                                    <Link to={`/Vehicletypeupdate/${vehicle_type.vehicle_id}`} className='rounded-md bg-blue-500  px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Edit</Link>
                                    <button className='rounded-md bg-red-500  px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-3' onClick={() => handleDelete(vehicle_type.vehicle_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Vehicletype;
