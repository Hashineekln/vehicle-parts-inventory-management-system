import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { State } from "../context/stateContext";
import { AuthContext } from "../context/authContext";

const Product = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [vehicleParts, setVehicleParts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    year: '',
    category: []
  });

  const { cart, setCart, addToCart, updateQuantity } = useContext(State);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/vehicletype')
      .then(response => {
        const data = response.data;
        setBrands([...new Set(data.map(item => item.brand))]);
        setModels([...new Set(data.map(item => item.model))]);
        setYears([...new Set(data.map(item => item.year))]);
      })
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/category')
      .then(response => setCategories(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFilters(prevFilters => {
      const newCategories = checked
        ? [...prevFilters.category, value]
        : prevFilters.category.filter(cat => cat !== value);
      return { ...prevFilters, category: newCategories };
    });
  };

  const fetchVehicleParts = () => {
    if (filters.category.length === 0) {
      alert('Please select at least one category before fetching vehicle parts.');
      return;
    }

    axios.post('http://localhost:5000/api/vehiclepart', filters, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        const parts = response.data;
        setVehicleParts(parts);
        if (parts.length === 0) {
          alert('No search results found for the selected parts.');
        }
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
        } else {
          console.error(error.message);
        }
      });
  };

  const proceedToBilling = () => {
    navigate('/bill'); // Ensure you have this route defined in your router
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center">
          <img
            src="src/assets/Logo.jpg"
            alt="LHI Company"
            className="w-16 h-16 mr-4"
          />
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 p-2 rounded">
              Welcome to LHI Logistic
            </h1>
          </div>
        </div>
      </div>

      {currentUser && (currentUser.usertype === 'cashier'|| currentUser.usertype === 'admin') && (
        <div className="flex justify-end mb-4 space-x-4">
          <Link to="/client" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Back</Link>
          {/*<Link to="/vehiclepartadd" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add Vehicle Part</Link>}*/}
        </div>
      )}

      <div className="flex">
        <div className="w-1/4 p-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Select Your Vehicle Part</h2>
          
          <div className="grid gap-4">
            <select name="brand" onChange={handleFilterChange} className="border p-2 rounded">
              <option value="">Select Brand</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>{brand}</option>
              ))}
            </select>
            <select name="model" onChange={handleFilterChange} className="border p-2 rounded">
              <option value="">Select Model</option>
              {models.map((model, index) => (
                <option key={index} value={model}>{model}</option>
              ))}
            </select>
            <select name="year" onChange={handleFilterChange} className="border p-2 rounded">
              <option value="">Select Year</option>
              {years.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Categories</h2>
            <div className="grid gap-4 border p-4 rounded shadow">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center">
                  <input 
                    type="checkbox" 
                    value={category.name} 
                    onChange={handleCategoryChange} 
                    className="mr-2" 
                  />
                  <label>{category.name}</label>
                </div>
              ))}
            </div>
          </div>

          <button onClick={fetchVehicleParts} className="bg-blue-500 text-white p-2 mt-4 rounded hover:bg-blue-700">Search Parts</button>
        </div>

        <div className="w-3/4 p-4">
          {vehicleParts.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              No search results found for the selected parts.
            </div>
          )}

          <div className="grid grid-cols-4 gap-4">
            {vehicleParts.map((part, index) => (
              <div key={index} className="border p-4 rounded shadow">
                <img src={part.image_url} alt={part.part_name} className="mb-2 w-full h-40 object-cover rounded" />
                <h2 className="text-lg font-bold">{part.part_name}</h2>
                <p>Part No: {part.part_no}</p>
                <p>Price: Rs.{part.price}</p>
                <p>Quantity: {part.quantity}</p>

                {currentUser && (currentUser.usertype === 'cashier') && (
                  <div className="flex justify-between mt-2">
                   {/* <Link to={`/vehiclepartupdate/${part.part_no}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Update</Link>}*/}
                    <button onClick={() => addToCart(part)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Add to Cart</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {(currentUser && (currentUser.usertype === 'admin' || currentUser.usertype === 'cashier')) && (
            cart.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Cart</h2>
                <div className="grid gap-4">
                  {cart.map((item, index) => (
                    <div key={index} className="border p-4 rounded shadow flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-bold">{item.part_name}</h3>
                        <p>Part No: {item.part_no}</p>
                        <p>Price: Rs.{item.price}</p>
                        <p>Shelf No: {item.shelf_shelf_id}</p>
                        <p>Category No: {item.category_category_id}</p>
                      </div>

                      <div className="flex items-center">
                        <input 
                          type="number" 
                          //here in cart max quantity is the quantity of the partnot work
                          value={item.quantity} 
                          min="1" 
                         
                          onChange={(e) => updateQuantity(item.part_no, parseInt(e.target.value))} 
                          className="border p-1 w-16 mr-2 rounded"
                        />
                        <p>Total: Rs.{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={proceedToBilling} className="bg-blue-500 text-white p-2 mt-4 rounded hover:bg-blue-700">Proceed to Billing</button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;