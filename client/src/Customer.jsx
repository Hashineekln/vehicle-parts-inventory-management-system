import React, { useState } from 'react';
//import { Button } from "@material-tailwind/react";

const Customer = () => {
  const [customers, setCustomers] = useState([
    { id: 1, customer_id:123, first_name: 'janath', last_name:'silva' , phone: '1234567890', edit: 'edit'},    
    { id: 2, customer_id:123, first_name: 'gayan', last_name:'perera' , phone: '0987654321',edit: 'edit' },
    
  ]);

  return (

   
 

    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-950 dark:text-gray-950">
        <thead className="text-xs text-gray-950 uppercase bg-gray-50 dark:bg-slate-80 dark:text-gray-950">
          <tr>
          <th scope="col" className="py-3 px-6">Customer ID</th>
          <th scope="col" className="py-3 px-6">First Name</th>
        <th scope="col" className="py-3 px-6">Last Name</th>
             <th scope="col" className="py-3 px-6">Phone</th>
             <th scope="col" className="py-3 px-6">Edit</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="bg-white border-b dark:bg--950 dark:border-gray-950">
              <td className="py-4 px-6">{customer.customer_id}</td>
              <td className="py-4 px-6">{customer.first_name}</td>
              <td className="py-4 px-6">{customer.last_name}</td>
              
              <td className="py-4 px-6">{customer.phone}</td>
              <td className="py-4 px-6">{customer.edit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;
