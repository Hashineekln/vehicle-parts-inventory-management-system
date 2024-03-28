import React, { useState } from 'react';
//import { Button } from "@material-tailwind/react";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([
    { id: 1, supplier_id:'123', part_no:'AS-45764-4545', first_name: 'janath', last_name:'silva' ,email:'hashi@FaGlassMartiniAlt.com' , phone: '1234567890', edit: 'edit'},    
    { id: 1, supplier_id:'123', part_no:'AS-45764-4545', first_name: 'janath', last_name:'silva' ,email:'hashi@FaGlassMartiniAlt.com' , phone: '1234567890', edit: 'edit'},
    
  ]);

  return (

   
 //add and edit butoon functions dashboard inclde
 
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-950 dark:text-gray-950">
        <thead className="text-xs text-gray-950 uppercase bg-gray-50 dark:bg-slate-80 dark:text-gray-950">
          <tr>
          <th scope="col" className="py-3 px-6">Supplier ID</th>
          <th scope="col" className="py-3 px-6">Part No</th>
          <th scope="col" className="py-3 px-6">First Name</th>
        <th scope="col" className="py-3 px-6">Last Name</th>
        <th scope="col" className="py-3 px-6">Email</th>
             <th scope="col" className="py-3 px-6">Phone</th>
             <th scope="col" className="py-3 px-6">Edit</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="bg-white border-b dark:bg--950 dark:border-gray-950">
              <td className="py-4 px-6">{supplier.supplier_id}</td>
              <td className="py-4 px-6">{supplier.part_no}</td>
              <td className="py-4 px-6">{supplier.first_name}</td>
              <td className="py-4 px-6">{supplier.last_name}</td>
              <td className="py-4 px-6">{supplier.email}</td>
              <td className="py-4 px-6">{supplier.phone}</td>
              <td className="py-4 px-6">{supplier.edit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Supplier;
