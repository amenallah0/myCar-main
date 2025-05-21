export const getToken = () => localStorage.getItem('jwt_token');

export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
};

export const getAuthHeader = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getUserRole = () => {
    return localStorage.getItem('userRole');
};

export const isAdmin = () => {
    return getUserRole() === 'ADMIN';
};

export const isExpert = () => {
    return getUserRole() === 'EXPERT';
};

export const hasRole = (role) => {
    return getUserRole() === role;
};
