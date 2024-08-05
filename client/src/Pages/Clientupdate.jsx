import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ClientValidation } from './Validationall.jsx';

const ClientUpdate = () => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        phone: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/client/${id}`);
                const data = Array.isArray(response.data) ? response.data[0] : response.data;
                setValues({
                    firstName: data.first_name || "",
                    lastName: data.last_name || "",
                    phone: data.phone || ""
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching client data', error);
                setErrorMessage('Error fetching data. Please refresh the page and try again.');
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = ClientValidation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                await axios.put(`http://localhost:5000/client/${id}`, {
                    first_name: values.firstName,
                    last_name: values.lastName,
                    phone: values.phone
                });
                alert('Client details updated successfully');
                navigate("/Client");
            } catch (err) {
                console.error('Failed to update Client', err);
                setErrorMessage("Failed to update Client. Please try again.");
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
                    <h2 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Update Client</h2>

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

export default ClientUpdate;
