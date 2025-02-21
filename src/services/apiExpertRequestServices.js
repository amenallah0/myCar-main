import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

class ApiExpertRequestService {
  getAllRequests() {
    return axios.get(`${API_URL}/expert-requests`)
      .then(response => response.data);
  }

  approveRequest(id) {
    return new Promise((resolve, reject) => {
      // Première étape : approuver la demande
      axios.put(`${API_URL}/expert-requests/${id}/approve`)
        .then(response => {
          console.log('Approve response:', response);
          if (response.status === 200) {
            // Deuxième étape : supprimer la demande
            // Modification de la route de suppression pour correspondre au backend
            return axios.delete(`${API_URL}/expert-requests/${id}`)
              .then(() => {
                console.log('Request deleted successfully');
                resolve(response.data);
              })
              .catch(deleteError => {
                // Si la suppression échoue, on considère quand même l'approbation comme réussie
                console.log('Delete not required or failed, but approve succeeded');
                resolve(response.data);
              });
          }
          resolve(response.data);
        })
        .catch(error => {
          console.error('Error in approveRequest:', error);
          reject(error);
        });
    });
  }

  rejectRequest(id) {
    return axios.put(`${API_URL}/expert-requests/${id}/reject`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error in rejectRequest:', error);
        throw error;
      });
  }

  createRequest(requestData) {
    return axios.post(`${API_URL}/expert-requests`, requestData)
      .then(response => response.data);
  }

  deleteRequest(id) {
    return axios.delete(`${API_URL}/expert-requests/${id}`)
      .then(response => {
        console.log('Delete response:', response);
        return response.data;
      })
      .catch(error => {
        console.error('Error in deleteRequest:', error);
        throw error;
      });
  }
}

export default new ApiExpertRequestService(); 