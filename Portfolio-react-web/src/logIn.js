import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './index.css';
import googleLogo from './images/google.png';
import facebookLogo from './images/facebook.png';
import women from './images/women.png';
import rectangle from './images/rectangle.png';
import logo from './images/logo.png';
import { AuthProvider, useAuth } from './routes/AuthContext.js';



function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();  // Destructure login from useAuth
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
  
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      console.log('Login successful:', response.data);
  
      if (response.data && response.data.authToken && response.data.id) {
        localStorage.setItem('authToken', response.data.authToken);
        localStorage.setItem('userId', response.data.id);
        console.log('User ID set in localStorage:', response.data.id);
        navigate(`/profil/${response.data.id}`, { replace: true, force: true });
      } else {
          throw new Error('Essential data not provided in response');
      }
    } catch (error) {
      console.error('Failed to login:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message);
    }
  }
  
      

  return (
    <div className="login-container"> 
      <header className="header-container">
        <img
        style={{
          height: '50px',
        }}
        src={logo} alt="EMSI Portfolio"/>
        <div className="header-navigation">
        </div>
        <div className="header-actions">
          <a href="/signup" className="new-emsi-link">New To Emsi Portfolio? Join Now</a>
          <div className="get-app-button">
            <span>Get the app</span>
          </div>
        </div>
      </header>
      <div className="login-form-side">
        <div className="login-form">
          <h1 className="title">LOGIN</h1>
          <p>Welcome to your professional community</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-wrapper">
            <input type="text" className="input-field" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <input type="password" className="input-field" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <button className="button-next" onClick={handleLogin}>Login Now</button>
          <p>Login with Others</p>
          <button className="social-button google">
            <img src={googleLogo} alt="Login with Google" />
            Login with Google
          </button>
          <button className="social-button facebook">
            <img src={facebookLogo} alt="Login with Facebook" />
            Login with Facebook
          </button>
        </div>
      </div>

      <div className="login-image-side">
        <img className="background-image" src={rectangle} alt="Background" />
        <div className="foreground-image-shadow"></div> 
        <img className="foreground-image" src={women} alt="Woman" />
        <div className="text-overlay">Find the<br/>right job or<br/>internship <br/>for you</div>
      </div>
    </div>
  );
}

export default LoginPage;
