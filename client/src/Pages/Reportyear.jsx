import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ReactToPrint from 'react-to-print';

const Report = () => {
  const [report, setReport] = useState({
    total_revenue: 0,
    total_buying_cost: 0,
    total_return_cost: 0,
    total_cost: 0,
    total_profit: 0,
    inventory_in_hand: 0,
    inventory_quantity: 0,
    inventory_sold_quantity: 0,
    inventory_return_quantity: 0,
    inventory_buy_quantity: 0  // Added field for inventory quantity
  });

  const componentRef = useRef();

  useEffect(() => {
    axios.get('http://localhost:5000/api/reportyear')
      .then(response => setReport(response.data))
      .catch(error => console.error('Error fetching report data:', error));
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-md rounded-lg" ref={componentRef}>
      <div className="text-center mb-8">
        <h1 className="font-bold uppercase tracking-wide text-3xl mb-4">Annual Report</h1>
        <div className="flex items-center justify-center mb-4">
          <img
            src="src/assets/Logo.jpg"
            alt="LHI Company"
            className="w-24 h-24 mr-4"
          />
        </div>
        <div className="font-bold text-xl">LHI LOGISTIC</div>
        <div>Address: No 164/B, Kottawa - Malabe Rd, Pannipitiya</div>
        <div>Tel: +94 7652 996</div>
        <div>Fax: 7684935493</div>
      </div>

      <table className="min-w-full bg-white">
        <tbody>
          <tr className="w-full border-b border-gray-300">
            <td className="py-2 text-lg font-medium text-gray-700">Total Revenue
            <table className="w-full">
                <tbody>
                  <tr>
                    <td className="pt-1 text-sm text-gray-600 pl-4">Quantity sold</td>
                    <td className="pt-1 text-sm text-right text-gray-900">{report.inventory_sold_quantity}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td className="py-2 text-right text-2xl font-bold text-gray-900">Rs. {report.total_revenue.toFixed(2)}</td>
          </tr>
           
        
          <tr className="w-full border-b border-gray-300">
            <td className="py-2 text-lg font-medium text-gray-700">
              Inventory In Hand
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="pt-1 text-sm text-gray-600 pl-4">Quantity In Hand</td>
                    <td className="pt-1 text-sm text-right text-gray-900">{report.inventory_quantity}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td className="py-2 text-right text-2xl font-bold text-gray-900">Rs. {report.inventory_in_hand.toFixed(2)}</td>
          </tr>
          <tr className="w-full border-b border-gray-300">
            <td className="py-2 text-lg font-medium text-gray-700">Total Buying Cost<table className="w-full">
                <tbody>
                  <tr>
                    <td className="pt-1 text-sm text-gray-600 pl-4">Buying Quantity</td>
                    <td className="pt-1 text-sm text-right text-gray-900">{report.inventory_buy_quantity}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td className="py-2 text-right text-2xl font-bold text-gray-900">Rs. {report.total_buying_cost.toFixed(2)}</td>
          </tr>
           
         


          <tr className="w-full border-b border-gray-300">
            <td className="py-2 text-lg font-medium text-gray-700">Total Return Cost
            
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="pt-1 text-sm text-gray-600 pl-4">Return Quantity</td>
                    <td className="pt-1 text-sm text-right text-gray-900">{report.inventory_return_quantity}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td className="py-2 text-right text-2xl font-bold text-gray-900">Rs. {report.total_return_cost.toFixed(2)}</td>
          </tr>
          
          




          <tr className="w-full border-b border-gray-300">
            <td className="py-2 text-lg font-medium text-gray-700">Total Cost</td>
            <td className="py-2 text-right text-2xl font-bold text-gray-900">Rs. {report.total_cost.toFixed(2)}</td>
          </tr>
          <tr className="w-full">
            <td className="py-2 text-lg font-medium text-gray-700">Total Profit</td>
            <td className="py-2 text-right text-2xl font-bold text-gray-900">Rs. {report.total_profit.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div className="text-center mt-8">
        <ReactToPrint
          trigger={() => <button className="bg-blue-500 text-white py-2 px-4 rounded">Print/Download</button>}
          content={() => componentRef.current}
        />
      </div>
    </div>
  );
};

export default Report;
