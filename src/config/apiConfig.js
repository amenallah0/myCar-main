// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://mycarapi-1.onrender.com',
  TUNPLATE_URL: process.env.REACT_APP_TUNPLATE_URL || 'http://localhost:5000', // Service local sur port 5000
  ENDPOINTS: {
    FILES_DOWNLOAD: '/api/files/download',
    EXPERTISE_REQUESTS: '/api/expertise-requests',
    CONTACT: '/api/contact',
    PASSWORD_RESET: '/api/password',
    TUNPLATE_UPLOAD_CAR: '/api/upload-car'
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

// Helper function to construct TunPlateRemover URLs
export const getTunPlateUrl = (endpoint, path = '') => {
  return `${API_CONFIG.TUNPLATE_URL}${endpoint}${path}`;
};

export default API_CONFIG;
