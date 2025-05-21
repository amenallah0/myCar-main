import axios from 'axios';
import TokenService from './TokenService';

const API_URL = 'http://localhost:8081/api';

class ReviewService {
    async addReview(reviewData) {
        try {
            const token = TokenService.getLocalAccessToken();
            console.log('Token being used:', token);

            // Create headers with both Authorization and Content-Type
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };

            // Log complete request configuration
            console.log('Making request with:', {
                url: `${API_URL}/reviews`,
                method: 'POST',
                headers: headers,
                data: reviewData
            });

            // Create axios instance with default headers
            const axiosInstance = axios.create({
                baseURL: API_URL,
                headers: headers
            });

            // Make the request
            const response = await axiosInstance.post('/reviews', reviewData);
            return response.data;
        } catch (error) {
            console.error('Error adding review: ', error);
            if (error.response) {
                console.error('Error response:', {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers,
                    config: error.config
                });
            }
            throw error;
        }
    }

    async getReviewsByCar(carId) {
        try {
            const response = await axios.get(`${API_URL}/reviews/car/${carId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching reviews: ', error);
            throw error;
        }
    }
}

export default new ReviewService();