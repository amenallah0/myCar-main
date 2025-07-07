import axios from 'axios';
import { axiosInstance } from './apiUserServices';

const API_URL = process.env.REACT_APP_API_URL + '/api';
const EXPERTISE_REQUEST_URL = process.env.REACT_APP_API_URL + '/api/expertise-requests';


const apiExpertiseService = {
    getExpertiseRequest: async (id) => {
        try {
            const response = await fetch(`${API_URL}/expertise-requests/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch request details');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching expertise request:', error);
            throw error;
        }
    },

    submitReport: async (requestId, formData) => {
        try {
            const response = await axios.post(
                `${API_URL}/expertise-requests/${requestId}/submit-report`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    maxContentLength: Infinity,
                    maxBodyLength: Infinity,
                    timeout: 60000, // 60 secondes
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log('Upload progress:', percentCompleted);
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error submitting report:', error);
            throw error;
        }
    },

    approveRequest: (id) => {
        return axiosInstance.put(`/expertise-requests/${id}/accept`)
          .then(response => response.data)
          .catch(error => {
            console.error('Error in approveRequest:', error);
            throw error;
          });
      },
    
      rejectRequest: (id) => {
        return axiosInstance.put(`/expertise-requests/${id}/reject`)
          .then(response => response.data)
          .catch(error => {
            console.error('Error in rejectRequest:', error);
            throw error;
          });
      },

    getExpertiseRequests() {
        return axios.get(EXPERTISE_REQUEST_URL)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching expertise requests:', error);
                throw new Error('Failed to fetch expertise requests');
            });
    },

    getExpertiseRequest(requestId) {
        return axios.get(`${EXPERTISE_REQUEST_URL}/${requestId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching expertise request:', error);
                throw new Error('Failed to fetch expertise request');
            });
    }
};

export default apiExpertiseService; 
