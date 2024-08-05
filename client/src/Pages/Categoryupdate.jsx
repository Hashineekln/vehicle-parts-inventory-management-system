import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryUpdate = () => {
    const { id } = useParams(); // Extract the id parameter from the URL

    const [values, setValues] = useState({
        category_id: "", // Initialize to empty string
        name: "" // Initialize to empty string
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/category/${id}`);
                console.log('API response:', response.data);

                const data = response.data[0]; // Assuming data is an array and you need the first item
                if (data && typeof data.category_id !== 'undefined' && typeof data.name !== 'undefined') {
                    setValues({
                        category_id: data.category_id,
                        name: data.name
                    });
                } else {
                    setErrorMessage('Invalid data format received.');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching category data', error);
                setErrorMessage('Error fetching data. Please refresh the page and try again.');
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    const categoryIdPattern = /^\d+-[A-Z]{2}$/;
    const categoryNamePattern = /^[A-Za-z\s]+$/;

    const validate = () => {
        const validationErrors = {};

        // Validate categoryId
        if (!values.category_id) {
            validationErrors.category_id = "Category ID is required";
        } else if (!categoryIdPattern.test(values.category_id.trim())) {
            validationErrors.category_id = "Category ID format is invalid (e.g., 5-WB)";
        }

        // Validate categoryName
        if (!values.name) {
            validationErrors.name = "Category Name is required";
        } else if (!categoryNamePattern.test(values.name)) {
            validationErrors.name = "Category Name is invalid";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            await axios.put(`http://localhost:5000/category/${id}`, values);
            alert('Category details updated successfully');
            navigate("/Category");
        } catch (err) {
            console.error('Failed to update category:', err);
            setErrorMessage("Failed to update category. Please try again.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
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
                        onChange={handleChange}
                        required
                        style={{ padding: '8px', marginBottom: '16px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {errors.category_id && <p style={{ color: 'red' }}>{errors.category_id}</p>}

                    <label htmlFor="name" style={{ marginBottom: '8px' }}>Category Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        required
                        style={{ padding: '8px', marginBottom: '16px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Update</button>
                    {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default CategoryUpdate;
