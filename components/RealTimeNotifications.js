// src/components/RealTimeNotifications.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './RealTimeNotifications.css';

const socket = io('http://localhost:9000');

const RealTimeNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    // Listen for new notifications from the backend
    socket.on('newNotification', (notification) => {
      setNotifications((prev) => [...prev, notification]);

      // Send email on new notification
      axios.post('http://localhost:9000/send-email', { email: userEmail, message: notification })
        .then(response => console.log('Email sent:', response.data))
        .catch(error => console.error('Error sending email:', error));
    });

    return () => {
      socket.off('newNotification');
    };
  }, [userEmail]);

  return (
    <div>
      <h2>Real-Time Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeNotifications;
