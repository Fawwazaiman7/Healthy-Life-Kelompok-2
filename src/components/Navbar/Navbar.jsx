import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/Logonavbar.png";
import profileImage from "../../assets/Images/profile.png";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Tambahan untuk memeriksa apakah pengguna Admin
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Periksa status login dan role dari localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role"); // Role disimpan di localStorage
    setIsLoggedIn(loggedIn);
    setIsAdmin(role === "admin"); // Periksa apakah role adalah admin
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigateProfile = () => {
    setIsDropdownOpen(false);
    navigate("/profile");
  };

  const handleNavigateAdmin = () => {
    setIsDropdownOpen(false);
    navigate("/admin-management");
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmLogout) {
      // Hapus status login dan role dari localStorage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      setIsLoggedIn(false);
      setIsAdmin(false); // Setel isAdmin ke false setelah logout
      setIsDropdownOpen(false);
      navigate("/"); // Arahkan pengguna ke halaman home
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Healthy Life Logo" />
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/makanan">Makanan</Link>
        </li>
        <li>
          <Link to="/olahraga">Olahraga</Link>
        </li>
        <li>
          <Link to="/kalkulator">Kalkulator</Link>
        </li>
      </ul>
      <div className="navbar-profile">
        {isLoggedIn ? (
          <>
            <div className="profile-icon" onClick={handleProfileClick}>
              <img src={profileImage} alt="Profile" />
            </div>
            {isDropdownOpen && (
              <div className="profile-dropdown">
                {isAdmin && (
                  <button onClick={handleNavigateAdmin}>Admin Panel</button>
                )}
                <button onClick={handleNavigateProfile}>Profile</button>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </>
        ) : (
          <div className="navbar-actions">
            <Link to="/sign-up" className="navbar-button">
              Get Started
            </Link>
            <Link to="/login" className="navbar-button navbar-login">
              Log In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
