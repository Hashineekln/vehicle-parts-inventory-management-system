import React, { useContext, useState } from 'react';
import { State } from "../context/stateContext";
import axios from 'axios';
import ReactToPrint from 'react-to-print'; 
import Dates from "../Components/Dates";
import Footer from "../Components/Footer";
import MainDetails from "../Components/MainDetails";
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
    cart, componentRef,
    validateCartStock, 
    alertMessage 
  } = useContext(State);

  const [discount, setDiscount] = useState(0);
  const [billAlertMessage, setBillAlertMessage] = useState(null); 
  const [billId, setBillId] = useState(null); 

  const navigate = useNavigate(); // Add the useNavigate hook

  const clientName = `${firstName} ${lastName}`;
  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalDiscount = totalAmount * (discount / 100);
  const discountedTotal = totalAmount - totalDiscount;

  const handleCreateBill = async () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    if (!userId || !invoiceDate || !warrantyDate || !clientId || !clientName || cart.length === 0) {
      setBillAlertMessage({ type: 'error', text: 'Please fill in all required details and ensure the cart is not empty.' });
      return;
    }

    if (invoiceDate < today || warrantyDate < today) {
      setBillAlertMessage({ type: 'error', text: 'Invoice date and warranty date cannot be before today.' });
      return;
    }

    if (await validateCartStock()) { 
      try {
        const billResponse = await axios.post('http://localhost:5000/bill', {
          total_amount: discountedTotal,
          total_discount: totalDiscount,
          invoice_date: invoiceDate,
          warranty_date: warrantyDate,
          user_user_id: userId,
          customer_customer_id: clientId
        });

        const newBillId = billResponse.data.bill_id;
        setBillId(newBillId);

        for (const item of cart) {
          await axios.post(`http://localhost:5000/bill/${newBillId}`, {
            vehicle_part_part_no: item.part_no,
            vehicle_part_part_name: item.part_name,
            selling_price: item.price,
            selling_quantity: item.quantity
          });
        }

        setBillAlertMessage({ type: 'success', text: 'Thank You for shopping with us !' });
      } catch (error) {
        setBillAlertMessage({ type: 'error', text: 'Error creating bill: ' + (error.response?.data?.error || error.message) });
      }
    }
  };

  const handleAfterPrint = () => {
    navigate(`/Billdetails`); // Navigate to the BillDetails page after printing
  };

  return (
    <div className="flex h-screen">
      <Dashboard /> {/* Include the Dashboard sidebar */}
      <main className="flex-grow m-5 p-5 bg-white rounded shadow overflow-auto">
        <style>
          {`
            @media print {
              .no-print {
                display: none;
              }
            }
          `}
        </style>
        <ReactToPrint
          trigger={() => <button className="bg-blue-500 text-white p-2 mt-4 no-print">Print/Download</button>}
          content={() => componentRef.current}
          onAfterPrint={handleAfterPrint} // Add the onAfterPrint handler
        />
        <div ref={componentRef} className="p-5">
          <div className="text-center mb-4">
            <h1 className="font-bold uppercase tracking-wide text-3xl mb-3">Bill Invoice</h1>
            <div className="flex items-center justify-center">
              <img
                src="src/assets/Logo.jpg"
                alt="LHI Company"
                className="w-36 h-36 mr-6"
              />
            </div>
            <div className="font-bold text-lg">LHI LOGISTIC</div>
            <div>Address: No 164/B, Kottawa - Malabe Rd, Pannipitiya</div>
            <div>Tel: +94 7652 996</div>
            <div>Fax: 7684935493</div>
          </div>
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

          <Clientsearch className="print:hidden" /> {/* Hide ClientSearch component when printing */}
          <div className="my-4">
            <h2 className="text-xl font-bold">Client Information</h2>
            <p><strong>Name:</strong> {clientName}</p>
            <p><strong>Client ID:</strong> {clientId}</p>
            <p><strong>Phone:</strong> {phone}</p>
          </div>

          <Link to="/clientadd" className="bg-green-500 text-white p-2 mt-4 no-print">Add New Client</Link>
          <Dates 
            invoiceDate={invoiceDate}
            setInvoiceDate={setInvoiceDate}
            warrantyDate={warrantyDate}
            setWarrantyDate={setWarrantyDate}
          />
          <TableForm />
          
          <div className="p-5">
            <label htmlFor="discount" className="block mb-2">Discount (%)</label>
            <input 
              type="number"
              min="0"
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="border p-2 mb-4 no-print"
            />
            <h2 className="text-lg font-bold">Total: Rs.{discountedTotal.toFixed(2)}</h2>
          </div>
          <button onClick={handleCreateBill} className="bg-blue-500 text-white p-2 mt-4 no-print">Create Bill</button>
          {alertMessage && (
            <div className={`mt-4 p-2 text-white no-print ${alertMessage.includes('Insufficient stock') ? 'bg-red-500' : 'bg-green-500'}`}>
              {alertMessage}
            </div>
          )}
          {billAlertMessage && (
            <div className={`mt-4 p-2 text-white no-print ${billAlertMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
              {billAlertMessage.text}
            </div>
          )}
          {billId && (
            <div className="mt-4 p-2 text-green-500">
              <strong>Bill ID:</strong> {billId}
            </div>
          )}
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Bill;
