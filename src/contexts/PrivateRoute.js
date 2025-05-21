import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from './userContext';

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();
  
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;