import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Category() {
    const [categorys, setCategorys] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/category')
            .then(res => {
                setCategorys(res.data);
                setError(null);
            })
            .catch(err => {
                console.error('Error fetching category:', err);
                setError('Error fetching category. Please try again.');
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/category/${id}`)
            .then(() => {
                setCategorys(categorys.filter(category => category.category_id !== id));
                alert('Category details deleted successfully');
            })
            .catch(err => {
                console.error('Error deleting category:', err);
                setError('Error deleting category. Please try again.');
            });
    };

    const filteredCategorys = categorys.filter(category =>
        category.category_id.toString().includes(searchTerm) ||
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='overflow-x-auto relative flex-1 p-4'>
            <div className='w-full bg-white rounded p-3'>
                <div className='flex justify-between mb-3'>
                    <h1 className='text-2xl font-semibold text-gray-200 dark:text-gray-950'>Category</h1>
                    <div className='flex items-center'>
                        <input
                            type='text'
                            placeholder='Search by ID or Name'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm mr-2 px-3 py-1'
                        />
                        <Link to='/Categoryadd' className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Add Category</Link>
                    </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <table className='w-full text-sm text-left text-gray-50 dark:text-gray-950'>
                    <thead className='text-xs text-gray-950 uppercase bg-gray-50 dark:bg-slate-80 dark:text-gray-950'>
                        <tr>
                            <th className='py-3 px-6'>Category ID</th>
                            <th className='py-3 px-6'>Category Name</th>
                            <th className='py-3 px-6'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategorys.map(category => (
                            <tr key={category.category_id} className='bg-white border-b dark:bg-gray-100 dark:border-gray-200'>
                                <td className='py-4 px-6'>{category.category_id}</td>
                                <td className='py-4 px-6'>{category.name}</td>
                                <td className='py-4 px-6'>
                                    <Link to={`/Categoryupdate/${category.category_id}`} className='rounded-md bg-blue-500  px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Edit</Link>
                                    <button className='rounded-md bg-red-500  px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-3' onClick={() => handleDelete(category.category_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Category;
