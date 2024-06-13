import React, { useState } from 'react';
import axios from 'axios';
import { ClientValidation } from './Validationall.jsx'; // Named import

function Clientadd() {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = ClientValidation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // If no validation errors, proceed with adding client
            axios.post('http://localhost:5000/client', {
                first_name: values.firstName,
                last_name: values.lastName,
                phone: values.phone
            })
                .then(response => {
                    console.log('Client Added', response);
                    setSuccessMessage('Client added successfully');
                    setValues({
                        firstName: '',
                        lastName: '',
                        phone: ''
                    }); // Clear input fields after successful addition
                    setErrorMessage(''); // Clear any previous error messages
                })
                .catch(error => {
                    console.error('Error adding client', error);
                    setErrorMessage('Failed to add client. Please try again.');
                    setSuccessMessage('');
                });
        } else {
            setErrorMessage('Please fix the errors in the form.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border p-10 rounded max-w-md">
                <form onSubmit={handleSubmit} className="mb-4">
                    <label className="block mb-2">
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            className="block w-full py-2 px-9 border rounded mt-2"
                        />
                        {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
                    </label>
                    <label className="block mb-2">
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            className="block w-full py-2 px-9 border rounded mt-2"
                        />
                        {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                    </label>
                    <label className="block mb-2">
                        Phone:
                        <input
                            type="text"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            className="block w-full py-2 px-9 border rounded mt-2"
                        />
                        {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
                    </label>
                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-2 hover:bg-green-700">
                        Add Client
                    </button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </div>
    );
}

export default Clientadd;
