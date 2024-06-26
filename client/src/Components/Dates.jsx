import React from 'react';

const Dates = ({ invoiceDate, setInvoiceDate, warrantyDate, setWarrantyDate }) => {
  return (
    <section className="my-5">
      <div className="flex flex-col">
        
        <label htmlFor="invoiceDate" className="mb-2">Invoice Date</label>
        <input 
          type="date" 
          id="invoiceDate"
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.target.value)}
          className="border p-2 mb-4"
        />
        <label htmlFor="warrantyDate" className="mb-2">Warranty Date</label>
        <input 
          type="date" 
          id="warrantyDate"
          value={warrantyDate}
          onChange={(e) => setWarrantyDate(e.target.value)}
          className="border p-2 mb-4"
        />
      </div>
    </section>
  );
};

export default Dates;
