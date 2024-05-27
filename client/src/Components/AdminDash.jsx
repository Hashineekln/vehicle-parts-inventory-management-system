import React, { useState } from 'react';
// Importing icons from react-icons
import { FaWarehouse, FaUsers, FaFileInvoiceDollar, FaCog, FaArrowCircleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const AdminDash = () => {
  const [AdminDash, setSidenav] = useState(true);
  const navigate = useNavigate(); // Instantiate the navigate function

  const handleNavigation = (route) => {
    navigate(route); // Use navigate function with the route
  };

  // Mapping your routes to specific icons and paths
  const menuItems = [
    { name: 'User Registrations', icon: <FaWarehouse />, path: '/user' },
    { name: 'Inventory', icon: <FaUsers />, path: '/Inventory' },
    { name: 'Supplier', icon: <FaFileInvoiceDollar />, path: '/Supplier' },
    { name: 'Transactions', icon: <FaArrowCircleRight />, path: '/Transaction' },
    { name: 'Notification', icon: <FaCog />, path: '/notification' },
    { name: 'Report', icon: <FaArrowCircleRight />, path: '/Report' },
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
          {menuItems.map(({ name, icon, path }) => (
            <a
              key={name}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(path);
              }}
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

export default AdminDash;
