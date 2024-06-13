import React, { createContext, useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "./authContext"; // Adjust the path as necessary
import axios from 'axios';

export const State = createContext();

export const StateContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState('');
  const [clientId, setClientId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [invoiceDate, setInvoiceDate] = useState('');
  const [warrantyDate, setWarrantyDate] = useState('');
  const [notes, setNotes] = useState('');
  const [alertMessage, setAlertMessage] = useState(null); // Alert message state
  const componentRef = useRef();

  useEffect(() => {
    if (currentUser && currentUser.user_id) {
      setUserId(currentUser.user_id);
    }
  }, [currentUser]);

  const addToCart = async (part) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/vehiclepart/${part.part_no}`);
      const availableStock = response.data.quantity;
  
      setCart(prevCart => {
        const partInCart = prevCart.find(item => item.part_no === part.part_no);
        const requestedQuantity = partInCart ? partInCart.quantity + 1 : 1;
  
        if (requestedQuantity > availableStock) {
          alert('Cannot add more than available stock');
          return prevCart;
        }
  
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
    } catch (error) {
      console.error('Error fetching part stock:', error);
      if (error.response) {
        if (error.response.status === 404) {
          alert('Part not found');
        } else {
          alert(`Error: ${error.response.statusText}`);
        }
      } else {
        alert('Error fetching part stock');
      }
    }
  };

  const validateCartStock = async () => {
    for (const item of cart) {
      const response = await axios.get(`http://localhost:5000/api/vehiclepart/${item.part_no}`);
      const availableStock = response.data.quantity;
      
      if (item.quantity > availableStock) {
        setAlertMessage(`Insufficient stock for part number: ${item.part_no}. Available: ${availableStock}, Requested: ${item.quantity}`);
        return false;
      }
    }
    setAlertMessage(null); // Clear alert message if stock is sufficient
    return true;
  };

  const updateQuantity = async (part_no, quantity) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/vehiclepart/${part_no}`);
      const availableStock = response.data.quantity;
      
      if (quantity > availableStock) {
        alert(`Cannot set quantity higher than available stock. Available: ${availableStock}`);
        return;
      }
      
      setCart(prevCart =>
        prevCart.map(item =>
          item.part_no === part_no ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating part stock:', error);
      alert('Error updating part stock');
    }
  };

  const removeFromCart = (part_no) => {
    setCart(prevCart => prevCart.filter(item => item.part_no !== part_no));
  };

  return (
    <State.Provider value={{
      cart,
      setCart,
      addToCart,
      validateCartStock,
      updateQuantity,
      removeFromCart,
      userId, setUserId,
      clientId, setClientId,
      firstName, setFirstName,
      lastName, setLastName,
      phone, setPhone,
      invoiceDate, setInvoiceDate,
      warrantyDate, setWarrantyDate,
      notes, setNotes,
      alertMessage, // Provide alertMessage state
      componentRef,
    }}>
      {children}
    </State.Provider>
  );
};

export default StateContextProvider;
