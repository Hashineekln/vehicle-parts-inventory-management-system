//cashier side dashboard

import React, { useState } from 'react';
import { FaUsers, FaFileInvoiceDollar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { VscIssueReopened, VscArchive } from "react-icons/vsc";

const Dashboard = () => {
  const [Dashboard,setSidenav] = useState(true);
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route); 
  };


  // Mapping your routes to specific icons
  const menuItems = [
    { name: 'Catalogue', icon: <VscArchive /> , path: '/Product' },
    { name: 'Bill Logs', icon: <FaFileInvoiceDollar /> , path: '/Billdetails' },
    { name: 'Clients', icon: <FaUsers /> , path: '/Client' },
    { name: 'Return', icon: <VscIssueReopened />, path: '/Returntable' },

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
          {menuItems.map(({ name, icon ,path}) => (
            <a
              key={name}
              href="#"
              onClick={(e) =>  {
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


export default Dashboard;
