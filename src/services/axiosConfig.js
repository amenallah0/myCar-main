import axios from 'axios';
import TokenService from './TokenService';
import { useUser } from '../contexts/userContext';

const API_URL = process.env.REACT_APP_API_URL;

const setupAxiosInterceptors = (logout) => {
    axios.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const refreshToken = TokenService.getLocalRefreshToken();
                    if (!refreshToken) {
                        throw new Error('No refresh token');
                    }

                    const response = await axios.post(`${API_URL}/users/refresh-token`, {
                        refreshToken: refreshToken
                    });

                    if (response.data.tokens) {
                        TokenService.updateLocalTokens(response.data.tokens);
                        originalRequest.headers['Authorization'] = `Bearer ${response.data.tokens.accessToken}`;
                        return axios(originalRequest);
                    }
                } catch (refreshError) {
                    // Si le refresh échoue, déconnexion
                    logout();
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );
};

export default setupAxiosInterceptors;
