import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/Images/Logonavbar.png';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedIn === 'true');
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Healthy Life Logo" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/makanan">Makanan</Link></li>
        <li><Link to="/olahraga">Olahraga</Link></li>
        <li><Link to="/kalkulator">Kalkulator</Link></li>
      </ul>
      <div className="navbar-actions navbar-auth">
        {isLoggedIn ? (
          <button onClick={handleLogOut} className="navbar-button">Log Out</button>
        ) : (
          <>
            <Link to="/sign-up" className="navbar-button">Get Started</Link>
            <Link to="/login" className="navbar-button navbar-login">Log In</Link>
          </>
        )}
      </div>
    </nav>  
  );
};

export default Navbar;
  