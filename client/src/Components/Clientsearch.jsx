import React, { useState, useContext } from 'react';
import { State } from '../context/stateContext';

const ClientSearch = () => {
  const { setClientId, setFirstName, setLastName, setPhone } = useContext(State);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/client?search=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Error fetching search results');
      setSearchResults([]);
    }
  };

  const handleSelectClient = (client) => {
    setClientId(client.customer_id);
    setFirstName(client.first_name);
    setLastName(client.last_name);
    setPhone(client.phone);
    setSearchResults([]);
    setSearchQuery(`${client.first_name} ${client.last_name}`);
  };

  return (
    <div>
      <div className="print:hidden"> {/* Hide the input and button when printing */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a client"
          className="border p-2 mb-4"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2">Search</button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {searchResults.length > 0 && (
        <ul className="border p-2 mt-2">
          {searchResults.map((client) => (
            <li
              key={client.id}
              onClick={() => handleSelectClient(client)}
              className="cursor-pointer p-1 hover:bg-gray-200"
            >
              {client.customer_id} {client.first_name} {client.last_name} - {client.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientSearch;
