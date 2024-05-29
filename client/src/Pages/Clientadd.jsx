import React, { useState } from 'react';
import axios from 'axios';

function Clientadd() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState(''); // New state for phone
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate if first name, last name, and phone are not empty
        if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
            setErrorMessage('Please enter first name, last name, and phone.');
            return;
        }

        // If all fields are valid, proceed with adding client
        axios.post('http://localhost:5000/client', {
            first_name: firstName,
            last_name: lastName,
            phone: phone // Include phone in the request body
        })
        .then(response => {
            console.log('Client Added', response);
            setSuccessMessage('Client added successfully');
            setFirstName(''); // Clear input fields after successful addition
            setLastName('');
            setPhone('');
            setErrorMessage(''); // Clear any previous error messages
        })
        .catch(error => {
            console.error('Error adding client', error);
            setErrorMessage('Failed to add client. Please try again.');
            setSuccessMessage('');
        });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border p-10 rounded max-w-md">
                <form onSubmit={handleSubmit} className="mb-4">
                    <label className="block mb-2">
                        First Name:
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="block w-full py-2 px-9 border rounded mt-2" />
                    </label>
                    <label className="block mb-2">
                        Last Name:
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="block w-full py-2 px-9 border rounded mt-2" />
                    </label>
                    <label className="block mb-2">
                        Phone:
                        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="block w-full py-2 px-9 border rounded mt-2" />
                    </label>
                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-2 hover:bg-green-700">Add Client</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </div>
    );
}

export default Clientadd;
