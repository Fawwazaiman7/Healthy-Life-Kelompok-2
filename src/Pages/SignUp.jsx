import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

function SignUp() {
  const [username, setUsername] = useState(''); // Ganti nickname menjadi username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required'; // Ganti nickname menjadi username
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Email must contain "@" symbol';
    }
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      const data = {
        name: username,  // Ganti nickname menjadi username
        email: email,
        password: password
      };

      const response = await axios.post(
        'http://localhost/healthy_life_api/backend/signup.php',
        data,
        config
      );

      if (response.data.success) {
        const userData = {
          name: username,  // Ganti nickname menjadi username
          email: email
        };
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/getstarted');
      } else {
        // Handle specific error messages from backend
        throw new Error(response.data.message || 'Sign up failed');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      
      // Extract error message from response or error object
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'An error occurred during sign up';
      
      // If it's an email-related error, set it specifically for the email field
      if (errorMessage.toLowerCase().includes('email')) {
        setErrors(prev => ({
          ...prev,
          email: errorMessage
        }));
      } else {
        // Otherwise set it as a general submit error
        setErrors(prev => ({
          ...prev,
          submit: errorMessage
        }));
      }
    }
  };

  return (
    <div className="signup-fullscreen">
      <div className="signup-form-container">
        <h2>Welcome</h2>
        <input
          type="text"
          placeholder="Username"  // Ganti placeholder menjadi Username
          value={username}  // Ganti nickname menjadi username
          onChange={(e) => setUsername(e.target.value)}  // Ganti nickname menjadi username
          className="input-field"
        />
        {errors.username && <div className="error-text">{errors.username}</div>}  {/* Ganti nickname menjadi username */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        {errors.email && <div className="error-text">{errors.email}</div>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        {errors.password && <div className="error-text">{errors.password}</div>}

        {errors.submit && <div className="error-text">{errors.submit}</div>}

        <button onClick={handleSignUp} className="signup-button">
          Sign Up
        </button>
      </div>
      <div className="signup-image-container">
        <img src="/images/login.png" alt="Signup Illustration" />
      </div>
    </div>
  );
}

export default SignUp;
