import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SupplierUpdate = () => {
    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        company_name: "",
        address_line1: "",
        address_line2: "",
        address_line3: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Fetch the existing data for the supplier
        axios.get(`http://localhost:5000/supplier/${id}`)
            .then(response => {
                setValues({
                    first_name: response.data.first_name || "",
                    last_name: response.data.last_name || "",
                    company_name: response.data.company_name || "",
                    address_line1: response.data.address_line1 || "",
                    address_line2: response.data.address_line2 || "",
                    address_line3: response.data.address_line3 || ""
                });
            })
            .catch(error => {
                console.error('Error fetching supplier data', error);
                setErrorMessage('Error fetching data. Please refresh the page and try again.');
            });
    }, [id]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/supplier/${id}`, values);
            alert('Supplier details updated successfully');
            navigate("/Supplier");
        } catch (err) {
            setErrorMessage("Failed to update supplier. Please try again.");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '300px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Update Supplier</h2>
                    
                    <label htmlFor="first_name" style={{ marginBottom: '8px' }}>First Name</label>
                    <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        value={values.first_name}
                        onChange={handleInput}
                        required
                        style={{ padding: '8px', marginBottom: '16px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                    />

                    <label htmlFor="last_name" style={{ marginBottom: '8px' }}>Last Name</label>
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        value={values.last_name}
                        onChange={handleInput}
                        required
                        style={{ padding: '8px', marginBottom: '16px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                    />

                    <label htmlFor="company_name" style={{ marginBottom: '8px' }}>Company Name</label>
                    <input
                        id="company_name"
                        name="company_name"
                        type="text"
                        value={values.company_name}
                        onChange={handleInput}
                        required
                        style={{ padding: '8px', marginBottom: '16px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                    />

                    <label htmlFor="address_line1" style={{ marginBottom: '8px' }}>Address Line 1</label>
                    <input
                        id="address_line1"
                        name="address_line1"
                        type="text"
                        value={values.address_line1}
                        onChange={handleInput}
                        style={{ padding: '8px', marginBottom: '16px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                    />

                    <label htmlFor="address_line2" style={{ marginBottom: '8px' }}>Address Line 2</label>
                    <input
                        id="address_line2"
                        name="address_line2"
                        type="text"
                        value={values.address_line2}
                        onChange={handleInput}
                        style={{ padding: '8px', marginBottom: '16px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                    />

                    <label htmlFor="address_line3" style={{ marginBottom: '8px' }}>Address Line 3</label>
                    <input
                        id="address_line3"
                        name="address_line3"
                        type="text"
                        value={values.address_line3}
                        onChange={handleInput}
                        style={{ padding: '8px', marginBottom: '16px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                    />

                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Update</button>
                    {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default SupplierUpdate;
