import { Link } from 'react-router-dom';


const Register = () => {
  return (
    <div className="container min-h-full flex flex-row justify-center px-6 py-12 lg:px-8">

      <div className="image-section flex justify-center items-center mt-10 sm:mx-auto sm:max-w-md">
        <div className="image-section lg:flex-1 flex justify-start items-middle mb-0 lg:mb-0 w-2/4">
          <img className="h-60 w-auto" src="src/assets/Logo.jpg" alt="LHI Company" />
        </div>
      </div>


      <div className="content-section sm:mx-auto sm:max-w-md">


<form className="space-y-6" action="#" method="POST">
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
            <label htmlFor="usertype" className="block text-sm font-medium leading-6 text-gray-900">
              Usertype
            </label>
            <div className="mt-2">
              <select
                id="usertype"
                name="usertype"
                autoComplete="usertype"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-gray-400"
              >

              
                <option value="">Select a type</option>
                <option value="cashier">Cashier</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div>

            <div className="flex items-center justify-between">
              <label htmlFor="NIC" className="block text-sm font-medium leading-6 text-gray-900">
                NIC
              </label>
            </div>
            <div className="mt-2">
              <input
                id="NIC"
                name="NIC"
                type="NIC"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          

 
              <div className="flex items-center justify-between">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
    
              </div>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
    
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete=""
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Contact No
                </label>
    
              </div>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  autoComplete=""
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
    
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
  
<br/>
    
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               Register
              </button>
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