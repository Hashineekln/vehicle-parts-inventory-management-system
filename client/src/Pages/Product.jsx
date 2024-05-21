import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Product = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [vehicleParts, setVehicleParts] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    year: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/vehicletype')
      .then(response => {
        const data = response.data;
        setBrands([...new Set(data.map(item => item.brand))]);
        setModels([...new Set(data.map(item => item.model))]);
        setYears([...new Set(data.map(item => item.year))]);
      })
      .catch(error => console.error(error));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const fetchVehicleParts = () => {
    axios.post('http://localhost:5000/vehiclepart', filters)
      .then(response => setVehicleParts(response.data))
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
          // Handle error response from the server
        } else {
          console.error(error.message);
          // Handle other errors
        }
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicle Parts Finder</h1>
      <div className="grid grid-cols-3 gap-4">
        <select name="brand" onChange={handleFilterChange} className="border p-2">
          <option value="">Select Brand</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>{brand}</option>
          ))}
        </select>
        <select name="model" onChange={handleFilterChange} className="border p-2">
          <option value="">Select Model</option>
          {models.map((model, index) => (
            <option key={index} value={model}>{model}</option>
          ))}
        </select>
        <select name="year" onChange={handleFilterChange} className="border p-2">
          <option value="">Select Year</option>
          {years.map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <button onClick={fetchVehicleParts} className="bg-blue-500 text-white p-2 mt-4">Fetch Parts</button>
      <div className="grid grid-cols-4 gap-4 mt-4">
      {vehicleParts.map((part, index) => (
  <div key={index} className="border p-4 rounded shadow">
    <img src={part.image_url} alt={part.part_name} className="mb-2" />
    <h2 className="text-lg font-bold">{part.part_name}</h2>
    <p>Part No: {part.part_no}</p>
    <p>Price: ${part.price}</p>
    <p>Quantity: {part.quantity}</p>
  </div>
))}

      </div>
    </div>
  );
};

export default Product;
