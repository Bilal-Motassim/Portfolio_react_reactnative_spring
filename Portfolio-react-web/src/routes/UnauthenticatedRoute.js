// UnauthenticatedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';  // Adjust the import path as necessary

const UnauthenticatedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return children; // Render children if not authenticated
  }

  // Redirect to a default page or simply do nothing if they are authenticated
  return <Navigate to="/" replace />; // Redirect to home or dashboard if already logged in
};




export default UnauthenticatedRoute;
