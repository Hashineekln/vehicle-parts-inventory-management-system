import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Shelf() {
    const [shelves, setShelves] = useState([]);
    const [filteredShelves, setFilteredShelves] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch data from the backend when the component mounts
        fetchShelfData();
    }, []);

    const fetchShelfData = () => {
        axios.get('http://localhost:5000/shelf') // Make sure this URL is correct
            .then(res => {
                setShelves(res.data);
                setFilteredShelves(res.data);
                setError(null);
            })
            .catch(err => {
                console.error('Error fetching shelves:', err);
                setError('Error fetching shelves. Please try again.');
            });
    };

    const filterShelves = () => {
        if (searchQuery.trim() === '') {
            setFilteredShelves(shelves);
        } else {
            const filtered = shelves.filter(shelf => {
                return (
                    shelf.shelf_id.toString().includes(searchQuery) ||
                    shelf.shelf_name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
            setFilteredShelves(filtered);
        }
    };

    useEffect(() => {
        filterShelves();
    }, [searchQuery, shelves]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/shelf/${id}`)
            .then(() => {
                setShelves(shelves.filter(shelf => shelf.shelf_id !== id));
                alert('Shelf details deleted successfully');
            })
            .catch(err => {
                console.error('Error deleting shelf:', err);
                setError('Error deleting shelf. Please try again.');
            });
    };

    return (
        <div className='overflow-x-auto relative flex-1 p-4'>
            <div className='w-full bg-white rounded p-3'>
                <div className='flex justify-between mb-3'>
                    <h1 className='text-2xl font-semibold text-gray-200 dark:text-gray-950'>Shelves</h1>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search by Shelf ID or Name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-72 mr-3 px-3 py-1.5"
                        />
                        <Link to='/ShelfAdd' className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Add Shelf</Link>
                    </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <table className='w-full text-sm text-left text-gray-50 dark:text-gray-950'>
                    <thead className='text-xs text-gray-950 uppercase bg-gray-50 dark:bg-slate-80 dark:text-gray-950'>
                        <tr>
                            <th className='py-3 px-6'>Shelf ID</th>
                            <th className='py-3 px-6'>Shelf Name</th>
                            <th className='py-3 px-6'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredShelves.map((shelf, index) => (
                            <tr key={index} className='bg-white border-b dark:bg-gray-100 dark:border-gray-200'>
                                <td className='py-4 px-6'>{shelf.shelf_id}</td>
                                <td className='py-4 px-6'>{shelf.shelf_name}</td>
                                <td className='py-4 px-6'>
                                    <Link to={`/ShelfUpdate/${shelf.shelf_id}`} className='rounded-md bg-blue-500  px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Edit</Link>
                                    <button className='rounded-md bg-red-500  px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-3' onClick={() => handleDelete(shelf.shelf_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Shelf;
