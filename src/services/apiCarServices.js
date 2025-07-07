import { axiosInstance } from './apiUserServices';
import TokenService from './TokenService';

const API_URL = process.env.REACT_APP_API_URL + '/api';

const ApiCarService = {
    getAllCars: async () => {
        try {
            const response = await axiosInstance.get('/cars');
            return response.data;
        } catch (error) {
            console.error('Error getting all cars:', error);
            throw error;
        }
    },

    getCarById: async (id) => {
        try {
            const response = await axiosInstance.get(`/cars/${id}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    addCarToUser: async (userId, car) => {
        try {
            const response = await axiosInstance.post(`/cars/user/${userId}/add`, car);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    addCarWithImagesToUser: async (userId, car, files) => {
        try {
            const formData = new FormData();
            formData.append('car', new Blob([JSON.stringify(car)], { type: 'application/json' }));
            files.forEach((file) => formData.append('files', file));

            const response = await axiosInstance.post(`/cars/user/${userId}/addWithImages`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding car:', error);
            throw error.response?.data || error;
        }
    },

    deleteCar: async (carId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axiosInstance.delete(`/cars/${carId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error("API deleteCar error:", error);
            throw error;
        }
    },

    uploadImagesToCar: async (carId, files) => {
        try {
            const formData = new FormData();
            files.forEach((file) => formData.append('files', file));

            const response = await axiosInstance.post(`/cars/${carId}/images`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    getCarsByUserId: async (userId) => {
        try {
          const response = await axiosInstance.get(`/cars/user/${userId}`);
          return response.data;
        } catch (error) {
          console.error('Get Cars By User ID Error:', error);
          throw error.response ? error.response.data : error;
        }
      },
      getLatestCars: async () => {
        try {
            const response = await axiosInstance.get('/cars/latest', {
                headers: {
                    'Authorization': `Bearer ${TokenService.getLocalAccessToken()}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    updatePromotionStatus: async (carId, promoted) => {
        try {
            console.log('[updatePromotionStatus] carId:', carId, 'promoted:', promoted);
            const response = await axiosInstance.put(`/cars/${carId}/promote`, null, {
                params: { promoted },
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('[updatePromotionStatus] response:', response);
            return response.data;
        } catch (error) {
            console.error('[updatePromotionStatus] ERROR:', error);
            if (error.response) {
                console.error('[updatePromotionStatus] error.response.data:', error.response.data);
                console.error('[updatePromotionStatus] error.response.status:', error.response.status);
            }
            throw error.response?.data || error;
        }
    },
    getPromotedCars: async () => {
        try {
            const response = await axiosInstance.get('/cars/promoted', {
                headers: {
                    'Authorization': `Bearer ${TokenService.getLocalAccessToken()}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error getting promoted cars:', error);
            throw error;
        }
    },
    updateAvailability: async (carId, available) => {
        try {
            const response = await axiosInstance.put(`/cars/${carId}/availability?available=${available}`);
            return response.data;
        } catch (error) {
            console.error('Error updating car availability:', error);
            throw error.response?.data || error;
        }
    },
};

export default ApiCarService;
