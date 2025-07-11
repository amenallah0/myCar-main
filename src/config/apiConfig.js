// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://mycarapi-1.onrender.com',
  TUNPLATE_URL: process.env.REACT_APP_TUNPLATE_URL || 'https://tunplate-remover.onrender.com',
  CAR_PRICE_API_URL: process.env.REACT_APP_CAR_PRICE_API_URL || 'https://flask-6-6v7r.onrender.com',
  ENDPOINTS: {
    FILES_DOWNLOAD: '/api/files/download',
    EXPERTISE_REQUESTS: '/api/expertise-requests',
    CONTACT: '/api/contact',
    PASSWORD_RESET: '/api/password',
    TUNPLATE_UPLOAD_CAR: '/api/upload-car',
    CAR_PRICE_PREDICT: '/predict'
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

// Helper function to construct Car Price API URLs
export const getCarPriceApiUrl = (endpoint, path = '') => {
  return `${API_CONFIG.CAR_PRICE_API_URL}${endpoint}${path}`;
};

export default API_CONFIG;
