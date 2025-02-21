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
            // Première étape : supprimer les demandes d'expert
            try {
                await api.delete(`/expert-requests/user/${id}`);
                console.log('Expert requests cleaned successfully');
            } catch (cleanupError) {
                // Ignorer l'erreur si aucune demande d'expert n'existe
                console.log('No expert requests to clean');
            }

            // Deuxième étape : supprimer l'utilisateur
            const deleteResponse = await api.delete(`/users/${id}`);
            console.log('User deleted successfully');
            return deleteResponse.data;
        } catch (error) {
            if (error.response && error.response.status === 500) {
                // Si l'erreur est 500 mais que la suppression a réussi
                if (await checkUserDeleted(id)) {
                    console.log('User was actually deleted successfully');
                    return { success: true };
                }
            }
            console.error('Error in deleteUser:', error);
            throw new Error('Impossible de supprimer cet utilisateur');
        }
    },

    // Fonction utilitaire pour vérifier si l'utilisateur existe encore
    checkUserExists: async (id) => {
        try {
            await api.get(`/users/${id}`);
            return true;
        } catch (error) {
            return false;
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
            console.log('API Response:', response.data);
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error('Get All Users Error:', error);
            return [];
        }
    },
};

// Fonction helper pour vérifier si l'utilisateur a été supprimé
const checkUserDeleted = async (id) => {
    try {
        await api.get(`/users/${id}`);
        return false; // L'utilisateur existe encore
    } catch (error) {
        return error.response && error.response.status === 404; // L'utilisateur n'existe plus
    }
};

export default ApiService;

