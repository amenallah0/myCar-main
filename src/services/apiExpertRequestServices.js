import { axiosInstance } from './apiUserServices';

const API_URL = 'http://localhost:8081/api';

const getRequestsForExpert = async (expertId) => {
  const response = await axiosInstance.get(`/expertise-requests/expert/${expertId}`);
  return response.data;
};

const apiExpertRequestService = {
  getUserRequests: async (userId) => {
    try {
      console.log('Fetching requests for user:', userId); // Debug log
      const response = await axiosInstance.get(`/expertise-requests/user/${userId}`);
      console.log('Response data:', response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error('Error fetching user requests:', error);
      throw error;
    }
  },

  getAllRequests: async () => {
    try {
      const response = await axiosInstance.get('/expert-requests');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  approveRequest: (id) => {
    return axiosInstance.put(`/admin/expert-requests/${id}/approve`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error in approveRequest:', error);
        throw error;
      });
  },

  rejectRequest: (id) => {
    return axiosInstance.put(`/admin/expert-requests/${id}/reject`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error in rejectRequest:', error);
        throw error;
      });
  },

  createRequest: async (requestData) => {
    try {
      const response = await axiosInstance.post('/expert-requests', requestData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating expert request:', error);
      throw error;
    }
  },

  deleteRequest: (id) => {
    return axiosInstance.delete(`/expert-requests/${id}`)
      .then(response => {
        console.log('Delete response:', response);
        return response.data;
      })
      .catch(error => {
        console.error('Error in deleteRequest:', error);
        throw error;
      });
  },

  getRequestsForExpert
};

export default apiExpertRequestService; 