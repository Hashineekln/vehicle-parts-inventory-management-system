import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Validation from './Loginvalidation';

  

const Login = () => {
  const [values, setValues] = useState({
   username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues(prev => ({
      ...prev,
      [name]: value, // Correctly spread previous state and update the field
    }));
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values)); // Assuming Validation correctly returns an object of errors
  };

  return (

    <div className="container min-h-full flex flex-row justify-center px-6 py-12 lg:px-8">
<div className="image-section flex justify-center items-center mt-10 sm:mx-auto sm:max-w-md">
<div className="image-section lg:flex-1 flex justify-start items-middle  mb-0 lg:mb-0 w-2/4 ">
    <img className="h-60 w-auto" src="src/assets/Logo.jpg" alt="LHI Company" />
  </div>
  </div>
  
    <div className="content-section  sm:mx-auto sm:max-w-md">
    <img className="mx-auto h-20 w-auto" src="src/assets/Logo.jpg" alt="LHI Company" />

      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Login to your account
      </h2>
      <p className='text-center text-gray-600'>
      Welcome back! Please enter your details
      </p>
        
    

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="" onSubmit={handleSubmit} >
        <div>
          <label htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900">
            username
          </label>
          <div className="mt-2">
            <input
            onChange={handleInput}
              id= "username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              {errors.username && <span className='text-danger'> {errors.username} </span>} 
             
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>

          </div>
          <div className="mt-2">
            <input
            onChange={handleInput}
              id="password"
              name="password"
              type="password"
              autoComplete=""
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <span> {errors.password && <span className='text-danger'> {errors.password} </span>} </span>
          </div>
        </div>

        <div className="text-sm text-center">
              <a href="#" className="font-semibold text-blue-400 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
           LogIn
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Don't have an Account?  <Link className="font-semibold text-sky-500 hover:text-blue-400" to='/Register'>Register</Link>
      
      </p>
    </div>
  </div>
  </div>
  );
};

export default Login;