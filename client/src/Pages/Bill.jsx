import React, { useContext, useState } from 'react';
import ReactToPrint from 'react-to-print'; 
import { State } from "../context/stateContext";
import ClientDetails from "../Components/ClientDetails";
import Dates from "../Components/Dates";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import MainDetails from "../Components/MainDetails";
import Notes from "../Components/Notes";
import TableForm from "../Components/TableForm";
import Clientsearch from "../Components/Clientsearch";
import { Link } from 'react-router-dom';

const Bill = () => {
  const { 
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
    cart, componentRef 
  } = useContext(State);
  
  const [discount, setDiscount] = useState(0);
  
  const clientName = `${firstName} ${lastName}`;
  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountedTotal = totalAmount - (totalAmount * (discount / 100));

  return (
    <main className="m-5 p-5 bg-white rounded shadow">
      <ReactToPrint
        trigger={() => <button className="bg-blue-500 text-white p-2 mt-4">Print/Download</button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef} className="p-5">
        <Header />
        <MainDetails 
          id={id}
          setId={setId}
          cashierId={cashierId}
          setCashierId={setCashierId}
          //auto generated lets clear later 
        />
        <div className="my-4">
          <h2 className="text-xl font-bold">Cashier Information</h2>
          <p><strong>Cashier ID:</strong> {cashierId}</p>
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
          invoiceNumber={invoiceNumber}
          setInvoiceNumber={setInvoiceNumber}
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
          <h2 className="text-lg font-bold">Total: Rs.{discountedTotal}</h2>
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Bill;
