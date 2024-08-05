import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ShelfValidation } from './Vehiclevalidate'; 

function ShelfUpdate() {
    const { id } = useParams(); // Extract the id parameter from the URL

    const [shelfName, setShelfName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch shelf details when the component mounts
        fetchShelf();
    }, []);

    const fetchShelf = () => {
        // Fetch shelf details based on the id parameter from the URL
        axios.get(`http://localhost:5000/shelf/${id}`)
            .then(response => {
                const data = response.data[0]; // Extract the first object from the array if it's an array
                if (data && typeof data.shelf_name !== 'undefined') {
                    setShelfName(data.shelf_name);
                } else {
                    setErrorMessage('Invalid data format received.');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching shelf:', error);
                setErrorMessage('Failed to fetch shelf details. Please try again.');
                setLoading(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the shelf name
        const validationErrors = ShelfValidation({ shelfName });
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setErrorMessage('Please correct the errors before submitting.');
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
            setErrors({});
        })
        .catch(error => {
            console.error('Error updating shelf', error);
            setErrorMessage('Failed to update shelf. Please try again.');
            setSuccessMessage('');
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border p-10 rounded max-w-md">
                <form onSubmit={handleSubmit} className="mb-4">
                    <label className="block mb-2">
                        Shelf Name:
                        <input 
                            type="text" 
                            value={shelfName} 
                            onChange={e => setShelfName(e.target.value)} 
                            className="block w-full py-2 px-3 border rounded mt-1" 
                        />
                    </label>
                    {errors.shelfName && <p style={{ color: 'red' }}>{errors.shelfName}</p>}
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700">
                        Update Shelf
                    </button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </div>
    );
}

export default ShelfUpdate;
