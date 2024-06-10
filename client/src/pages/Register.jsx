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
    setErrors(Validation(values)); // Assuming Validation correctly returns an object of errors
  
    try {
     await axios.post("/auth/register", values);
     navigate ("/login");
     //console.log(res);
      // Maybe redirect the user to the login page or clear the form here
    } catch (err) {
      if (err.response && err.response.status === 409) {
        // Set the error message state to the backend's response message
        setErrorMessage(err.response.data); // Assuming the backend sends back a plain text message
      } else {
        // Generic error message for other errors
        setErrorMessage("An unexpected error occurred. Please try again later.");
      }
    }
  
  
    
    setErrors(Validation(values)); // Assuming Validation correctly returns an object of errors
  };

  return (
    <div className="container min-h-full flex flex-row justify-center px-6 py-12 lg:px-8">

      <div className="image-section flex justify-center items-center mt-10 sm:mx-auto sm:max-w-md">
        <div className="image-section lg:flex-1 flex justify-start items-middle mb-0 lg:mb-0 w-2/4">
          <img className="h-60 w-auto" src="src/assets/Logo.jpg" alt="LHI Company" />
        </div>
      </div>


      <div className="content-section sm:mx-auto sm:max-w-md">


<form onSubmit={handleSubmit}
className="space-y-6" action="#" method="POST">
        <div className="mt-60 sm:mx-auto sm:w-full sm:max-w-sm">
          
        <img className="mx-auto h-20 w-auto" src="src/assets/Logo.jpg" alt="LHI Company" />
        
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          User Registrations
          </h2>
          <p className='text-center text-gray-600'>
            Please enter your details here
          </p>
        
<div>
  <br/>
</div>
          
              
        

          <div>
            <label htmlFor="usertype"
             className="block text-sm font-medium leading-6 text-gray-900">
              Usertype
            </label>
            <div className="mt-2">
              <select
              
              palceholder=""
               onChange={handleInput}
                id="usertype"
                name="usertype"
                
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-gray-400"
              >

              
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
                <input
             
                
                  type="text"
                  name="firstname"
                  id= "firstname"
                  palceholder=""
          onChange={handleInput}
                  
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.firstname && <span className='text-danger'> {errors.firstname} </span>} 
                
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
               
                palceholder=""
                onChange={handleInput}
                  type="text"
                  name= "lastname"
                  id="lastname"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
{errors.lastname && <span className='text-danger'> {errors.lastname} </span>} 
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              username
              </label>
            </div>
            <div className="mt-2">
              <input
              
                
                palceholder=""
          onChange={handleInput}
                id="username"
                name="username"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
             {errors.username && <span className='text-danger'> {errors.username} </span>} 


            </div>
          </div>


          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="nic" className="block text-sm font-medium leading-6 text-gray-900">
                NIC
              </label>
            </div>
            <div className="mt-2">
              <input
                
                palceholder=""
          onChange={handleInput}
                id="nic"
                name="nic"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.nic && <span className='text-danger'> {errors.nic} </span>} 


            </div>
          </div>
          

 

    

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
    
              </div>
              <div className="mt-2">
                <input
                
                  palceholder=""
                  onChange={handleInput}
                  id= "email"
                  name="email"
                  type="email"
                  
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && <span className='text-danger'> {errors.email} </span>} 


              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="contact" className="block text-sm font-medium leading-6 text-gray-900">
                Contact No
                </label>
    
              </div>
              <div className="mt-2">
                <input
               
                palceholder=""
                onChange={handleInput}
                  id="contact"
                  name="contact"
                  type="tel"
                  autoComplete=""
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.contact && <span className='text-danger'> {errors.contact} </span>} 


              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
    
              </div>
              <div className="mt-2">
                <input
                
                  palceholder=""
                  onChange={handleInput}
                  id="password"
                  name="password"
                  type="password"
                  
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <span className='text-danger'> {errors.password} </span>} 


              </div>
            </div>


            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
    
              </div>
              <div className="mt-2">
                <input
                
                  palceholder=""
                  onChange={handleInput}
                  id= "cpassword"
                  name= "cpassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
               
                {errors.cpassword && <span className="text-red-600 font-bold" style={{fontSize: '12px'}}> {errors.cpassword} </span>}
               

              </div>
            </div>
  
  
<br/>
    
            <div>
              <button onClick ={handleSubmit} 
                
                className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               Register
              </button>

              {errorMessage && <div className="text-red-500 text-center mt-2">{errorMessage}</div>}

            </div>
            </div>

          </form>
    
          <p className="mt-10 text-center text-sm text-gray-500">
          Already have an Account?<Link className="font-semibold text-sky-500 hover:text-blue-400" to="/Login">Login</Link>
        
        </p>


        </div>

        

      </div>
      
      );
    };

export default Register;