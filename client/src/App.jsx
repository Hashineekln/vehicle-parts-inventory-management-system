import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//BASIC pages
import Login from './Pages/Login';
import Register from './Pages/Register'; 
import About from './Pages/About'; 
import Contact from './Pages/Contact'; 
import Home from './Pages/Home';
import Product from './Pages/Product'; 
import Homefilter from './Pages/Homefilter';
import Dropdown from './Pages/Dropdown';


//ADMIN
import Supplier from './Pages/Supplier';
import Inventory from './Pages/Inventory'; 
import Category from './Pages/Category';
import Vehiclepart from './Pages/Vehiclepart';
import Vehicletype from './Pages/Vehicletype';




//CASHIER
import Client from '/src/Pages/Client.jsx';
import Clientadd from '/src/Pages/Clientadd.jsx';
import Clientupdate from '/src/Pages/Clientupdate.jsx';


//components and layouts
import BaseLayout from './Components/BaseLayout'; 
import CashierLayout from './Components/CashierLayout'; 
import AdminLayout from './Components/AdminLayout'; 




const App = () => {
  return (
    <Routes>
      {/* BaseLayout with other pages */}
      <Route path="/Login" element={<BaseLayout><Login /></BaseLayout>} />
      <Route path="/Register" element={<BaseLayout><Register /></BaseLayout>} />
      <Route path="/About" element={<BaseLayout><About /></BaseLayout>} />
      <Route path="/Contact" element={<BaseLayout><Contact /></BaseLayout>} />
      <Route path="/Home" element={<BaseLayout><Home /></BaseLayout>} />
      <Route path="/Product" element={<BaseLayout><Product /></BaseLayout>} />
      <Route path="/Homefilter" element={<BaseLayout><Homefilter /></BaseLayout>} />
      <Route path="/Dropdown" element={<BaseLayout><Dropdown /></BaseLayout>} />
      


      {/* Customer part both include pard nav and dashboard */}
      <Route path="/Client" element={<CashierLayout><Client /></CashierLayout>} />
      <Route path="/Clientadd" element={<CashierLayout><Clientadd /></CashierLayout>} />
      <Route path="/Clientupdate/:id" element={<Clientupdate />} />  // Parameterized route
      
      {/* admin part both include pard nav and dashboard */}
      <Route path="/Supplier" element={<AdminLayout><Supplier /></AdminLayout>} />
      <Route path="/Inventory" element={<AdminLayout><Inventory /></AdminLayout>} />
      <Route path="/Category" element={<AdminLayout><Category /></AdminLayout>} />
      <Route path="/Vehiclepart" element={<AdminLayout><Vehiclepart /></AdminLayout>} />
      <Route path="/Vehicletype" element={<AdminLayout><Vehicletype /></AdminLayout>} />

      

      
      {/* Redirect to /about as the home page change again after */}
      <Route path="/" element={<BaseLayout><Home /></BaseLayout>} />
    </Routes>
  );
};

export default App;
