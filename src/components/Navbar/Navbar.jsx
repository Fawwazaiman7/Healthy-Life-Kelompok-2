import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/Logonavbar.png";
import profileImage from "../../assets/Images/profile.png";
import SearchBar from "../SearchBar/SearchBar"; // Impor SearchBar
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTrackerDropdownOpen, setIsTrackerDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk menu burger
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role");
    setIsLoggedIn(loggedIn);
    setIsAdmin(role === "admin");
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTrackerClick = () => {
    setIsTrackerDropdownOpen(!isTrackerDropdownOpen);
  };

  const handleBurgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigateProfile = () => {
    setIsDropdownOpen(false);
    navigate("/profile");
  };

  const handleNavigateHistory = () => {
    setIsDropdownOpen(false);
    navigate("/riwayat"); // Navigasi ke halaman riwayat
  };

  const handleNavigateAdmin = () => {
    setIsDropdownOpen(false);
    navigate("/admin-management");
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmLogout) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      setIsLoggedIn(false);
      setIsAdmin(false);
      setIsDropdownOpen(false);
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Healthy Life Logo" />
      </div>
      <div className="burger" onClick={handleBurgerClick}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/">Beranda</Link>
        </li>
        <li>
          <Link to="/makanan">Resep Makanan</Link>
        </li>
        <li>
          <Link to="/olahraga">Olahraga</Link>
        </li>
        <li onClick={handleTrackerClick}>
          <span className="tracker-title">Tracker</span>
          {isTrackerDropdownOpen && (
            <ul className="tracker-dropdown">
              <li>
                <Link to="/exerciseandfoodtracker">Tracker</Link>
              </li>
              <li>
                <Link to="/kalkulator">Kalkulator</Link> 
              </li>
            </ul>
          )}
        </li>
      </ul>
      <div className="navbar-search">
        <SearchBar /> {/* Tambahkan SearchBar di sini */}
      </div>
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
                <button onClick={handleNavigateHistory}>Riwayat</button> {/* Tambahkan opsi Riwayat */}
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
