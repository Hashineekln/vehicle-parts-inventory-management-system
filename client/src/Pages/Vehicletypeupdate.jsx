import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Dashboard from '../Components/AdminDash';
import { TypeValidation } from './Vehiclevalidate.jsx';

function VehicletypeUpdate() {
    const { id } = useParams(); // Extract the id parameter from the URL

    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch vehicle type details when the component mounts
        fetchVehicleType();
    }, []);

    const fetchVehicleType = () => {
        axios.get(`http://localhost:5000/vehicletype/${id}`)
            .then(response => {
                const data = response.data[0]; // Extract the first object from the array
                if (data && typeof data.brand !== 'undefined' && typeof data.model !== 'undefined' && typeof data.year !== 'undefined') {
                    setBrand(data.brand);
                    setModel(data.model);
                    setYear(data.year);
                } else {
                    setErrorMessage('Invalid data format received.');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching vehicle type:', error);
                setErrorMessage('Failed to fetch vehicle type details. Please try again.');
                setLoading(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the input fields using TypeValidation function
        const values = { brand, model, year };
        const errors = TypeValidation(values);

        if (Object.keys(errors).length > 0) {
            setErrorMessage(Object.values(errors).join('. ') + '.');
            return;
        }

        // If all fields are valid, proceed with updating vehicle type
        axios.put(`http://localhost:5000/vehicletype/${id}`, {
            brand: brand,
            model: model,
            year: year
        })
        .then(response => {
            console.log('Vehicle Type Updated', response);
            setSuccessMessage('Vehicle type updated successfully');
            setErrorMessage(''); // Clear any previous error messages
        })
        .catch(error => {
            console.error('Error updating vehicle type', error);
            setErrorMessage('Failed to update vehicle type. Please try again.');
            setSuccessMessage('');
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex h-screen">
           
            <main className="flex-grow m-5 p-5 bg-white rounded shadow overflow-auto">
                <div>
                    <form onSubmit={handleSubmit} className="mb-4">
                        <label className="block mb-2">
                            Brand:
                            <input type="text" value={brand} onChange={e => setBrand(e.target.value)} className="block w-full py-2 px-3 border rounded mt-1" required />
                        </label>
                        <label className="block mb-2">
                            Model:
                            <input type="text" value={model} onChange={e => setModel(e.target.value)} className="block w-full py-2 px-3 border rounded mt-1" required />
                        </label>
                        <label className="block mb-2">
                            Year:
                            <input type="text" value={year} onChange={e => setYear(e.target.value)} className="block w-full py-2 px-3 border rounded mt-1" required />
                        </label>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700">Update Vehicle Type</button>
                    </form>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                </div>
            </main>
        </div>
    );
}

export default VehicletypeUpdate;
