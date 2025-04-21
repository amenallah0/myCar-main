import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

class ReviewService {
    async addReview(reviewData) {
        try {
            const response = await axios.post(`${API_URL}/reviews`, reviewData);
            return response.data;
        } catch (error) {
            console.error('Error adding review: ', error);
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