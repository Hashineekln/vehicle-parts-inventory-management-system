import React, { useState } from 'react';
import axios from 'axios';

function Vehicletypeadd() {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate if brand, model, and year are not empty
        if (!brand.trim() || !model.trim() || !year.trim()) {
            setErrorMessage('Please enter brand, model, and year.');
            return;
        }

        // If all fields are valid, proceed with adding vehicle type
        axios.post('http://localhost:5000/vehicletype', {
            brand: brand,
            model: model,
            year: year
        })
        .then(response => {
            console.log('Vehicle Type Added', response);
            setSuccessMessage('Vehicle type added successfully');
            setBrand(''); // Clear input fields after successful addition
            setModel('');
            setYear('');
            setErrorMessage(''); // Clear any previous error messages
        })
        .catch(error => {
            console.error('Error adding vehicle type', error);
            setErrorMessage('Failed to add vehicle type. Please try again.');
            setSuccessMessage('');
        });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border p-10 rounded max-w-md">
                <form onSubmit={handleSubmit} className="mb-4">
                    <label className="block mb-2">
                        Brand:
                        <input type="text" value={brand} onChange={e => setBrand(e.target.value)} className="block w-full py-2 px-3 border rounded mt-2" />
                    </label>
                    <label className="block mb-2">
                        Model:
                        <input type="text" value={model} onChange={e => setModel(e.target.value)} className="block w-full py-2 px-3 border rounded mt-2" />
                    </label>
                    <label className="block mb-2">
                        Year:
                        <input type="text" value={year} onChange={e => setYear(e.target.value)} className="block w-full py-2 px-3 border rounded mt-2" />
                    </label>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700">Add Vehicle Type</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </div>
    );
}

export default Vehicletypeadd;
