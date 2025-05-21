import { axiosInstance } from './apiUserServices';

const API_URL = 'http://localhost:8081/api';

const apiAdminService = {
  // User Management
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get('/admin/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axiosInstance.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await axiosInstance.put(`/admin/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Expert Request Management
  getAllExpertRequests: async () => {
    try {
      const response = await axiosInstance.get('/admin/expert-requests');
      return response.data;
    } catch (error) {
      console.error('Error fetching expert requests:', error);
      throw error;
    }
  },

  approveExpertRequest: async (requestId) => {
    try {
      const response = await axiosInstance.put(`/admin/expert-requests/${requestId}/approve`);
      return response.data;
    } catch (error) {
      console.error('Error approving expert request:', error);
      throw error;
    }
  },

  rejectExpertRequest: async (requestId) => {
    try {
      const response = await axiosInstance.put(`/admin/expert-requests/${requestId}/reject`);
      return response.data;
    } catch (error) {
      console.error('Error rejecting expert request:', error);
      throw error;
    }
  },

  // Expert Management
  getAllExperts: async () => {
    try {
      const response = await axiosInstance.get('/admin/experts');
      return response.data;
    } catch (error) {
      console.error('Error fetching experts:', error);
      throw error;
    }
  },

  deleteExpert: async (expertId) => {
    try {
      const response = await axiosInstance.delete(`/admin/experts/${expertId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting expert:', error);
      throw error;
    }
  },

  updateExpert: async (expertId, expertData) => {
    try {
      const response = await axiosInstance.put(`/admin/experts/${expertId}`, expertData);
      return response.data;
    } catch (error) {
      console.error('Error updating expert:', error);
      throw error;
    }
  },

  // Car Management
  getAllCars: async () => {
    try {
      const response = await axiosInstance.get('/admin/cars');
      return response.data;
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  },

  deleteCar: async (carId) => {
    try {
      const response = await axiosInstance.delete(`/admin/cars/${carId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting car:', error);
      throw error;
    }
  },

  updateCar: async (carId, carData) => {
    try {
      const response = await axiosInstance.put(`/admin/cars/${carId}`, carData);
      return response.data;
    } catch (error) {
      console.error('Error updating car:', error);
      throw error;
    }
  },

  // Notification Management
  getAllNotifications: async () => {
    try {
      const response = await axiosInstance.get('/admin/notifications');
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  createNotification: async (notificationData) => {
    try {
      const response = await axiosInstance.post('/admin/notifications', notificationData);
      return response.data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  deleteNotification: async (notificationId) => {
    try {
      const response = await axiosInstance.delete(`/admin/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }
};

export default apiAdminService; 