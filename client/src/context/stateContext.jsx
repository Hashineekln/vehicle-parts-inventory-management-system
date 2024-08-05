import React, { createContext, useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "./authContext"; 
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
  //const [notes, setNotes] = useState('');
  const [alertMessage, setAlertMessage] = useState(null); 
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
  

      //Calculates the new quantity of the part added.If the part is already in the cart, 
      //it adds 1 to its current quantity or sets the quantity to 1.
      setCart(prevCart => {
        const partInCart = prevCart.find(item => item.part_no === part.part_no);
        const requestedQuantity = partInCart ? partInCart.quantity + 1 : 1;
  
        if (requestedQuantity > availableStock) {
          alert('Cannot add more than available stock');
          return prevCart;
        }
  

        //if the part is not already in the cart, it adds the part to the cart with a quantity of 1
        //new array that includes the previous cart items and the new part.

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


  //Validates if there is sufficient stock for all items in the cart. If any item has insufficient stock,
  const validateCartStock = async () => {
    for (const item of cart) {
      const response = await axios.get(`http://localhost:5000/api/vehiclepart/${item.part_no}`);
      const availableStock = response.data.quantity;
      
      if (item.quantity > availableStock) {
        setAlertMessage(`Insufficient stock for part number: ${item.part_no}. Available: ${availableStock}, Requested: ${item.quantity}`);
        return false;
      }
    }
    setAlertMessage('part added to cart'); 
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
      //notes, setNotes,
      alertMessage, setAlertMessage,
      componentRef,
    }}>
      {children} 
      
    </State.Provider>
  );
};

export default StateContextProvider;
