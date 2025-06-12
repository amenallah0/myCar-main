import React, { createContext, useContext, useState, useEffect } from 'react';
import TokenService from '../services/TokenService';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const accessToken = TokenService.getLocalAccessToken();

        if (storedUser && accessToken && TokenService.isAuthenticated()) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
          console.log("=== DEBUG USER CONTEXT ===");
          console.log("Loaded user from localStorage:", userData);
          console.log("User role:", userData?.role);
        }
      } catch (error) {
        console.error('Erreur d\'initialisation de l\'auth:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (authData) => {
    if (authData.user && authData.tokens) {
      setUser(authData.user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(authData.user));
      TokenService.setTokens(authData.tokens);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    TokenService.removeTokens();
    localStorage.removeItem('user');
  };

  if (isLoading) {
    return null;
  }

  return (
    <UserContext.Provider value={{ 
      user, 
      isAuthenticated,
      isLoading, 
      login, 
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
