import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Validation from './Registervalidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [values, setValues] = useState({
    usertype: "",
    firstname: "",
    lastname: "",
    nic: "",
    email: "",
    contact: "",
    password: "",
    cpassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = e => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
      <div className="image-section flex justify-center items-center mt-10 sm:mx-auto sm:max-w-md">
        <div className="image-section lg:flex-1 flex justify-start items-middle mb-0 lg:mb-0 w-2/4">
          <img className="h-60 w-auto" src="src/assets/Logo.jpg" alt="LHI Company" />
        </div>
      </div>

      <div className="content-section sm:mx-auto sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
          <div className="mt-60 sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-20 w-auto" src="src/assets/Logo.jpg" alt="LHI Company" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              User Registration
            </h2>
            <p className='text-center text-gray-600'>
              Please enter your details here
            </p>
            <div>
              <br/>
            </div>
            <div>
              <label htmlFor="usertype" className="block text-sm font-medium leading-6 text-gray-900">
                Usertype
              </label>
              <div className="mt-2">
                <select onChange={handleInput} id="usertype" name="usertype" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-gray-400">
                  <option value="">Select a type</option>
                  <option value="cashier">Cashier</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input type="text" name="firstname" id="firstname" onChange={handleInput} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  {errors.firstname && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.firstname} </span>}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input type="text" name="lastname" id="lastname" onChange={handleInput} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  {errors.lastname && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.lastname} </span>}
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input type="text" name="username" id="username" onChange={handleInput} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                {errors.username && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.username} </span>}
              </div>
            </div>
            <div>
              <label htmlFor="nic" className="block text-sm font-medium leading-6 text-gray-900">
                NIC
              </label>
              <div className="mt-2">
                <input type="text" name="nic" id="nic" onChange={handleInput} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                {errors.nic && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.nic} </span>}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input type="email" name="email" id="email" onChange={handleInput} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                {errors.email && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.email} </span>}
              </div>
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-medium leading-6 text-gray-900">
                Contact No
              </label>
              <div className="mt-2">
                <input type="tel" name="contact" id="contact" onChange={handleInput} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                {errors.contact && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.contact} </span>}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input type="password" name="password" id="password" onChange={handleInput} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                {errors.password && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.password} </span>}
              </div>
            </div>
            <div>
              <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">
                <input type="password" name="cpassword" id="cpassword" onChange={handleInput} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                {errors.cpassword && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.cpassword} </span>}
              </div>
            </div>
            <div>
              <br></br>
              <button type="submit" className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Register
              </button>
              {errorMessage && <div className="text-red-500 text-center mt-2">{errorMessage}</div>}
            </div>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an Account? <Link className="font-semibold text-sky-500 hover:text-blue-400" to="/Login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
