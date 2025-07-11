// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8081',
  ENDPOINTS: {
    FILES_DOWNLOAD: '/api/files/download',
    EXPERTISE_REQUESTS: '/api/expertise-requests',
    CONTACT: '/api/contact',
    PASSWORD_RESET: '/api/password'
  }
};

// Helper function to construct image URLs
export const getImageUrl = (filename) => {
  if (!filename) return null;
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FILES_DOWNLOAD}/${filename}`;
};

// Helper function to construct API URLs
export const getApiUrl = (endpoint, path = '') => {
  return `${API_CONFIG.BASE_URL}${endpoint}${path}`;
};

export default API_CONFIG;
