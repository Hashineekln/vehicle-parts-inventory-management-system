
import React, { useState } from 'react';
// Importing icons from react-icons
import { FaWarehouse, FaUsers, FaFileInvoiceDollar, FaCog, FaArrowCircleRight } from 'react-icons/fa';

const Dashboard = () => {
  const [Dashboard, setSidenav] = useState(true);

  const handleNavigation = (e, route) => {
    e.preventDefault();
    console.log(`Navigating to ${route}`);
    // Here you can add your logic to connect to the backend
    // For example, you might make an API call to your backend
  };

  // Mapping your routes to specific icons
  const menuItems = [
    { name: 'Inventory', icon: <FaWarehouse /> },
    { name: 'Customer', icon: <FaUsers /> },
    { name: 'Billing', icon: <FaFileInvoiceDollar /> },
    { name: 'Proceed Billing', icon: <FaArrowCircleRight /> },
    { name: 'Setting', icon: <FaCog /> },
  ];

  return (
    <div className="font-poppins antialiased h-screen w-1/8 ">
      <button
        onClick={() => setSidenav(true)}
        className="p-2 border-2 bg-black rounded-md border-gray-200 shadow-lg text-gray-900 focus:outline-none focus:text-black absolute top-50 left-0 sm:hidden"
      ></button>
      <div
        id="Dashboard"
        className={`bg-white h-screen md:block shadow-xl px-3 w-1/8 md:w-60 lg:w-60 overflow-x-hidden`}
        onClick={() => setSidenav(false)}
      >
        <div className="space-y-6 md:space-y-10 mt-10">
          <div id="company" className="space-y-3">
            <img
              src="src/assets/Logo.jpg"
              alt="LHI Company"
              className="w-30 md:w-16 mx-auto"
            />
          </div>
          {menuItems.map(({ name, icon }) => (
            <a
              key={name}
              href="#"
              onClick={(e) => handleNavigation(e, `/${name.replace(' ', '')}`)}
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex  gap-8"
            >
              {icon}<span>{name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
