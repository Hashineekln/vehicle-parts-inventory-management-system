import React, { useState } from 'react';
import { FaWarehouse , FaUsers, FaFileInvoiceDollar, FaCog, FaArrowCircleRight } from 'react-icons/fa';
import { VscBell, VscArchive ,VscSymbolMethod,VscGitPullRequestGoToChanges,VscAccount,VscGraphLine} from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';


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
    { name: 'User Details', icon: <FaUsers />, path: '/users' },
    { name: 'Catalogue', icon: <VscArchive /> , path: '/Product' },
    { name: 'Inventory', icon: < VscSymbolMethod/>, path: '/Inventory' },
    { name: 'Transaction', icon: <VscGitPullRequestGoToChanges /> , path: '/Transaction' },
    { name: 'Supplier', icon: <VscAccount /> , path: '/Supplier' },
    { name: 'Bill Logs', icon: <FaFileInvoiceDollar /> , path: '/Billdetails' },
    { name: 'Notification', icon: <VscBell />, path: '/Notify' },
    { name: 'Report', icon: <VscGraphLine />, path: '/Report' },
  ];
  
  return (
    <div className="font-poppins antialiased  w-1/8">
      <div className="bg-white  md:block shadow-xl px-3 w-1/8 md:w-60 lg:w-60 overflow-x-hidden">
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
