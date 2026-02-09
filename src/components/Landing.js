import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to Our Website</h1>
        <p>
          Discover the best products and services. Enjoy a seamless shopping experience with us. 
          Whether you are here to explore or ready to shop, we are here to serve you.
        </p>
      </header>
      <div className="landing-buttons">
        <button className="btn login-btn" onClick={goToLogin}>Login</button>
        <button className="btn register-btn" onClick={goToRegister}>Register</button>
      </div>
    </div>
  );
}

export default Landing;
