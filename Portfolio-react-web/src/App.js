import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './routes/AuthContext';
import SignUp from './SignUp';
import LoginPage from './logIn';
import Profil from './profil'; 
import ProtectedRoute from './routes/ProtectedRoute';
import UnauthenticatedRoute from './routes/UnauthenticatedRoute';
import Home from './Home';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
      <Route path="/" element={
          <LoginPage />
      } />
      <Route path="/signup" element={
          <SignUp />
      } />
      <Route path="/profil/:userId" element={
          <Profil />
      } />
        <Route path="/home" element={
          <Home/>
      } />
    </Routes>

      </Router>
    </AuthProvider>
  );
}

export default App;
