import React, { useContext } from 'react';
import { State } from '../context/stateContext';

const TableForm = () => {
  const { cart, removeFromCart } = useContext(State);

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="border p-2">Part Name</th>
          <th className="border p-2">Part No</th>
          <th className="border p-2">Price</th>
          <th className="border p-2">Quantity</th>
          <th className="border p-2">Total</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item, index) => (
          <tr key={index}>
            <td className="border p-2">{item.part_name}</td>
            <td className="border p-2">{item.part_no}</td>
            <td className="border p-2">Rs.{item.price}</td>
            <td className="border p-2">{item.quantity}</td>
            <td className="border p-2">Rs.{item.price * item.quantity}</td>
            <td className="border p-2">
              <button onClick={() => removeFromCart(item.part_no)} className="bg-red-500 text-white p-1">Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableForm;
