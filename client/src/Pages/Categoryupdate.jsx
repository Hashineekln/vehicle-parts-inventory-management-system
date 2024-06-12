import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryUpdate = () => {
    const [values, setValues] = useState({
        category_id: "", // Initialize to empty string
        name: "" // Initialize to empty string
    });
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Fetch the existing data for the client
        axios.get(`http://localhost:5000/category/${id}`)
            .then(response => {
                console.log('API response:', response.data); // Log the API response
                const data = response.data[0]; // Extract the first object from the array
                if (data && typeof data.category_id !== 'undefined' && typeof data.name !== 'undefined') {
                    setValues({
                        category_id: data.category_id,
                        name: data.name
                    });
                } else {
                    setErrorMessage('Invalid data format received.');
                }
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
            await axios.put(`http://localhost:5000/category/${id}`, values);
            alert('Category details updated successfully');
            navigate("/Category");
        } catch (err) {
            console.error('Failed to update category:', err);
            setErrorMessage("Failed to update category. Please try again.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '300px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Update Category</h2>
                    <label htmlFor="category_id" style={{ marginBottom: '8px' }}>Category ID **</label>
                    <input
                        id="category_id"
                        name="category_id"
                        type="text"
                        value={values.category_id}
                        onChange={handleInput}
                        required
                        style={{ padding: '8px', marginBottom: '16px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                    />

                    <label htmlFor="name" style={{ marginBottom: '8px' }}>Category Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleInput}
                        required
                        style={{ padding: '8px', marginBottom: '16px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                    />

                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Update</button>
                    {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default CategoryUpdate;
