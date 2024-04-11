//baselayout nav

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Example() {
  // State to manage the visibility of conditional content
  const [click, setClick] = useState(false);

  // Example content that you might want to conditionally display
  const content = <div></div>;

  // Array to hold the navigation link details to reduce repetition
  const navLinks = [
    { to: "/Home", label: "Home" },
    { to: "/About", label: "About" },
    { to: "/Contact", label: "Contact" },
    { to: "/Login", label: "Login" },
    { to: "/Register", label: "Register" },
    // Add more navigation links as needed
  ];

  return (
    <nav>
      <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4 ">
        <div className="flex items-center flex-1">
          <span className="text-3xl font-bold">LHI Logistic</span>
        </div>
        
        <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 mr-16 text-[18px]">
              {navLinks.map((link, index) => (
                <a key={index}
                  className="w-auto justify-center rounded-md px-3 py-1.5 text-l  font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <Link className="font-semibold text-slate-50 p-3" to={link.to}>
                    {link.label}
                  </Link>
                </a>
              ))}
            </ul>
          </div>
        </div>

        
        
      </div>
    </nav>
  );
};
