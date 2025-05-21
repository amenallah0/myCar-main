import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiNotificationService from '../services/apiNotificationServices';
import { isAuthenticated } from '../services/apiUserServices';
import TokenService from '../services/TokenService';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  const fetchNotifications = async () => {
    try {
      if (!TokenService.isAuthenticated()) {
        console.log('User not authenticated, skipping notifications fetch');
        return;
      }

      const data = await ApiNotificationService.getAllNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      if (error.response?.status === 401) {
        TokenService.removeTokens();
        window.location.href = '/signin';
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
