// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Returnform from './Components/Returnform';

// Importing pages
import Login from './Pages/Login';
import Register from './Pages/Register';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Product from './Pages/Product';


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

import Notify from './Pages/Notify';
import User from './Pages/User';
import Userupdate from './Pages/Userupdate';
import Report from './Pages/Report';
import Reportyear from './Pages/Reportyear';




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
import Returntable from './Pages/Returntable';


// Components and layouts
import BaseLayout from './Components/BaseLayout';
import CashierLayout from './Components/CashierLayout';
import AdminLayout from './Components/AdminLayout';
import InLayout from './Components/InLayout';

import ProtectedRoute from './Components/ProtectedRoute';
import Billshared from './Components/Billshared';



const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/Login" element={<BaseLayout><Login /></BaseLayout>} />
      <Route path="/About" element={<BaseLayout><About /></BaseLayout>} />
      <Route path="/Contact" element={<BaseLayout><Contact /></BaseLayout>} />
      <Route path="/Home" element={<BaseLayout><Home /></BaseLayout>} />
      <Route path="/Product" element={<BaseLayout><Product /></BaseLayout>} />
      
      

      
      {/* Cashier protected routes */}
      <Route element={<ProtectedRoute allowedRoles={['cashier']} />}>

        <Route path="/Client" element={<CashierLayout><Client /></CashierLayout>} />
        <Route path="/Clientadd" element={<CashierLayout><Clientadd /></CashierLayout>} />
        <Route path="/Clientupdate/:id" element={<CashierLayout><Clientupdate /></CashierLayout>} />

        
        <Route path="/Bill" element={<BaseLayout><Bill /></BaseLayout>} />
        <Route path="/Returntable" element={<CashierLayout><Returntable /></CashierLayout>} />



      </Route>

      {/* Admin protected routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
      /
        <Route path="/Inventory" element={<AdminLayout><Inventory /></AdminLayout>} />

        <Route path="/Notify" element={<AdminLayout><Notify/></AdminLayout>} />
        <Route path="/Users" element={<AdminLayout><User/></AdminLayout>} /> 
        <Route path="/Userupdate/:id" element={<AdminLayout><Userupdate /></AdminLayout>} />


        <Route path="/Vehiclepart" element={<AdminLayout><Vehiclepart /></AdminLayout>} />   
        <Route path="/Vehiclepartadd" element={<AdminLayout><Vehiclepartadd /></AdminLayout>} />
        <Route path="/Vehiclepartupdate/:part_no" element={<AdminLayout><Vehiclepartupdate /></AdminLayout>} />

        <Route path="/Category" element={<AdminLayout><Category /></AdminLayout>} />
        <Route path="/Categoryadd" element={<AdminLayout><Categoryadd /></AdminLayout>} />
        <Route path="/Categoryupdate/:id" element={<AdminLayout><Categoryupdate /></AdminLayout>} />
        
        <Route path="/Vehicletype" element={<AdminLayout><Vehicletype /></AdminLayout>} />
        <Route path="/Vehicletypeadd" element={<AdminLayout><Vehicletypeadd /></AdminLayout>} />
        <Route path="/Vehicletypeupdate/:id" element={<AdminLayout><Vehicletypeupdate /></AdminLayout>} />

        <Route path="/Shelf" element={<AdminLayout><Shelf /></AdminLayout>} />
        <Route path="/Shelfadd" element={<AdminLayout><Shelfadd /></AdminLayout>} />
        <Route path="/Shelfupdate/:id" element={<AdminLayout><Shelfupdate /></AdminLayout>} />

        <Route path="/Supplier" element={<AdminLayout><Supplier /></AdminLayout>} />
        <Route path="/Supplieradd" element={<AdminLayout><Supplieradd /></AdminLayout>} />
        <Route path="/Supplierupdate/:id" element={<AdminLayout><Supplierupdate /></AdminLayout>} />

        <Route path="/Transaction" element={<AdminLayout><Transaction /></AdminLayout>} />
        <Route path="/Transactionadd" element={<AdminLayout><Transactionadd /></AdminLayout>} />
        <Route path="/Transactionupdate/:id" element={<AdminLayout><Transactionupdate /></AdminLayout>} />

        <Route path="/Report" element={<AdminLayout><Report/></AdminLayout>} />
        <Route path="/Reportyear" element={<AdminLayout><Reportyear/></AdminLayout>} />
        <Route path="/Register" element={<BaseLayout><Register /></BaseLayout>} />

      </Route>


      {/* shared layouts */}
      <Route path="/Billdetails" element={<Billshared />} />
      <Route path="/return/:bill_id" element={<Returnform />} />
      


      {/* Default route */}
      <Route path="/" element={<BaseLayout><Home /></BaseLayout>} />
    </Routes>
  );
};

export default App;
