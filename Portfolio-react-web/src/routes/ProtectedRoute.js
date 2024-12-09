import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Assuming this is in a ProtectedRoute or similar component
const ProtectedRoute = ({ children }) => {
  const { userId, isAuthenticated } = useAuth(); // Assuming this context provides user's ID and auth status
  const { userId: routeUserId } = useParams(); // The userId from the route

  // Only redirect if not authenticated, not based on user ID comparison
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Allow the route to render if authenticated, regardless of the userId in the route
  return children;
};



export default ProtectedRoute;
