import { jwtDecode } from 'jwt-decode';

class TokenService {
    static getLocalRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    static getLocalAccessToken() {
        return localStorage.getItem('accessToken');
    }

    static updateLocalAccessToken(token) {
        localStorage.setItem('accessToken', token);
    }

    static updateLocalRefreshToken(token) {
        localStorage.setItem('refreshToken', token);
    }

    static setTokens(tokens) {
        if (tokens.accessToken) {
            localStorage.setItem('accessToken', tokens.accessToken);
        }
        if (tokens.refreshToken) {
            localStorage.setItem('refreshToken', tokens.refreshToken);
        }
    }

    static removeTokens() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }

    static isTokenExpired(token) {
        if (!token) return true;
        try {
            const decoded = jwtDecode(token);
            return decoded.exp < Date.now() / 1000;
        } catch {
            return true;
        }
    }

    static isAuthenticated() {
        const token = this.getLocalAccessToken();
        return !!token;
    }

    static getAuthHeader() {
        const token = this.getLocalAccessToken();
        return token ? `Bearer ${token}` : '';
    }
}

export default TokenService;
