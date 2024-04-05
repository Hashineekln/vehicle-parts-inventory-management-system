import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register'; 
import Customer from './Pages/Customer'; 
import About from './Pages/About'; 
import Contact from './Pages/Contact'; 
import BaseLayout from './Components/BaseLayout'; 
import CustomerLayout from './Components/CustomerLayout'; 
import Supplier from './Pages/Supplier';
import Home from './Pages/Home';
import Product from './Pages/Product'; 
import Homefilter from './Pages/Homefilter';
import Dropdown from './Pages/Dropdown';


const App = () => {
  return (
    <Routes>
      {/* BaseLayout with other pages */}
      <Route path="/Login" element={<BaseLayout><Login /></BaseLayout>} />
      <Route path="/Register" element={<BaseLayout><Register /></BaseLayout>} />
      <Route path="/About" element={<BaseLayout><About /></BaseLayout>} />
      <Route path="/Contact" element={<BaseLayout><Contact /></BaseLayout>} />
      <Route path="/Supplier" element={<BaseLayout><Supplier /></BaseLayout>} />
      <Route path="/Home" element={<BaseLayout><Home /></BaseLayout>} />
      <Route path="/Product" element={<BaseLayout><Product /></BaseLayout>} />
      <Route path="/Homefilter" element={<BaseLayout><Homefilter /></BaseLayout>} />
      <Route path="/Dropdown" element={<BaseLayout><Dropdown /></BaseLayout>} />



      {/* Customer part both include pard nav and dashboard */}
      <Route path="/Customer" element={<CustomerLayout><Customer /></CustomerLayout>} />
      

      {/* Redirect to /about as the home page change again after */}
      <Route path="/" element={<BaseLayout><About /></BaseLayout>} />
    </Routes>
  );
};

export default App;
