import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Register.css';

function Register() {
  const [registerData, setRegisterData] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      // Remove the unused 'response' variable
      await axios.post('http://localhost:5000/api/users/register', registerData);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error);
      toast.error('Registration failed. Please try again.');
    }
  };
  

  const responseGoogle = async (response) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/google-login', { tokenId: response.credential });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      toast.success('Google Sign-In successful!');
      navigate('/login');
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      toast.error('Google Sign-In failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={register}>
        <h1>Register</h1>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={registerData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Mobile:</label>
          <input type="text" name="mobile" value={registerData.mobile} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={registerData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={registerData.location} onChange={handleInputChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={registerData.password} onChange={handleInputChange} />
        </div>
        <button type="submit">Register</button>
      </form>
      <GoogleOAuthProvider clientId="102090055112-9g695smm9tjht6vumecvt36dreja5vsk.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => {
            toast.error('Google Sign-In failed. Please try again.');
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default Register;
