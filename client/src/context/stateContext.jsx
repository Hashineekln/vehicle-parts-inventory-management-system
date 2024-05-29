import React, { createContext, useState, useRef } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export const State = createContext();

export const StateContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [id, setId] = useState(uuidv4());
  const [cashierId, setCashierId] = useState('');
  const [clientId, setClientId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(uuidv4().slice(0, 8));  // Auto-generate invoice number
  const [invoiceDate, setInvoiceDate] = useState('');
  const [warrantyDate, setWarrantyDate] = useState('');
  const [notes, setNotes] = useState('');
  const componentRef = useRef();

  const addToCart = (part) => {
    setCart(prevCart => {
      const partInCart = prevCart.find(item => item.part_no === part.part_no);
      if (partInCart) {
        return prevCart.map(item =>
          item.part_no === part.part_no
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...part, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (part_no, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.part_no === part_no ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (part_no) => {
    setCart(prevCart => prevCart.filter(item => item.part_no !== part_no));
  };

  return (
    <State.Provider value={{
      cart,
      setCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      id, setId,
      cashierId, setCashierId,
      clientId, setClientId,
      firstName, setFirstName,
      lastName, setLastName,
      phone, setPhone,
      invoiceNumber, setInvoiceNumber,
      invoiceDate, setInvoiceDate,
      warrantyDate, setWarrantyDate,
      notes, setNotes,
      componentRef,
    }}>
      {children}
    </State.Provider>
  );
};

export default StateContextProvider;
