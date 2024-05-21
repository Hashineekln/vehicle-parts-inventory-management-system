import React, { useState } from 'react';
import axios from 'axios';

function SupplierAdd() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [addressLine3, setAddressLine3] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate if all required fields are not empty
        if (!firstName.trim() || !lastName.trim() || !companyName.trim()) {
            setErrorMessage('Please enter first name, last name, and company name.');
            return;
        }

        // If all fields are valid, proceed with adding supplier
        axios.post('http://localhost:5000/supplier', {
            first_name: firstName,
            last_name: lastName,
            company_name: companyName,
            address_line1: addressLine1,
            address_line2: addressLine2,
            address_line3: addressLine3
        })
        .then(response => {
            console.log('Supplier Added', response);
            setSuccessMessage('Supplier added successfully');
            setFirstName(''); // Clear input fields after successful addition
            setLastName('');
            setCompanyName('');
            setAddressLine1('');
            setAddressLine2('');
            setAddressLine3('');
            setErrorMessage(''); // Clear any previous error messages
        })
        .catch(error => {
            console.error('Error adding supplier', error);
            setErrorMessage('Failed to add supplier. Please try again.');
            setSuccessMessage('');
        });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border p-10 rounded max-w-md">
                <form onSubmit={handleSubmit} className="mb-4">
                    <label className="block mb-2">
                        First Name:
                        <input
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className="block w-full py-2 px-9 border rounded mt-7"
                        />
                    </label>
                    <label className="block mb-2">
                        Last Name:
                        <input
                            type="text"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className="block w-full py-2 px-9 border rounded mt-7"
                        />
                    </label>
                    <label className="block mb-2">
                        Company Name:
                        <input
                            type="text"
                            value={companyName}
                            onChange={e => setCompanyName(e.target.value)}
                            className="block w-full py-2 px-9 border rounded mt-7"
                        />
                    </label>
                    <label className="block mb-2">
                        Address Line 1:
                        <input
                            type="text"
                            value={addressLine1}
                            onChange={e => setAddressLine1(e.target.value)}
                            className="block w-full py-2 px-9 border rounded mt-7"
                        />
                    </label>
                    <label className="block mb-2">
                        Address Line 2:
                        <input
                            type="text"
                            value={addressLine2}
                            onChange={e => setAddressLine2(e.target.value)}
                            className="block w-full py-2 px-9 border rounded mt-7"
                        />
                    </label>
                    <label className="block mb-2">
                        Address Line 3:
                        <input
                            type="text"
                            value={addressLine3}
                            onChange={e => setAddressLine3(e.target.value)}
                            className="block w-full py-2 px-9 border rounded mt-7"
                        />
                    </label>
                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-2 hover:bg-green-700">
                        Add Supplier
                    </button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </div>
    );
}

export default SupplierAdd;
