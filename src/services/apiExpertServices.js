import { axiosInstance } from './apiUserServices';

const API_URL = 'http://localhost:8081/api';

const ApiExpertService = {
  getAllExperts: async () => {
    try {
      const response = await axiosInstance.get('/users/experts');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteExpert(id) {
    return axiosInstance.delete(`${API_URL}/${id}`);
  },

  updateExpert(id, expert) {
    return axiosInstance.put(`${API_URL}/${id}`, expert);
  },

  createExpert(expert) {
    return axiosInstance.post(API_URL, expert);
  }
};

export default ApiExpertService; 