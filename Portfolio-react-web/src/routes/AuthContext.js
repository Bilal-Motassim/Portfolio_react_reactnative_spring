import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check for authentication token and user ID in local storage
    const token = localStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('userId');
    if (token && storedUserId) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
    }
  }, []);

  const login = (token, id) => {
    localStorage.setItem('authToken', token);  // Store the token received from login response
    localStorage.setItem('userId', id);  // Store the user ID
    setIsAuthenticated(true);
    setUserId(id);
  };
  
  const logout = () => {
    const authToken = localStorage.getItem('authToken');
    axios.post('http://localhost:8080/api/auth/logout', {}, {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    .then(response => {
      console.log('Logged out successfully');
    })
    .catch(error => {
      console.error('Logout failed', error);
    })
    .finally(() => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      window.location.href = '/';
    });
  }
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;