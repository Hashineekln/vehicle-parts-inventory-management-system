//return managemnet for bills

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ReturnForm() {
    const { bill_id } = useParams();
    const navigate = useNavigate();
    const [billDetails, setBillDetails] = useState(null);
    const [returnItems, setReturnItems] = useState([]);
    const [returnAmount, setReturnAmount] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/bills/${bill_id}`)
            .then(res => {
                setBillDetails(res.data[0]);
                //Fetches bill details from 
                //the API and initializes returnItems current data.
                const items = res.data[0].part_nos.split(',').map((part_no, index) => ({
                    part_no,
                    part_name: res.data[0].part_names.split(',')[index],
                    price: parseFloat(res.data[0].selling_prices.split(',')[index]), // price as float
                    quantity: parseInt(res.data[0].selling_quantities.split(',')[index], 10), //  quantity as int
                    return_quantity: 0,
                    return_type: ''
                }));
                setReturnItems(items);
            })
            .catch(err => {
                console.error('Error fetching bill details:', err);
            });
    }, [bill_id]);

    useEffect(() => {
        // Compute return amount when returnItems change
        const totalAmount = returnItems.reduce((sum, item) => sum + (item.price * item.return_quantity), 0);
        setReturnAmount(totalAmount.toFixed(2)); // Format the total amount to two decimal places
    }, [returnItems]);


    //Updates the return quantity for item
    const handleReturnQuantityChange = (index, value) => {
        const newReturnItems = [...returnItems];
        newReturnItems[index].return_quantity = parseInt(value, 10); // return quantity is an integer
        setReturnItems(newReturnItems);
    };

    //Updates the return type for  item
    const handleReturnTypeChange = (index, value) => {
        const newReturnItems = [...returnItems];
        newReturnItems[index].return_type = value;
        setReturnItems(newReturnItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        //checks if the return quantity is less than or equal to zero
        //return quantity exceeds the original quantity of the item
        for (const item of returnItems) {
            if (item.return_quantity <= 0 || item.return_quantity > item.quantity) {
                setError(`Invalid return quantity for part number: ${item.part_no}`);
                return;
            }

            //type required
            if (!item.return_type) {
                setError(`Return type is required for part number: ${item.part_no}`);
                return;
            }
        }

        const returnData = {
            bill_bill_id: bill_id,
            return_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
            type: 'return',
            total_amount: parseFloat(returnAmount) //  total amount is sent as a float
        };

        
        axios.post('http://localhost:5000/api/returnitem', { returnData, returnItems })
            .then(res => {
                // Show success message
                alert('Return submitted successfully.');
                navigate('/Returntable');
            })
            .catch(err => {
                // Show error message
                if (err.response && err.response.data && err.response.data.error) {
                    setError(`Error: ${err.response.data.error}`);
                } else {
                    setError('Error submitting return.');
                }
                console.error('Error submitting return:', err);
            });
    };

    if (!billDetails) return <div>Loading...</div>;

    return (
        <div className='overflow-x-auto relative flex-1 p-4'>
            <div className='w-full bg-white rounded p-3'>
                <h1 className='text-2xl font-semibold text-gray-800'>Return Form for Bill ID: {bill_id}</h1>
                {error && (
                    <div className="bg-red-500 text-white p-2 mb-4 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <table className='w-full text-sm text-left text-gray-800'>
                        <thead className='text-xs text-gray-800 uppercase bg-gray-200'>
                            <tr>
                                <th className='py-3 px-6'>Part No</th>
                                <th className='py-3 px-6'>Part Name</th>
                                <th className='py-3 px-6'>Price</th>
                                <th className='py-3 px-6'>Quantity</th>
                                <th className='py-3 px-6'>Return Quantity</th>
                                <th className='py-3 px-6'>Return Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returnItems.map((item, index) => (
                                <tr key={index} className='bg-white border-b'>
                                    <td className='py-4 px-6'>{item.part_no}</td>
                                    <td className='py-4 px-6'>{item.part_name}</td>
                                    <td className='py-4 px-6'>{item.price}</td>
                                    <td className='py-4 px-6'>{item.quantity}</td>
                                    <td className='py-4 px-6'>
                                        <input
                                            type='number'
                                            value={item.return_quantity}
                                            onChange={(e) => handleReturnQuantityChange(index, e.target.value)}
                                            min='1'
                                            max={item.quantity}
                                            className='border rounded py-1 px-2'
                                            required
                                        />
                                    </td>
                                    <td className='py-4 px-6'>
                                        <select
                                            value={item.return_type}
                                            onChange={(e) => handleReturnTypeChange(index, e.target.value)}
                                            className='border rounded py-1 px-2'
                                            required
                                        >
                                            <option value="">Select a type</option>
                                            <option value="defected">Defected</option>
                                            <option value="Misconfig">Misconfig</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4">
                        <strong>Total Return Amount: Rs.{returnAmount}</strong>
                    </div>

                    <button
                        type='submit'
                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4'
                    >
                        Submit Return
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ReturnForm;
