import React from "react";
import Usernav from "./Usernav";
import AdminDash from "./AdminDash";

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className='h-[11vh] justify-center items-center bg-cover bg-cyan-400'>
        <Usernav />
      </div>
      <div className="flex h-screen">
        <AdminDash />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;