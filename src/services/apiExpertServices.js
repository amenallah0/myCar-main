import { axiosInstance } from './apiUserServices';

const API_URL = process.env.REACT_APP_API_URL + '/api';
const USER_API_URL = process.env.REACT_APP_API_URL + '/api/users';


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
    return axiosInstance.delete(`${USER_API_URL}/${id}`);
  },

  updateExpert(id, expert) {
    return axiosInstance.put(`${API_URL}/${id}`, expert);
  },

  createExpert(expert) {
    return axiosInstance.post(API_URL, expert);
  }
};

export default ApiExpertService; 
