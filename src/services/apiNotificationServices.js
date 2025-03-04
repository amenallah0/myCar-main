import axios from 'axios';

const API_URL = 'http://localhost:8081/api/notifications'; // Remplacez par l'URL de votre API

const ApiNotificationService = {
  // Fonction pour créer une notification
  createNotification: async (notificationData) => {
    try {
      const response = await axios.post(API_URL, notificationData);
      return response.data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error; // Propager l'erreur pour la gestion dans le composant
    }
  },

  // Fonction pour obtenir toutes les notifications
  getAllNotifications: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error; // Propager l'erreur pour la gestion dans le composant
    }
  },

  // Fonction pour supprimer une notification
  deleteNotification: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error; // Propager l'erreur pour la gestion dans le composant
    }
  }
};

export default ApiNotificationService; 