import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios untuk komunikasi backend
import './Login.css';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogIn = async () => {
    if (!email || !password) {
      alert('All fields are required');
      return;
    }

    try {
      // Kirim data ke backend
      const response = await axios.post('http://localhost/healthy_life_api/login.php', {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('isLoggedIn', true);
        alert('Log In Successful!');
        navigate('/'); // Redirect ke halaman Home
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error during log in. Please try again.');
    }
  };

  return (
    <div className="login-fullscreen">
      <div className="login-form-container">
        <h2>Welcome Back</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button onClick={handleLogIn} className="login-button">
          Log In
        </button>
      </div>
      <div className="login-image-container">
        <img
          src="images/login.png"
          alt="Login Illustration"
        />
      </div>
    </div>
  );
}

export default LogIn;
