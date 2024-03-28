import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Customer from './Customer';
import About from './About';
import Contact from './Contact';
import BaseLayout from './Components/BaseLayout'; 
import CustomerLayout from './Components/CustomerLayout'; 
import Supplier from './Supplier';

const App = () => {
  return (
    <Routes>
      {/* BaseLayout with other pages */}
      <Route path="/Login" element={<BaseLayout><Login /></BaseLayout>} />
      <Route path="/Register" element={<BaseLayout><Register /></BaseLayout>} />
      <Route path="/About" element={<BaseLayout><About /></BaseLayout>} />
      <Route path="/Contact" element={<BaseLayout><Contact /></BaseLayout>} />
      <Route path="/Supplier" element={<BaseLayout><Supplier /></BaseLayout>} />
      

      {/* Customer part both include pard nav and dashboard */}
      <Route path="/Customer" element={<CustomerLayout><Customer /></CustomerLayout>} />
      

      {/* Redirect to /about as the home page change again after */}
      <Route path="/" element={<BaseLayout><About /></BaseLayout>} />
    </Routes>
  );
};

export default App;
