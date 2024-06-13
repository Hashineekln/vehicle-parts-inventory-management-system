

import React from "react";
import Usernav from "./Usernav";
import AdminDash from "./AdminDash";

const InLayout = ({ children }) => {
  return (
    <>
    <div className='h-[11vh]  justify-center items-center bg-cover bg-cyan-400 '>

      <Usernav />
      <div>{children}</div>
      </div>
    </>
  );
};

export default InLayout;

