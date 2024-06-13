import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { SupplierValidation } from './Validationall'; // Ensure this path is correct based on your project structure

const SupplierUpdate = () => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        phone: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Fetch the existing data for the supplier
        axios.get(`http://localhost:5000/supplier/${id}`)
            .then(response => {
                const data = Array.isArray(response.data) ? response.data[0] : response.data; // Handle array response
                setValues({
                    firstName: data.first_name || "",
                    lastName: data.last_name || "",
                    companyName: data.company_name || "",
                    addressLine1: data.address_line1 || "",
                    addressLine2: data.address_line2 || "",
                    addressLine3: data.address_line3 || "",
                    phone: data.phone || ""
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching supplier data', error);
                setErrorMessage('Error fetching data. Please refresh the page and try again.');
                setLoading(false);
            });
    }, [id]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = SupplierValidation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                await axios.put(`http://localhost:5000/supplier/${id}`, {
                    first_name: values.firstName,
                    last_name: values.lastName,
                    company_name: values.companyName,
                    address_line1: values.addressLine1,
                    address_line2: values.addressLine2,
                    address_line3: values.addressLine3,
                    phone: values.phone
                });
                alert('Supplier details updated successfully');
                navigate("/Supplier");
            } catch (err) {
                console.error('Failed to update supplier', err);
                setErrorMessage("Failed to update supplier. Please try again.");
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '400px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Update Supplier</h2>

                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <div style={{ width: '48%' }}>
                            <label htmlFor="firstName" style={{ marginBottom: '8px' }}>First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={values.firstName}
                                onChange={handleInput}
                                required
                                style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                            {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
                        </div>
                        <div style={{ width: '48%' }}>
                            <label htmlFor="lastName" style={{ marginBottom: '8px' }}>Last Name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={values.lastName}
                                onChange={handleInput}
                                required
                                style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                            {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                        </div>
                    </div>

                    <label htmlFor="companyName" style={{ marginBottom: '8px' }}>Company Name</label>
                    <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        value={values.companyName}
                        onChange={handleInput}
                        required
                        style={{ padding: '8px', marginBottom: '16px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                    />

                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <div style={{ width: '32%' }}>
                            <label htmlFor="addressLine1" style={{ marginBottom: '8px' }}>Address Line 1</label>
                            <input
                                id="addressLine1"
                                name="addressLine1"
                                type="text"
                                value={values.addressLine1}
                                onChange={handleInput}
                                style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                        <div style={{ width: '32%' }}>
                            <label htmlFor="addressLine2" style={{ marginBottom: '8px' }}>Address Line 2</label>
                            <input
                                id="addressLine2"
                                name="addressLine2"
                                type="text"
                                value={values.addressLine2}
                                onChange={handleInput}
                                style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                        <div style={{ width: '32%' }}>
                            <label htmlFor="addressLine3" style={{ marginBottom: '8px' }}>Address Line 3</label>
                            <input
                                id="addressLine3"
                                name="addressLine3"
                                type="text"
                                value={values.addressLine3}
                                onChange={handleInput}
                                style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                    </div>

                    <label htmlFor="phone" style={{ marginBottom: '8px' }}>Contact No</label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={values.phone}
                        onChange={handleInput}
                        required
                        style={{ padding: '8px', marginBottom: '16px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}

                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Update</button>
                    {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default SupplierUpdate;
