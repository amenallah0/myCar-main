import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const ApiExpertService = {
  getAllExperts: async () => {
    try {
      const response = await api.get('/users/experts');  // Nouvelle route pour obtenir les utilisateurs experts
      return response.data;
    } catch (error) {
      console.error('Error fetching experts:', error);
      throw error.response ? error.response.data : error;
    }
  },

  deleteExpert(id) {
    return axios.delete(`${API_URL}/${id}`);
  },

  updateExpert(id, expert) {
    return axios.put(`${API_URL}/${id}`, expert);
  },

  createExpert(expert) {
    return axios.post(API_URL, expert);
  }
};

export default ApiExpertService; 