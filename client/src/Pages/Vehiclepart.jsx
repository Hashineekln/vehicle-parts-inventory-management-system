import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function VehiclePart() {
    const [vehicleParts, setVehicleParts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [shelves, setShelves] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [partVehicleTypes, setPartVehicleTypes] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const partsRes = await axios.get('http://localhost:5000/vehiclepart');
                const categoriesRes = await axios.get('http://localhost:5000/category');
                const shelvesRes = await axios.get('http://localhost:5000/shelf');
                const vehicleTypesRes = await axios.get('http://localhost:5000/vehicletype');
                const partVehicleTypesRes = await axios.get('http://localhost:5000/vehiclepart/vehicleparthasvehicletype'); // Correct endpoint

                setVehicleParts(partsRes.data);
                setCategories(categoriesRes.data);
                setShelves(shelvesRes.data);
                setVehicleTypes(vehicleTypesRes.data);
                setPartVehicleTypes(partVehicleTypesRes.data);
                console.log(partVehicleTypesRes.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error fetching data. Please try again.');
            }
        };

        fetchData();
    }, []);

    const filteredParts = vehicleParts.filter(vp => {
        return (
            vp.part_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vp.part_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vp.price.toString().includes(searchQuery)
        );
    });

    const getVehicleTypeNames = (part_no) => {
        return partVehicleTypes
            .filter(pvt => pvt.vehicle_part_part_no === part_no)
            .map(pvt => vehicleTypes.find(vt => vt.vehicle_id === pvt.vehicle_type_vehicle_id)?.model)
            .join(', ');
    };

    const handleDelete = async (part_no) => {
        try {
            await axios.delete(`http://localhost:5000/vehiclepart/${part_no}`);
            setVehicleParts(vehicleParts.filter(vp => vp.part_no !== part_no));
        } catch (err) {
            console.error('Error deleting part:', err);
            setError('Error deleting part. Please try again.');
        }
    };

    return (
        <div className='overflow-x-auto relative flex-1 p-4'>
            <div className='w-full bg-white rounded p-3'>
                <div className='flex justify-between mb-3'>
                    <h1 className='text-2xl font-semibold text-gray-200 dark:text-gray-950'>Vehicle Parts</h1>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search by part number, name, or price"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-72 mr-3 px-3 py-1.5"
                        />
                        <Link to='/vehiclepartadd' className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700'>Add Vehicle Part</Link>
                    </div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <table className='w-full text-sm text-left text-gray-900'>
                    <thead className='text-xs uppercase bg-gray-200'>
                        <tr>
                            <th className='py-3 px-6'>Part Number</th>
                            <th className='py-3 px-6'>Part Name</th>
                            <th className='py-3 px-6'>Price</th>
                            <th className='py-3 px-6'>Threshold No</th>
                            <th className='py-3 px-6'>Quantity</th>
                            <th className='py-3 px-6'>Category</th>
                            <th className='py-3 px-6'>Shelf</th>
                            <th className='py-3 px-6'>Vehicle Type</th>
                            <th className='py-3 px-6'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredParts.map(vp => (
                            <tr key={vp.part_no} className='bg-white border-b'>
                                <td className='py-4 px-6'>{vp.part_no}</td>
                                <td className='py-4 px-6'>{vp.part_name}</td>
                                <td className='py-4 px-6'>{vp.price}</td>
                                <td className='py-4 px-6'>{vp.threshold_no}</td>
                                <td className='py-4 px-6'>{vp.quantity}</td>
                                <td className='py-4 px-6'>{categories.find(c => c.category_id === vp.category_category_id)?.name}</td>
                                <td className='py-4 px-6'>{shelves.find(s => s.shelf_id === vp.shelf_shelf_id)?.shelf_id}</td>
                                <td className='py-4 px-6'>{getVehicleTypeNames(vp.part_no)}</td>

                                <td className='py-4 px-6'>
                                    <Link to={`/vehiclepartupdate/${vp.part_no}`} className='bg-blue-500 px-4 py-2 text-white rounded-md mr-3'>Edit</Link>
                                    <button onClick={() => handleDelete(vp.part_no)} className='bg-red-500 px-2 py-1.5 text-white rounded-md'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default VehiclePart;

