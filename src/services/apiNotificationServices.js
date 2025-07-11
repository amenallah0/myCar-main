import axios from 'axios';
import api from './apiUserServices';

const API_URL = process.env.REACT_APP_API_URL + '/api';

const ApiNotificationService = {
  // Fonction pour créer une notification
  createNotification: async (notificationData) => {
    try {
      const response = await axios.post(`${API_URL}/api/notifications`, notificationData);
      return response.data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error; // Propager l'erreur pour la gestion dans le composant
    }
  },

  // Fonction pour obtenir toutes les notifications
  getAllNotifications: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notifications`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  // Fonction pour marquer une notification comme lue
  markAsRead: async (id) => {
    try {
      const response = await axios.put(`${API_URL}/api/notifications/${id}/read`);
      return response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  // Fonction pour marquer toutes les notifications comme lues
  markAllAsRead: async () => {
    try {
      const response = await axios.put(`${API_URL}/api/notifications/mark-all-read`);
      return response.data;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },

  // Fonction pour supprimer une notification
  deleteNotification: async (id) => {
    try {
      await axios.delete(`${API_URL}/api/notifications/${id}`);
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error; // Propager l'erreur pour la gestion dans le composant
    }
  }
};

export default ApiNotificationService; 
