
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      console.log('Token stored:', data.token); // Pour déboguer
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}; 