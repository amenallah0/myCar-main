import axios from 'axios';
import TokenService from './TokenService';

const API_URL = process.env.REACT_APP_API_URL + '/api';

// Fonction de connexion
export const signInUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/users/signin`, {
            email,
            password
        });

        if (response.data && response.data.tokens) {
            // Stocker les tokens
            TokenService.setTokens(response.data.tokens);
            
            // Retourner la réponse complète
            return response.data;
        } else {
            throw new Error('Format de réponse invalide du serveur');
        }
    } catch (error) {
        console.error('SignIn Error Details:', error);
        throw error;
    }
};

// Fonction pour vérifier si un token est présent
export const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};

// Créer une instance axios avec intercepteur
const axiosInstance = axios.create({
    baseURL: API_URL
});

// Configuration de l'intercepteur Axios
axiosInstance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        console.log('Token for request:', token ? 'Present' : 'Missing');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Request headers:', config.headers);
            console.log('Request URL:', config.url);
        }
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Intercepteur pour le refresh token
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Log the initial 401 error
        if (error.response?.status === 401 && !originalRequest._retry) {
            console.log('401 Unauthorized error received. Attempting token refresh...');
            originalRequest._retry = true;

            try {
                const refreshToken = TokenService.getLocalRefreshToken();
                if (!refreshToken) {
                    console.error('No refresh token available. Redirecting to signin.');
                    TokenService.removeTokens();
                    localStorage.clear();
                    window.location.href = '/signin';
                    return Promise.reject(new Error('No refresh token'));
                }

                console.log('Attempting to refresh token with:', refreshToken);
                // Create a new axios instance without interceptors for the refresh token request
                const response = await axios.post(`${API_URL}/users/refresh-token`, {
                    refreshToken
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.tokens) {
                    console.log('Token refresh successful. Received new tokens:', response.data.tokens);
                    TokenService.updateLocalTokens(response.data.tokens);
                    // Update the original request's Authorization header with the new access token
                    originalRequest.headers['Authorization'] = `Bearer ${response.data.tokens.accessToken}`;
                    console.log('Retrying original request with new token:', originalRequest);
                    return axiosInstance(originalRequest);
                } else {
                    console.error('Token refresh failed: Invalid response data.', response.data);
                    TokenService.removeTokens();
                    localStorage.clear();
                    window.location.href = '/signin';
                    return Promise.reject(new Error('Invalid refresh token response'));
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                TokenService.removeTokens();
                localStorage.clear();
                window.location.href = '/signin';
                return Promise.reject(refreshError);
            }
        }

        // Log other errors or subsequent 401s
        if (error.response?.status === 401) {
            console.error('401 Unauthorized error after retry or for a different reason:', error.response);
        }

        return Promise.reject(error);
    }
);

// Fonctions d'API
export const signUpUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/users/signup', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Autres fonctions d'API...
export const getUserProfile = async () => {
    try {
        const response = await axiosInstance.get('/users/profile');
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        // NE PAS déconnecter ici, laisse le composant gérer
        throw error.response?.data || error;
    }
};
export const getExpertRequestsForExpert = async (userId) => {
    try {
        console.log('Starting API call for expert requests with userId:', userId);
        const token = TokenService.getLocalAccessToken();
        console.log('Using token:', token ? 'Present' : 'Missing');
        
        const response = await axiosInstance.get(`/expertise-requests/expert/${userId}`);
        console.log('API Response status:', response.status);
        console.log('API Response headers:', response.headers);
        console.log('API Response data:', response.data);
        
        if (!Array.isArray(response.data)) {
            console.warn('Response data is not an array:', response.data);
            return [];
        }
        
        return response.data;
    } catch (error) {
        console.error('Error fetching expert requests for expert:', error);
        if (error.response) {
            console.error('Error response:', {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data,
                headers: error.response.headers
            });
        }
        if (error.response?.status === 401) {
            console.error('Unauthorized - Token might be invalid');
        }
        throw new Error('Erreur lors du chargement des demandes d\'expertise');
    }
};


const getRefreshToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }
    return refreshToken;
};

export const getExpertiseCount = async (userId) => {
    try {
        console.log('Calling expertise count API for user:', userId);
        // Pour obtenir le nombre d'expertises complétées (avec rapport)
        const response = await axiosInstance.get(`/expertise-requests/expert/${userId}`);
        console.log('Expertise count API response:', response);
        // Filtrer pour ne compter que les expertises avec rapport
        const completedRequests = response.data.filter(req => req.status === 'COMPLETED' && req.report);
        return completedRequests.length;
    } catch (error) {
        console.error('Error fetching expertise count:', error);
        throw new Error('Erreur lors du chargement des expertises');
    }
};

export const getTotalExpertiseRequests = async (userId) => {
    try {
        console.log('Calling total expertise requests API for user:', userId);
        // Pour obtenir toutes les demandes d'expertise
        const response = await axiosInstance.get(`/expertise-requests/expert/${userId}`);
        console.log('Total expertise requests API response:', response);
        // Retourner le nombre total de demandes
        return response.data.length;
    } catch (error) {
        console.error('Error fetching total expertise requests:', error);
        throw new Error('Erreur lors du chargement des demandes d\'expertise');
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await axiosInstance.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error in deleteUser:', error);
        throw error.response?.data || error;
    }
};

export const updateUserProfile = async (userId, data) => {
    const response = await axiosInstance.put(`/users/${userId}`, data);
    return response.data;
};

// Exporte TOUTES les fonctions utilitaires dans un objet
const ApiUserService = {
    getAllUsers,
    deleteUser,
    signUpUser,
    // ... autres fonctions
};

export default ApiUserService;
export { axiosInstance };

