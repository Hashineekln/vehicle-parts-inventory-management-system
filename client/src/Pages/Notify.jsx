import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const Notify = ({ onNewNotification }) => {
  const [notifications, setNotifications] = useState([]);
  const [checkedParts, setCheckedParts] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    socket.on('notification', (data) => {
      // Check if the notification already exists in checkedParts
      if (!checkedParts.includes(data.partId)) {
        setNotifications((prevNotifications) => [...prevNotifications, data]);
      }
      if (onNewNotification) onNewNotification(); // Callback for new notification
    });

    return () => {
      socket.off('notification');
    };
  }, [onNewNotification, checkedParts]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/notifications')
      .then(response => {
        setNotifications(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
        setErrors('Error fetching notifications.');
        setNotifications([]);
      });
  }, []);

  const handleChecked = (partId) => {
    setCheckedParts((prevCheckedParts) => [...prevCheckedParts, partId]);
  };

  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  return (
    <div className='overflow-x-auto relative flex-1 p-4'>
      <div className='w-full bg-white rounded p-3 shadow'>
        <div className='flex justify-between mb-3'>
          <h1 className='text-2xl font-semibold text-gray-700'>Notifications</h1>
        </div>
        {errors && <div className="alert alert-danger">{errors}</div>}
        {safeNotifications.length > 0 ? (
          <ul className='space-y-3'>
            {safeNotifications.map((notification, index) => (
              <li key={index} className='bg-white border-b border-gray-200 p-4 rounded shadow-sm'>
                <div className='flex justify-between items-center'>
                  <div>
                    <h2 className='text-lg font-semibold text-gray-700'> {notification.partName}</h2>
                    <p className='text-sm text-gray-500'>Part No: {notification.partId}</p>
                    <p className='text-sm text-gray-500'>Quantity: {notification.quantity}, Threshold: {notification.threshold}</p>
                  </div>
                  <button
                    className={`rounded-md px-3 py-1 text-sm font-semibold text-white shadow-sm focus:outline-none ${
                      checkedParts.includes(notification.partId) ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    onClick={() => handleChecked(notification.partId)}
                    disabled={checkedParts.includes(notification.partId)}
                  >
                    {checkedParts.includes(notification.partId) ? 'Checked' : 'Check'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-500'>No notifications</p>
        )}
      </div>
    </div>
  );
};

export default Notify;
