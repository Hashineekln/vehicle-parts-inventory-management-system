import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Validation from './Registervalidation'; // Ensure this path is correct

const Client = () => {
  const [values, setValues] = useState({
    usertype: "",
    firstname: "",
    lastname: "",
    username: "",
    nic: "",
    email: "",
    contact: "",
    password: "",
    cpassword: ""
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post("/auth/register", values);
        navigate("/login");
      } catch (err) {
        if (err.response && err.response.status === 409) {
          setErrorMessage(err.response.data);
        } else {
          setErrorMessage("An unexpected error occurred. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="container min-h-full flex flex-row justify-center px-6 py-12 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-6 sm:mx-auto sm:max-w-md">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          User Registration
        </h2>
        <p className="text-center text-gray-600">
          Please enter your details here
        </p>

        <label htmlFor="usertype" className="block text-sm font-medium leading-6 text-gray-900">
          Usertype
        </label>
        <select
          id="usertype"
          name="usertype"
          required
          onChange={handleInput}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">Select a type</option>
          <option value="cashier">Cashier</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>

        {["firstname", "lastname", "username", "nic", "email", "contact"].map(field => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium leading-6 text-gray-900">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              name={field}
              type={field === "email" ? "email" : "text"}
              required
              onChange={handleInput}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors[field] && <span className="text-red-600">{errors[field]}</span>}
          </div>
        ))}

        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          onChange={handleInput}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {errors.password && <span className="text-red-600">{errors.password}</span>}

        <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">
          Confirm Password
        </label>
        <input
          id="cpassword"
          name="cpassword"
          type="password"
          required
          onChange={handleInput}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {errors.cpassword && <span className="text-red-600">{errors.cpassword}</span>}

        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Register
        </button>
        {errorMessage && <div className="text-red-500 text-center mt-2">{errorMessage}</div>}

        <p className="text-center text-sm text-gray-500">
          Already have an Account?<Link className="font-semibold text-sky-500 hover:text-blue-400" to="/login"> Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Client;
