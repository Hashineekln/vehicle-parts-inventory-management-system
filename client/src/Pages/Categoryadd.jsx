import React, { useState } from 'react';
import axios from 'axios';

function Categoryadd() {
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate if first name and last name are not empty
        if (!categoryId.trim() || !categoryName.trim()) {
            setErrorMessage('Please enter both first name and last name.');
            return;
        }

        // If all fields are valid, proceed with adding client
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
            setErrorMessage('Failed to add Category. Please try again.');
            setSuccessMessage('');
        });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border p-10 rounded max-w-md">
                <form onSubmit={handleSubmit} className="mb-4">
                    <label className="block mb-2">
                    CategoryID:
                        <input type="text" value={categoryId} onChange={e => setCategoryId(e.target.value)} className="block w-full py-2 px-9 border rounded mt-7" />
                    </label>
                    <label className="block mb-2">
                    Category Name:
                        <input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} className="block w-full py-2 px-9 border rounded mt-7" />
                    </label>
                  
                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-2 hover:bg-green-700">Add Category</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </div>
    );
}

export default Categoryadd;
