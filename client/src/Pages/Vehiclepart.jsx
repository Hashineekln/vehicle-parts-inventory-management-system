import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function VehiclePart() {
    const [vehicleParts, setVehicleParts] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const partsRes = await axios.get('http://localhost:5000/vehiclepart');
                setVehicleParts(partsRes.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error fetching data. Please try again.');
            }
        };

        fetchData();
    }, []);

    // Filter parts based on search query
    const filteredParts = vehicleParts.filter(vp =>
        vp.part_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vp.part_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vp.price.toString().toLowerCase().includes(searchQuery.toLowerCase())||
        vp.shelf_id.toString().toLowerCase().includes(searchQuery.toLowerCase())||
        vp.models.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    const formatDecimal = (value) => {
        return parseFloat(value).toFixed(2); // Formats value to two decimal places
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
                        {filteredParts.map((vp, index) => (
                            <tr key={`${vp.part_no}-${index}`} className='bg-white border-b'>
                                <td className='py-4 px-6'>{vp.part_no}</td>
                                <td className='py-4 px-6'>{vp.part_name}</td>
                                <td className='py-4 px-6'>{formatDecimal(vp.price)} </td>
                                <td className='py-4 px-6'>{vp.threshold_no}</td>
                                <td className='py-4 px-6'>{vp.quantity}</td>
                                <td className='py-4 px-6'>{vp.category_name}</td>
                                <td className='py-4 px-6'>{vp.shelf_id}</td>
                                <td className='py-4 px-6'>{vp.models}-{vp.year} </td>
                                <td className='py-4 px-6'>
                                <Link to={`/vehiclepartupdate/${vp.part_no}`} className='bg-blue-500 px-4 py-2 text-white rounded-md mr-3'>Edit</Link>

                                    
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
