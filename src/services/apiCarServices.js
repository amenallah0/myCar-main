import axios from 'axios';

const API_URL = 'http://localhost:8081';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const ApiCarService = {
    getAllCars: async () => {
        try {
            const response = await api.get('/cars');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getCarById: async (id) => {
        try {
            const response = await api.get(`/cars/${id}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    addCarToUser: async (userId, car) => {
        try {
            const response = await api.post(`/cars/user/${userId}/add`, car);
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

            const response = await api.post(`/cars/user/${userId}/addWithImages`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding car:', error);
            throw error.response?.data || error; // Propagate the error for handling in the component
        }
    },

    deleteCar: async (id) => {
        try {
            await api.delete(`/cars/${id}`);
        } catch (error) {
            throw error.response.data;
        }
    },

    uploadImagesToCar: async (carId, files) => {
        try {
            const formData = new FormData();
            files.forEach((file) => formData.append('files', file));

            const response = await api.post(`/cars/${carId}/images`, formData, {
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
          const response = await api.get(`/cars/user/${userId}`);
          return response.data;
        } catch (error) {
          console.error('Get Cars By User ID Error:', error);
          throw error.response ? error.response.data : error;
        }
      },
      getLatestCars: async () => {
        try {
            const response = await api.get('/cars/latest');
            return response.data;
        } catch (error) {
            console.error("API Error:", error); // Log API errors
            throw error.response.data;
        }
    },
    updatePromotionStatus: async (carId, promoted) => {
        try {
            console.log('Sending promotion update request:', { carId, promoted }); // Log pour debug
            const response = await api.put(`/cars/${carId}/promote`, null, {
                params: { promoted },
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Promotion update response:', response.data); // Log pour debug
            return response.data;
        } catch (error) {
            console.error('Error updating promotion status:', error);
            throw error.response?.data || error;
        }
    },
    getPromotedCars: async () => {
        try {
            const response = await api.get('/cars/promoted');
            return response.data;
        } catch (error) {
            console.error('Error getting promoted cars:', error);
            throw error.response?.data || error;
        }
    },
};


export default ApiCarService;
