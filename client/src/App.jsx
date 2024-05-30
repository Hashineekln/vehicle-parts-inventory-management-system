// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importing pages
import Login from './Pages/Login';
import Register from './Pages/Register';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Product from './Pages/Product';
import Homefilter from './Pages/Homefilter';

// Admin pages
import Inventory from './Pages/Inventory';
import Category from './Pages/Category';
import Categoryadd from './Pages/Categoryadd';
import Categoryupdate from './Pages/Categoryupdate';
import Vehiclepart from './Pages/Vehiclepart';
import Vehiclepartadd from './Pages/Vehiclepartadd';
import Vehiclepartupdate from './Pages/Vehiclepartupdate';
import Vehicletype from './Pages/Vehicletype';
import Vehicletypeadd from './Pages/Vehicletypeadd';
import Vehicletypeupdate from './Pages/Vehicletypeupdate';

// Cashier pages
import Client from './Pages/Client';
import Clientadd from './Pages/Clientadd';
import Clientupdate from './Pages/Clientupdate';
import Shelf from './Pages/Shelf';
import Shelfadd from './Pages/Shelfadd';
import Shelfupdate from './Pages/Shelfupdate';
import Supplier from './Pages/Supplier';
import Supplieradd from './Pages/Supplieradd';
import Supplierupdate from './Pages/Supplierupdate';
import Transaction from './Pages/Transaction';
import Transactionadd from './Pages/Transactionadd';
import Transactionupdate from './Pages/Transactionupdate';
import Bill from './Pages/Bill';

// Components and layouts
import BaseLayout from './Components/BaseLayout';
import CashierLayout from './Components/CashierLayout';
import AdminLayout from './Components/AdminLayout';
import ProtectedRoute from './Components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/Login" element={<BaseLayout><Login /></BaseLayout>} />
      <Route path="/Register" element={<BaseLayout><Register /></BaseLayout>} />
      //if admin can access only register then fine and check user details
      <Route path="/About" element={<BaseLayout><About /></BaseLayout>} />
      <Route path="/Contact" element={<BaseLayout><Contact /></BaseLayout>} />
      <Route path="/Home" element={<BaseLayout><Home /></BaseLayout>} />
      <Route path="/Product" element={<BaseLayout><Product /></BaseLayout>} />
      <Route path="/Homefilter" element={<CashierLayout><Homefilter /></CashierLayout>} />
      

      
      {/* Cashier protected routes */}
      <Route element={<ProtectedRoute allowedRoles={['cashier']} />}>
        //make cashier deagault layout to load
        <Route path="/Client" element={<CashierLayout><Client /></CashierLayout>} />
        <Route path="/Clientadd" element={<CashierLayout><Clientadd /></CashierLayout>} />
        <Route path="/Clientupdate/:id" element={<CashierLayout><Clientupdate /></CashierLayout>} />
        <Route path="/Shelf" element={<CashierLayout><Shelf /></CashierLayout>} />
        <Route path="/Shelfadd" element={<CashierLayout><Shelfadd /></CashierLayout>} />
        <Route path="/Shelfupdate/:id" element={<CashierLayout><Shelfupdate /></CashierLayout>} />
        <Route path="/Supplier" element={<CashierLayout><Supplier /></CashierLayout>} />
        <Route path="/Supplieradd" element={<CashierLayout><Supplieradd /></CashierLayout>} />
        <Route path="/Supplierupdate/:id" element={<CashierLayout><Supplierupdate /></CashierLayout>} />
        <Route path="/Transaction" element={<CashierLayout><Transaction /></CashierLayout>} />
        <Route path="/Transactionadd" element={<CashierLayout><Transactionadd /></CashierLayout>} />
        <Route path="/Transactionupdate/:id" element={<CashierLayout><Transactionupdate /></CashierLayout>} />
        <Route path="/Category" element={<CashierLayout><Category /></CashierLayout>} />
        <Route path="/Categoryadd" element={<CashierLayout><Categoryadd /></CashierLayout>} />
        <Route path="/Categoryupdate/:id" element={<CashierLayout><Categoryupdate /></CashierLayout>} />
        <Route path="/Vehiclepart" element={<CashierLayout><Vehiclepart /></CashierLayout>} />
        <Route path="/Vehiclepartadd" element={<CashierLayout><Vehiclepartadd /></CashierLayout>} />
        <Route path="/Vehiclepartupdate/:part_no" element={<CashierLayout><Vehiclepartupdate /></CashierLayout>} />
        <Route path="/Vehicletype" element={<CashierLayout><Vehicletype /></CashierLayout>} />
        <Route path="/Vehicletypeadd" element={<CashierLayout><Vehicletypeadd /></CashierLayout>} />
        <Route path="/Vehicletypeupdate/:id" element={<CashierLayout><Vehicletypeupdate /></CashierLayout>} />
        <Route path="/Bill" element={<CashierLayout><Bill /></CashierLayout>} />
      </Route>

      {/* Admin protected routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
      //make admin deagault layout to load
        <Route path="/Inventory" element={<AdminLayout><Inventory /></AdminLayout>} />
//inventory remove ne? catlog there with limited features
      </Route>

      {/* Default route */}
      <Route path="/" element={<BaseLayout><Home /></BaseLayout>} />
    </Routes>
  );
};

export default App;
