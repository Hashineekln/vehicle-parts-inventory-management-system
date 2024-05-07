import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ShelfUpdate() {
    const { id } = useParams(); // Extract the id parameter from the URL

    const [shelfName, setShelfName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Fetch shelf details when the component mounts
        fetchShelf();
    }, []);

    const fetchShelf = () => {
        // Fetch shelf details based on the id parameter from the URL
        axios.get(`http://localhost:5000/shelf/${id}`)
            .then(response => {
                const { shelf_name } = response.data;
                setShelfName(shelf_name);
            })
            .catch(error => {
                console.error('Error fetching shelf:', error);
                setErrorMessage('Failed to fetch shelf details. Please try again.');
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate if shelf name is not empty
        if (!shelfName.trim()) {
            setErrorMessage('Please enter shelf name.');
            return;
        }

        // If the shelf name is valid, proceed with updating the shelf
        axios.put(`http://localhost:5000/shelf/${id}`, {
            shelf_name: shelfName
        })
        .then(response => {
            console.log('Shelf Updated', response);
            setSuccessMessage('Shelf updated successfully');
            setErrorMessage(''); // Clear any previous error messages
        })
        .catch(error => {
            console.error('Error updating shelf', error);
            setErrorMessage('Failed to update shelf. Please try again.');
            setSuccessMessage('');
        });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border p-10 rounded max-w-md">
                <form onSubmit={handleSubmit} className="mb-4">
                    <label className="block mb-2">
                        Shelf Name:
                        <input type="text" value={shelfName} onChange={e => setShelfName(e.target.value)} className="block w-full py-2 px-3 border rounded mt-1" />
                    </label>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700">Update Shelf</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </div>
    );
}

export default ShelfUpdate;
