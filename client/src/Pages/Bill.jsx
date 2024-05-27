import { useContext } from "react";



import ClientDetails from "../Components/ClientDetails";
import Dates from "../Components/Dates";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import MainDetails from "../Components/MainDetails";
import Notes from "../Components/Notes";
import Table from "../Components/Table";
import TableForm from "../Components/TableForm";
import ReactToPrint from "react-to-print"; 

import { State } from "../context/stateContext";

function Bill() {
  const {
    name,
    setName,
    address,
    setAddress,
    email,
    setEmail,
    phone,
    setPhone,
    bankName,
    setBankName,
    bankAccount,
    setBankAccount,
    website,
    setWebsite,
    clientName,
    setClientName,
    clientAddress,
    setClientAddress,
    invoiceNumber,
    setInvoiceNumber,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    notes,
    setNotes,
    componentRef,
  } = useContext(State);

  return (
    
<>
<main
  className="m-5 p-5 xl:grid grid-cols-2 gap-10 xl:items-start"
  style={{
    maxWidth: "1920px",
    margin: "auto",
  }}
>
  <section>
    <div className="bg-white p-5 rounded shadow">
      <div className="flex flex-col justify-center">

        <h3 className="font-size: 2.2em  font-extrabold mb-5"> Cashier Details</h3>

        <article className="md:grid grid-cols-2 gap-10">
          <div className="flex flex-col">
            <label htmlFor="name">Cashier Id</label>
            <input
              type="text"
              name="text"
              id="name"
              placeholder="Cashier Id"
              maxLength={56}
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </article>
        <br></br>
        <h3 className="font-size: 2.2em  font-extrabold mb-5"> Client Details</h3>
        <article className="md:grid grid-cols-2 gap-10 ">
          <div className="flex flex-col">
            <label htmlFor="clientName">First Name</label>
            <input
              type="text"
              name="clientName"
              id="clientName"
              placeholder="Enter your client's name"
              maxLength={56}
              autoComplete="off"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="clientName">Last Name</label>
            <input
              type="text"
              name="clientName"
              id="clientName"
              placeholder="Enter your client's name"
              maxLength={56}
              autoComplete="off"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          </article>
          <article>
          <div className="flex flex-col">
            <label htmlFor="clientAddress">Phone Number</label>
            <input
              type="text"
              name="clientAddress"
              id="clientAddress"
              placeholder="Enter your client's Phone Number"
              maxLength={96}
              autoComplete="off"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
            />
          </div>
        </article>
        <br></br>
        <h3 className="font-size: 2.2em  font-extrabold mb-5"> Bill Details</h3>
        <article className="md:grid grid-cols-2 ">
          <div className="flex flex-col">
            <label htmlFor="invoiceNumber">Invoice Number</label>
            <input
              type="text"
              name="invoiceNumber"
              id="invoiceNumber"
              placeholder="Invoice Number"
              autoComplete="off"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="invoiceDate">Invoice Date</label>
            <input
              type="date"
              name="invoiceDate"
              id="invoiceDate"
              placeholder="Invoice Date"
              autoComplete="off"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="dueDate">Warranty Date</label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              placeholder="Invoice Date"
              autoComplete="off"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </article>

        
        {/* This is our table form */}
        <article>
        <br></br>   <br></br>
        <h3 className="font-size: 2.2em  font-extrabold mb-5"> Vehicle Part Details</h3>
          <TableForm />
          <br></br>
        </article>

        <label htmlFor="notes">Additional Notes</label>
        <textarea
          name="notes"
          id="notes"
          cols="30"
          rows="10"
          placeholder="Additional notes to the client"
          maxLength={500}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>
    </div>
  </section>

  {/* Invoice Preview */}
  <div className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200">
    <ReactToPrint
      trigger={() => (
        <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
          Print / Download
        </button>
      )}
      content={() => componentRef.current}
    />
    <div ref={componentRef} className="p-5">
      <Header />
      <MainDetails />
      <ClientDetails />
      <Dates />
      <Table />
      <Notes />
      <Footer />
    </div>
  </div>
</main>
</>

  );
}

export default Bill;
