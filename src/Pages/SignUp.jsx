import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!nickname) newErrors.nickname = 'Nickname is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Email must contain "@" symbol';
    }
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (!validate()) return;
    localStorage.setItem('user', JSON.stringify({ nickname, email, password }));
    alert('Sign Up Successful!');
    navigate('/login');
  };

  return (
    <div className="signup-fullscreen">
      <div className="signup-form-container">
        <h2>Welcome</h2>
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="input-field"
        />
        {errors.nickname && <div className="error-text">{errors.nickname}</div>}

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

        <button onClick={handleSignUp} className="signup-button">
          Sign Up
        </button>
      </div>
      <div className="signup-image-container">
        <img
          src="/images/login.png"
          alt="Signup Illustration"
        />
      </div>
    </div>
  );
}

export default SignUp;
