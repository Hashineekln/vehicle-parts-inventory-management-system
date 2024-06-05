import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [categoryCount, setCategoryCount] = useState(0);
  const [partCount, setPartCount] = useState(0);
  const [topSellingParts, setTopSellingParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories/count')
      .then(response => setCategoryCount(response.data.count))
      .catch(error => console.error('Error fetching category count:', error));

    axios.get('http://localhost:5000/api/parts/count')
      .then(response => setPartCount(response.data.count))
      .catch(error => console.error('Error fetching part count:', error));

    axios.get('http://localhost:5000/api/billitems/top5')
      .then(response => {
        console.log('Top Selling Parts Response:', response);
        if (response.data && Array.isArray(response.data)) {
          setTopSellingParts(response.data);
          setFilteredParts(response.data); // Initialize filtered parts with all parts
        } else {
          console.error('Invalid response format for top selling parts');
          setTopSellingParts([]);
          setFilteredParts([]);
        }
      })
      .catch(error => {
        console.error('Error fetching top selling parts:', error);
        setTopSellingParts([]);
        setFilteredParts([]);
        setError('Error fetching top selling parts. Please try again.');
      });
  }, []);

  useEffect(() => {
    filterParts();
  }, [searchQuery, topSellingParts]);

  const filterParts = () => {
    if (searchQuery.trim() === '') {
      setFilteredParts(topSellingParts); // Show all parts if search query is empty
    } else {
      const filtered = topSellingParts.filter(part => {
        return (
          part.vehicle_part_part_no.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by part number
          part.total_quantity.toString().includes(searchQuery) // Search by total quantity
        );
      });
      setFilteredParts(filtered);
    }
  };

  const topPartsData = {
    labels: filteredParts.map(item => item.vehicle_part_part_no),
    datasets: [{
      label: 'Top 5 Selling Parts (Last 30 Days)',
      data: filteredParts.map(item => item.total_quantity),
      backgroundColor: 'rgba(75, 192, 192, 0.4)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      barPercentage: 0.2,
      categoryPercentage: 1.0
    }]
  };

  return (
    <div className='overflow-x-auto relative flex-1 p-4'>
      <div className='w-full bg-white rounded p-3'>
        <div className='flex justify-between mb-3'>
          <h1 className='text-2xl font-semibold text-gray-800'>Dashboard</h1>
        </div>
        <div className='mb-6 grid grid-cols-2 gap-4'>
          <div className='bg-gray-100 rounded p-4 text-center'>
            <h2 className='text-lg font-medium text-gray-700'>Number of Categories</h2>
            <p className='text-4xl font-bold text-gray-900'>{categoryCount}</p>
          </div>
          <div className='bg-gray-100 rounded p-4 text-center'>
            <h2 className='text-lg font-medium text-gray-700'>Number of Parts</h2>
            <p className='text-4xl font-bold text-gray-900'>{partCount}</p>
          </div>
        </div>
        <div className='flex justify-between mb-3'>
          <h2 className='text-lg font-medium text-gray-700'>Top 05 Selling Parts</h2>
          <input
            type="text"
            placeholder="Search by Part Number or Quantity"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-72 px-3 py-1.5"
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <Bar data={topPartsData} />
      </div>
    </div>
  );
};

export default Dashboard;
