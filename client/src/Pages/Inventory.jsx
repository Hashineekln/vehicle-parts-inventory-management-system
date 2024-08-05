import React from 'react';
import { Link } from 'react-router-dom';

export default function Example() {
  // Define navigation links outside of the JSX return statement.
  const navLinks = [
    { to: "/Vehiclepart", label: "Vehicle Part" },
    { to: "/Category", label: "Category" },
    { to: "/Vehicletype", label: "Vehicle Type" },
    { to: "/Shelf", label: "Shelf Store" },
    
  ];

  return (
    <section className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <div className="mb-8 text-3xl font-semibold text-gray-500">
          <p>Select the path</p>
        </div>
        <div className="space-y-4">
          {navLinks.map((link, index) => (
            <div key={index}>
              <Link
                to={link.to}
                className="inline-block w-64 px-6 py-4 text-lg font-semibold text-white transition-colors duration-150 bg-sky-500 rounded-md hover:bg-sky-700 focus:outline-none focus:shadow-outline"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
