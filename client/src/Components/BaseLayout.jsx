
import React from "react";
import Nav from "./Nav";

const BaseLayout = ({ children }) => {
  return (
    <>
    <div className='h-[11vh]  justify-center items-center bg-cover bg-cyan-400 '>

      <Nav />
      <div>{children}</div>
      </div>
    </>
  );
};

export default BaseLayout;
