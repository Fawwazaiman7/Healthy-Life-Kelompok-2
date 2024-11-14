import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Images/Logonavbar.png';
import profileImage from '../../assets/Images/profile.png';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Periksa status login dari localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigateProfile = () => {
    setIsDropdownOpen(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Apakah Anda yakin ingin logout?');
    if (confirmLogout) {
      // Hapus status login dari localStorage
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false); // Setel isLoggedIn ke false setelah logout
      setIsDropdownOpen(false);
      navigate('/'); // Arahkan pengguna ke halaman home
    }
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
      <div className="navbar-profile">
        {isLoggedIn ? (
          <>
            <div className="profile-icon" onClick={handleProfileClick}>
              <img src={profileImage} alt="Profile" />
            </div>
            {isDropdownOpen && (
              <div className="profile-dropdown">
                <button onClick={handleNavigateProfile}>Profile</button>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </>
        ) : (
          <div className="navbar-actions">
            <Link to="/sign-up" className="navbar-button">Get Started</Link>
            <Link to="/login" className="navbar-button navbar-login">Log In</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
