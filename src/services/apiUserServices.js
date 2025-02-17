import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Ensure credentials are sent with requests
});

const ApiService = {
    signUp: async (username, email, password) => {
        try {
            const response = await api.post('/users', {
                username,
                email,
                password,
            });
            return response.data;
        } catch (error) {
            console.error('Sign Up Error:', error);
            throw error.response ? error.response.data : error;
        }
    },

    getUserById: async (userId) => {
        try {
            const response = await fetch(`http://localhost:8081/api/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    getUserByUsername: async (username) => {
        try {
            const response = await api.get(`/users/username/${username}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getUserByEmail: async (email) => {
        try {
            const response = await api.get(`/users/email/${email}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    deleteUser: async (id) => {
        try {
            const response = await api.delete(`/users/${id}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    signInUser: async (email, password) => {
        try {
            const response = await api.post('/users/signin', {
                email: email,
                password: password
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
    updateUser: async (id, userData) => {
        try {
            const response = await api.put(`/users/${id}`, userData);
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
    getAllUsers: async () => {
        try {
            const response = await api.get('/users');
            console.log('API Response:', response.data); // Pour déboguer
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error('Get All Users Error:', error);
            return [];
        }
    },
};

export default ApiService;
