import { Navigate } from 'react-router-dom';
import { useUser } from '../userContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
