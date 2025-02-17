import axios from 'axios';

const API_URL = 'http://localhost:8081/api/expert-requests';

class ApiExpertRequestService {
  getAllRequests() {
    return axios.get(API_URL)
      .then(response => response.data);
  }

  approveRequest(id) {
    return axios.put(`${API_URL}/${id}/approve`);
  }

  rejectRequest(id) {
    return axios.put(`${API_URL}/${id}/reject`);
  }

  createRequest(requestData) {
    return axios.post(API_URL, requestData);
  }
}

export default new ApiExpertRequestService(); 