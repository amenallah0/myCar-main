import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

const apiExpertRequestService = {
  getUserRequests: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/expertise-requests/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user requests:', error);
      throw error;
    }
  },

  getAllRequests: () => {
    return axios.get(`${API_URL}/expert-requests`)
      .then(response => response.data);
  },

  approveRequest: (id) => {
    return new Promise((resolve, reject) => {
      axios.put(`${API_URL}/expert-requests/${id}/approve`)
        .then(response => {
          console.log('Approve response:', response);
          if (response.status === 200) {
            return axios.delete(`${API_URL}/expert-requests/${id}`)
              .then(() => {
                console.log('Request deleted successfully');
                resolve(response.data);
              })
              .catch(deleteError => {
                console.log('Delete not required or failed, but approve succeeded');
                resolve(response.data);
              });
          }
          resolve(response.data);
        })
        .catch(error => {
          console.error('Error in approveRequest:', error);
          reject(error);
        });
    });
  },

  rejectRequest: (id) => {
    return axios.put(`${API_URL}/expert-requests/${id}/reject`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error in rejectRequest:', error);
        throw error;
      });
  },

  createRequest: async (requestData) => {
    try {
      const response = await axios.post(`${API_URL}/expert-requests`, requestData, {
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
    return axios.delete(`${API_URL}/expert-requests/${id}`)
      .then(response => {
        console.log('Delete response:', response);
        return response.data;
      })
      .catch(error => {
        console.error('Error in deleteRequest:', error);
        throw error;
      });
  }
};

export default apiExpertRequestService; 