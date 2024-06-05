import React, { useState } from 'react';
import { FaWarehouse, FaUsers, FaFileInvoiceDollar, FaCog, FaArrowCircleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
//import Notify from '../Pages/Notify'; // Ensure correct import path

const AdminDash = () => {
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
    if (route === '/report') setHasNewNotification(false); // Reset notification highlight when navigating to Notify
  };

  const handleNewNotification = () => {
    setHasNewNotification(true);
  };
  const menuItems = [
    { name: 'User Details', icon: <FaWarehouse />, path: '/user' },
    { name: 'Catalogue', icon: <FaFileInvoiceDollar /> , path: '/Product' },
    { name: 'Inventory', icon: <FaUsers />, path: '/Inventory' },
    { name: 'Bill Logs', icon: <FaFileInvoiceDollar /> , path: '/Billdetails' },
    { name: 'Notification', icon: <FaCog />, path: '/Notify' },
    { name: 'Report', icon: <FaArrowCircleRight />, path: '/Report' },
  ];
  
  return (
    <div className="font-poppins antialiased h-screen w-1/8">
      <div className="bg-white h-screen md:block shadow-xl px-3 w-1/8 md:w-60 lg:w-60 overflow-x-hidden">
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
              {icon}
              <span>{name}</span>
              {name === 'Notification' && hasNewNotification && (
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">New</span>
              )}
            </a>
          ))}
        </div>
      </div>
      
     
      
    </div>
  );
};

export default AdminDash;
