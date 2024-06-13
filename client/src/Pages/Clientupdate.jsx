import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ClientUpdate = () => {
    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        phone: ""
    });
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Fetch the existing data for the client
        axios.get(`http://localhost:5000/client/${id}`)
            .then(response => {
                const data = Array.isArray(response.data) ? response.data[0] : response.data; // Handle array response
                setValues({
                    first_name: data.first_name || "",
                    last_name: data.last_name || "",
                    phone: data.phone || ""
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching client data', error);
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
        try {
            await axios.put(`http://localhost:5000/client/${id}`, values);
            alert('Client details updated successfully');
            navigate("/Client");
        } catch (err) {
            console.error('Failed to update client', err);
            setErrorMessage("Failed to update client. Please try again.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '300px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Update Client</h2>
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

                    <label htmlFor="phone" style={{ marginBottom: '8px' }}>Contact No</label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={values.phone}
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

export default ClientUpdate;
