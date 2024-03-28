

import React from "react";
import Nav from "./Nav";
import Dashboard from "./Dashboard";

const CustomerLayout = ({ children }) => {
  return (
    <>
    <div className='h-[11vh]  justify-center items-center bg-cover bg-cyan-400 '>
      <Nav />
      </div>
      <Dashboard />
      <div>{children}</div>
    </>
  );
};

export default CustomerLayout;
