
import React, { useState } from 'react';

const Dashboard = () => {
  const [Dashboard, setSidenav] = useState(true);

  const handleNavigation = (e, route) => {
    e.preventDefault();
    // need to think logic after dicusiin
    console.log(`Navigating to ${route}`);
  };

  return (
    <div className="font-poppins antialiased h-screen w-auto flex flex-row">
      <button
        onClick={() => setSidenav(true)}
        className="p-2 border-2 bg-black rounded-md border-gray-200 shadow-lg text-gray-900 focus:outline-none focus:text-black absolute top-50 left-0 sm:hidden"
      ></button>
      <div
        id="Dashboard"
        className={`bg-white h-screen md:block shadow-xl px-3 w-1/8 md:w-60 lg:w-60 overflow-x-hidden '}`}
        onClick={() => setSidenav(false)}
      >
        <div className="space-y-6 md:space-y-10 mt-10">
          <h1 className="font-bold text-4xl text-center md:hidden">
            <span className="text-teal-600"></span>
          </h1>
          <div id="company" className="space-y-3">
            <img
              src="src/assets/Logo.jpg"
              alt="LHI Company"
              className="w-30 md:w-16 mx-auto"
            />
          </div>
          {['Inventory', 'Customer', 'Billing', 'Proceed Billing', 'Setting'].map((item) => (
            <a
              key={item}
              //icon link need to be add here
              href="#"
              onClick={(e) => handleNavigation(e, `/${item.replace(' ', '')}`)}
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center justify-center gap-2"
            >
              <span>{item}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
