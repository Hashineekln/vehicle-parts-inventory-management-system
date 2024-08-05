import React, { useState } from 'react';
import axios from 'axios';
import { CategoryValidation } from './Vehiclevalidate'; 

function Categoryadd() {
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate input fields using CategoryValidation function
        const values = { categoryId, categoryName };
        const errors = CategoryValidation(values);

        if (Object.keys(errors).length > 0) {
            setErrorMessage(Object.values(errors).join('. ') + '.');
            return;
        }

        // If all fields are valid, proceed with adding category
        axios.post('http://localhost:5000/category', {
            category_id: categoryId,
            name: categoryName
        })
        .then(response => {
            console.log('Category Added', response);
            setSuccessMessage('Category added successfully');
            setCategoryId(''); // Clear input fields after successful addition
            setCategoryName('');
            setErrorMessage(''); // Clear any previous error messages
        })
        .catch(error => {
            console.error('Error adding Category', error);
            setErrorMessage('Failed to add Category. Check category id.');
            setSuccessMessage('');
        });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border p-10 rounded max-w-md">
                <form onSubmit={handleSubmit} className="mb-4">
                    <label className="block mb-2">
                        Category ID:
                        <input type="text" value={categoryId} onChange={e => setCategoryId(e.target.value)} className="block w-full py-2 px-9 border rounded mt-7" />
                    </label>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <label className="block mb-2">
                        Category Name:
                        <input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} className="block w-full py-2 px-9 border rounded mt-7" />
                    </label>
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    <button type="submit" className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700'>Add Category</button>
                </form>
            </div>
        </div>
    );
}

export default Categoryadd;
