import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Untuk routing

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogIn = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      // Kirim permintaan POST ke API login
      const response = await axios.post(
        'http://localhost/healthy_life_api/backend/login.php', // Sesuaikan URL API sesuai kebutuhan
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      console.log('Login response:', response.data); // Debugging login response

      if (response.data.success) {
        // Menyimpan status login dan role di localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Menyimpan data user

        console.log('User data saved to localStorage:', response.data.user); // Debugging

        if (response.data.role === 'admin') {
          navigate('/admin-management'); // Arahkan admin ke halaman admin
        } else {
          // Arahkan user ke halaman profil atau halaman pengaturan awal
          navigate(response.data.profileComplete ? '/profile' : '/getstarted');
        }
      } else {
        setErrors({ submit: response.data.message || 'Invalid credentials' }); // Menampilkan pesan error
      }
    } catch (error) {
      console.error('Login error:', error.response || error);
      
      let errorMessage = 'An error occurred during login.';
      if (error.response) {
        errorMessage = error.response.data?.message || 'Server error occurred.';
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        errorMessage = error.message || 'Error processing your request.';
      }
      
      setErrors({ submit: errorMessage }); // Menampilkan pesan error
    } finally {
      setIsLoading(false); // Menonaktifkan loading
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogIn(); // Jika enter ditekan, proses login
  };

  return (
    <div className="login-fullscreen">
      <div className="login-form-container">
        <h2>Welcome Back</h2>
        
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`input-field ${errors.username ? 'error' : ''}`}
          />
          {errors.username && <div className="error-text">{errors.username}</div>}
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`input-field ${errors.password ? 'error' : ''}`}
          />
          {errors.password && <div className="error-text">{errors.password}</div>}
        </div>

        {errors.submit && <div className="error-text">{errors.submit}</div>}

        <button 
          onClick={handleLogIn} 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </div>

      <div className="login-image-container">
        <img src="/images/login.png" alt="Login Illustration" />
      </div>
    </div>
  );
}

export default LogIn;
