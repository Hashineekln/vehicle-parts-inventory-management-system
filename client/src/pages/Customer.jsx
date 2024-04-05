import React, { useState } from 'react';

const Customer = () => {
  const [customers, setCustomers] = useState([
    { id: 1, customer_id: 123, first_name: 'janath', last_name: 'silva', phone: '1234567890', edit: 'edit' },
    { id: 2, customer_id: 123, first_name: 'gayan', last_name: 'perera', phone: '0987654321', edit: 'edit' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    first_name: '',
    last_name: '',
    phone: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCustomer(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddCustomer = (event) => {
    event.preventDefault();
    const newId = customers.length ? Math.max(...customers.map(customer => customer.id)) + 1 : 1;
    setCustomers([...customers, { ...newCustomer, id: newId, customer_id: newId, edit: 'edit' }]);
    setShowForm(false);
    setNewCustomer({ first_name: '', last_name: '', phone: '' });
  };

  const filteredCustomers = customers.filter(customer =>
    customer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div className="overflow-x-auto relative flex-1 p-4">
      <h1 className="text-2xl font-semibold text-gray-200 dark:text-gray-950">Customer Details</h1>

      <div className="flex justify-end mb-4 space-x-2">
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-md bg-sky-500 px-9 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {showForm ? 'Cancel' : 'Add Customer'}
        </button>
        {!showForm && (
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search customer"
            className="py-2 px-4 border rounded"
          />
        )}
      </div>

      {showForm && (
        <form onSubmit={handleAddCustomer} className="mb-4 flex space-x-2">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={newCustomer.first_name}
            onChange={handleInputChange}
            required
            className="py-2 px-4 border rounded"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={newCustomer.last_name}
            onChange={handleInputChange}
            required
            className="py-2 px-4 border rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={newCustomer.phone}
            onChange={handleInputChange}
            required
            className="py-2 px-4 border rounded"
          />
          <button
            type="submit"
            className="rounded-md bg-green-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      )}

      <table className="w-full text-sm text-left text-gray-50 dark:text-gray-950">
        <thead className="text-xs text-gray-950 uppercase bg-gray-50 dark:bg-slate-80 dark:text-gray-950">
          <tr>
            <th scope="col" className="py-3 px-6">Customer ID</th>
            <th scope="col" className="py-3 px-6">First Name</th>
            <th scope="col" className="py-3 px-6">Last Name</th>
            <th scope="col" className="py-3 px-6">Phone</th>
            <th scope="col" className="py-3 px-6">Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id} className="bg-white border-b dark:bg-gray-100 dark:border-gray-200">
              <td className="py-4 px-6">{customer.customer_id}</td>
              <td className="py-4 px-6">{customer.first_name}</td>
              <td className="py-4 px-6">{customer.last_name}</td>
              <td className="py-4 px-6">{customer.phone}</td>
              <td className="py-4 px-6">{customer.edit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;
