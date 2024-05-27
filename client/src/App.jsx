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




//ADMIN
import Supplier from './Pages/Supplier';
import Supplieradd from './Pages/Supplieradd';
import Supplierupdate from './Pages/Supplierupdate';

import Transaction from './Pages/Transaction';
import Transactionadd from './Pages/Transactionadd';
import Transactionupdate from './Pages/Transactionupdate';

import Inventory from './Pages/Inventory'; 

import Category from './Pages/Category';
import Categoryupdate from './Pages/Categoryupdate';
import Categoryadd from './Pages/Categoryadd';

import Vehiclepart from './Pages/Vehiclepart';
import Vehiclepartadd from './Pages/Vehiclepartadd';
import Vehiclepartupdate from './Pages/Vehiclepartupdate';

import Vehicletype from './Pages/Vehicletype';
import Vehicletypeadd from './Pages/Vehicletypeadd';
import Vehicletypeupdate from './Pages/Vehicletypeupdate';


import Shelf from './Pages/Shelf';
import Shelfadd from './Pages/Shelfadd';
import Shelfupdate from './Pages/Shelfupdate';


//CASHIER
import Client from '/src/Pages/Client.jsx';
import Clientadd from '/src/Pages/Clientadd.jsx';
import Clientupdate from '/src/Pages/Clientupdate.jsx';


import Bill from '/src/Pages/Bill.jsx';


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
      
      


      {/* Customer part both include pard nav and dashboard */}
      <Route path="/Client" element={<CashierLayout><Client /></CashierLayout>} />
      <Route path="/Clientadd" element={<CashierLayout><Clientadd /></CashierLayout>} />
      <Route path="/Clientupdate/:id" element={<Clientupdate />} />  

      <Route path="/Bill" element={<CashierLayout><Bill /></CashierLayout>} />
      
      {/* admin part both include pard nav and dashboard */}
      <Route path="/Supplier" element={<AdminLayout><Supplier /></AdminLayout>} />
      <Route path="/Supplieradd" element={<AdminLayout><Supplieradd /></AdminLayout>} />
      <Route path="/Supplierupdate/:id" element={<Supplierupdate />} />

      <Route path="/Transaction" element={<AdminLayout><Transaction /></AdminLayout>} />
      <Route path="/Transactionadd" element={<AdminLayout><Transactionadd /></AdminLayout>} />
      <Route path="/Transactionupdate/:id" element={<Transactionupdate />} />



      <Route path="/Inventory" element={<AdminLayout><Inventory /></AdminLayout>} />
      <Route path="/Category" element={<AdminLayout><Category /></AdminLayout>} />
      <Route path="/Categoryadd" element={<AdminLayout><Categoryadd /></AdminLayout>} />
      <Route path="/Categoryupdate/:id" element={<Categoryupdate />} /> 

      



      <Route path="/Vehiclepart" element={<AdminLayout><Vehiclepart /></AdminLayout>} />
      <Route path="/Vehiclepartadd" element={<AdminLayout><Vehiclepartadd /></AdminLayout>} />
      <Route path="/Vehiclepartupdate/:part_no" element={<Vehiclepartupdate />}/>




      <Route path="/Vehicletype" element={<AdminLayout><Vehicletype /></AdminLayout>} />
      <Route path="/Vehicletypeadd" element={<AdminLayout><Vehicletypeadd /></AdminLayout>} />
      <Route path="/Vehicletypeupdate/:id" element={<Vehicletypeupdate />} />



      
      <Route path="/Shelf" element={<AdminLayout><Shelf /></AdminLayout>} />
      <Route path="/Shelfadd" element={<AdminLayout><Shelfadd /></AdminLayout>} />
      <Route path="/Shelfupdate/:id" element={<Shelfupdate />} /> 
      

      {/* Redirect to /about as the home page change again after */}
      <Route path="/" element={<BaseLayout><Home /></BaseLayout>} />
    </Routes>
  );
};

export default App;
