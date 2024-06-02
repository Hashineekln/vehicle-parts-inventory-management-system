import React, { useContext, useState, useRef } from 'react';
import { State } from "../context/stateContext";
import axios from 'axios';
import ReactToPrint from 'react-to-print'; 
//import ClientDetails from "../Components/ClientDetails";
import Dates from "../Components/Dates";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import MainDetails from "../Components/MainDetails";
import Notes from "../Components/Notes";
import TableForm from "../Components/TableForm";
import Clientsearch from "../Components/Clientsearch";
import { Link, useNavigate } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';

const Bill = () => {
  const { 
    userId, setUserId,
    clientId, setClientId,
    firstName, setFirstName,
    lastName, setLastName,
    phone, setPhone,
    
    invoiceDate, setInvoiceDate,
    warrantyDate, setWarrantyDate,
    notes, setNotes,
    cart, componentRef,
    validateCartStock, // Import validateCartStock function
    alertMessage // Import alertMessage state
  } = useContext(State);

  const [discount, setDiscount] = useState(0);
  const [billAlertMessage, setBillAlertMessage] = useState(null); // Bill creation alert message

  const clientName = `${firstName} ${lastName}`;
  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalDiscount = totalAmount * (discount / 100);
  const discountedTotal = totalAmount - totalDiscount;

  const handleCreateBill = async () => {
    if (await validateCartStock()) { // Validate stock before proceeding
      try {
        // Create a new bill
        const billResponse = await axios.post('http://localhost:5000/bill', {
          total_amount: discountedTotal,
          total_discount: totalDiscount,
          invoice_date: invoiceDate,
          warranty_date: warrantyDate,
          user_user_id: userId,
          customer_customer_id: clientId
        });

        const billId = billResponse.data.bill_id;

        // Create bill items
        for (const item of cart) {
          await axios.post(`http://localhost:5000/bill/${billId}`, {
            vehicle_part_part_no: item.part_no,
            vehicle_part_part_name: item.part_name,
            selling_price: item.price,
            selling_quantity: item.quantity
          });
        }

        // Show success message
        setBillAlertMessage({ type: 'success', text: 'Bill created successfully' });
      } catch (error) {
        // Show error message
        setBillAlertMessage({ type: 'error', text: 'Error creating bill: ' + (error.response?.data?.error || error.message) });
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Dashboard /> {/* Include the Dashboard sidebar */}
      <main className="flex-grow m-5 p-5 bg-white rounded shadow overflow-auto">
        <ReactToPrint
          trigger={() => <button className="bg-blue-500 text-white p-2 mt-4">Print/Download</button>}
          content={() => componentRef.current}
        />
        <div ref={componentRef} className="p-5">
          <Header />
          <MainDetails 
            id={userId}
            setId={setUserId}
            cashierId={userId}
            setCashierId={setUserId}
          />
          <div className="my-4">
            <h2 className="text-xl font-bold">Cashier Information</h2>
            <p><strong>Cashier ID:</strong> {userId}</p>
          </div>
          <Clientsearch />
          <div className="my-4">
            <h2 className="text-xl font-bold">Client Information</h2>
            <p><strong>Name:</strong> {clientName}</p>
            <p><strong>Client ID:</strong> {clientId}</p>
            <p><strong>Phone:</strong> {phone}</p>
          </div>
          <Link to="/clientadd" className="bg-green-500 text-white p-2 mt-4">Add New Client</Link>
          <Dates 
           
            invoiceDate={invoiceDate}
            setInvoiceDate={setInvoiceDate}
            warrantyDate={warrantyDate}
            setWarrantyDate={setWarrantyDate}
          />
          <TableForm cart={cart} />
          <Notes notes={notes} setNotes={setNotes} />
          <div className="p-5">
            <label htmlFor="discount" className="block mb-2">Discount (%)</label>
            <input 
              type="number"
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="border p-2 mb-4"
            />
            <h2 className="text-lg font-bold">Total: Rs.{discountedTotal.toFixed(2)}</h2>
          </div>
          <button onClick={handleCreateBill} className="bg-blue-500 text-white p-2 mt-4">Create Bill</button>
          {alertMessage && (
            <div className={`mt-4 p-2 text-white ${alertMessage.includes('Insufficient stock') ? 'bg-red-500' : 'bg-green-500'}`}>
              {alertMessage}
            </div>
          )}
          {billAlertMessage && (
            <div className={`mt-4 p-2 text-white ${billAlertMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
              {billAlertMessage.text}
            </div>
          )}
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Bill;
