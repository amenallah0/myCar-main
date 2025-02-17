const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

const expertRequestService = {
  submitExpertRequest: async (formData) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Pour déboguer
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_URL}/api/expert-requests`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
        credentials: 'include' // Ajouter cette ligne pour inclure les cookies
      });
      
      console.log('Response status:', response.status); // Pour déboguer
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server error:', errorData); // Pour déboguer
        throw new Error(`Server responded with ${response.status}: ${errorData}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Detailed error:', error); // Pour déboguer
      throw error;
    }
  },

  getAllExpertRequests: async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_URL}/api/expert-requests`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorData}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching expert requests:', error);
      throw error;
    }
  }
};

export default expertRequestService; 