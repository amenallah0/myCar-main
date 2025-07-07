import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const ApiMessageService = {
  sendMessage: async (messageData) => {
    try {
      const response = await api.post('/messages', messageData);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error.response ? error.response.data : error;
    }
  },

  getMessagesByExpertId: async (expertId) => {
    try {
      const response = await api.get(`/messages/expert/${expertId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting messages:', error);
      throw error.response ? error.response.data : error;
    }
  },

  // Autres méthodes selon vos besoins...
};

export default ApiMessageService; 
