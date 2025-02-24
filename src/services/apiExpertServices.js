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
      const response = await fetch(`${API_URL}/users/experts`);
      if (!response.ok) {
        throw new Error('Failed to fetch experts');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching experts:', error);
      throw error;
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