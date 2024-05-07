import React, { useState } from 'react';
import axios from 'axios';

function Shelfadd() {
    const [shelfName, setShelfName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate if shelf name is not empty
        if (!shelfName.trim()) {
            setErrorMessage('Please enter shelf name.');
            return;
        }

        // If the shelf name is valid, proceed with adding the shelf
        axios.post('http://localhost:5000/shelf', {
            shelf_name: shelfName
        })
        .then(response => {
            console.log('Shelf Added', response);
            setSuccessMessage('Shelf added successfully');
            setShelfName(''); // Clear input field after successful addition
            setErrorMessage(''); // Clear any previous error messages
        })
        .catch(error => {
            console.error('Error adding shelf', error);
            setErrorMessage('Failed to add shelf. Please try again.');
            setSuccessMessage('');
        });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border p-10 rounded max-w-md">
                <form onSubmit={handleSubmit} className="mb-4">
                    <label className="block mb-2">
                        Shelf Name:
                        <input type="text" value={shelfName} onChange={e => setShelfName(e.target.value)} className="block w-full py-2 px-3 border rounded mt-2" />
                    </label>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700">Add Shelf</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </div>
    );
}

export default Shelfadd;
