import { useState,useEffect } from "react";
import './index.css';
import googleLogo from './images/google.png'; 
import facebookLogo from './images/facebook.png'; 
import logo from './images/logo.png'; 
import EmailIcon from './images/email.svg';
import PasswordIcon from './images/password.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 


const Modal = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);  
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h4>{message}</h4>
      </div>
    </div>
  );
};

const StepOne = ({ onNext, formData, setFormData }) => {
  return (
    <form onSubmit={onNext}>
      <div className="input-wrapper">
        <img src={EmailIcon} alt="Email" className="input-icon" />
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="input-wrapper">
        <img src={PasswordIcon} alt="Password" className="input-passwd" />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>
      <button className="button-next" type="submit">  Continue </button>
    </form>
  );
};

const StepTwo = ({ onNext, formData, setFormData }) => {
  return (
    <form onSubmit={onNext}>
    <div className="input-wrapper">
      <input
        type="text"
        className="input-field"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
      />
    </div>
    <div className="input-wrapper">
      <input
        type="text"
        className="input-field"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
      </div>
      <button className="button-next" type="submit">Continue</button>
    </form>
  );
};

const StepThree = ({ onNext, formData, setFormData }) => {
  const handleRegistration = async (e) => {
    e.preventDefault();  
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        headline: formData.headline,
      });
      console.log('Registration successful:', response.data);
      onNext(e);  
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          placeholder="Headline"
          value={formData.headline}
          onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="date"
          className="input-field"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
        />
      </div>
      <button className="button-next" type="submit">Sign Up</button>
    </form>
  );
};


const StepFour = ({ formData, setFormData }) => {
  const [verificationStatus, setVerificationStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/verify', {
        email: formData.email,
        code: formData.confirmationCode
      });

      if (response.status === 200) {
        console.log('Verification successful:', response.data);
        setVerificationStatus('success');
        setShowModal(true);  
      } else {
        console.log('Verification failed:', response.data);
        alert('Verification failed: ' + (response.data || "Unknown error occurred"));
        setFormData({ ...formData, confirmationCode: '' });  // Reset code input if needed
      }
    } catch (error) {
      console.error('Verification failed:', error.response ? error.response.data : error.message);
      alert('Verification failed: ' + (error.response ? (error.response.data || "Unknown error occurred") : "Network error"));
      setFormData({ ...formData, confirmationCode: '' });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/');  
  };

  return (
    <div className="step-four-container">
      <Modal show={showModal} message="Congratulations! You have verified your account." onClose={closeModal} />
      <form onSubmit={handleVerification}>
        <div className="input-code-container">
          <input 
            type="text" 
            className="input-code" 
            maxLength="6" 
            placeholder="Enter code" 
            value={formData.confirmationCode}
            onChange={(e) => setFormData({ ...formData, confirmationCode: e.target.value })}
          />
        </div>
        <button 
          className={`button-next ${formData.confirmationCode.length === 6 ? 'active' : ''}`}
          type="submit"  // Ensure this is a submit button
        >
          Agree & Confirm
        </button>
      </form>
    </div>
  );
};

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    headline: '',
    dateOfBirth: '',
    confirmationCode: '', 
  });

  const getTitle = () => {
    switch (step) {
      case 1:
        return "Make the most of your professional life";
      case 2:
        return "Make the most of your professional life";
      case 3:
        return "Make the most of your professional life";
      case 4:
        return "Confirm your email";
      case 5:
        return "Your profile helps you discover new people and opportunities";
      default:
        return "Welcome"; 
    }
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };



  return (
    <div className="App">
      <img src={logo} className="logo" alt="EMSI Portfolio" />
      <div className="signup-container">
      <h1 className="title">{getTitle()}</h1>
        {step === 1 && <StepOne onNext={nextStep} formData={formData} setFormData={setFormData} />}
        {step === 2 && <StepTwo onNext={nextStep} formData={formData} setFormData={setFormData} />} 
        {step === 3 && <StepThree onNext={nextStep} formData={formData} setFormData={setFormData} />} 
        {step === 4 && <StepFour onNext={nextStep} formData={formData} setFormData={setFormData} />} 
        {step === 1 && (
          <>
            <div className="or-divider-container">
              <div className="or-divider-line"></div>
              <span className="or-divider-text">Or</span>
              <div className="or-divider-line"></div>
            </div>
            <div className="social-buttons-container">
              <button className="social-button">
                <img src={googleLogo} alt="Google" /> Continue with Google
              </button>
              <button className="social-button">
                <img src={facebookLogo} alt="Facebook" /> Continue with Facebook
              </button>
            </div>
            <div>
              Already have an account? <a href="/signi">Sign in</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;