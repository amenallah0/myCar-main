import axios from 'axios';

const API_URL = 'http://localhost:8081/api/experts';

class ApiExpertService {
  getAllExperts() {
    return axios.get(API_URL)
      .then(response => response.data);
  }

  deleteExpert(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  updateExpert(id, expert) {
    return axios.put(`${API_URL}/${id}`, expert);
  }

  createExpert(expert) {
    return axios.post(API_URL, expert);
  }
}

export default new ApiExpertService(); 