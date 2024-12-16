import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const [trackerText, setTrackerText] = useState("Tracker"); // State untuk teks Tracker
  const navigate = useNavigate();
  const location = useLocation(); // Menggunakan useLocation untuk mendapatkan lokasi saat ini

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role");
    setIsLoggedIn(loggedIn);
    setIsAdmin(role === "admin");

    // Memperbarui teks tracker berdasarkan lokasi saat ini
    if (location.pathname === "/kalkulator") {
      setTrackerText("Kalkulator");
    } else if (location.pathname === "/exerciseandfoodtracker") {
      setTrackerText("Tracker");
    }
  }, [location]); // Menambahkan location sebagai dependensi

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTrackerClick = () => {
    setIsTrackerDropdownOpen(!isTrackerDropdownOpen);
  };

  const handleBurgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <span className="tracker-title">{trackerText}</span>
          {isTrackerDropdownOpen && (
            <ul className="tracker-dropdown">
              <li>
                <Link to="/exerciseandfoodtracker" onClick={() => setIsTrackerDropdownOpen(false)}>Tracker</Link>
              </li>
              <li>
                <Link to="/kalkulator" onClick={() => setIsTrackerDropdownOpen(false)}>Kalkulator</Link> 
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
                  <button onClick={() => navigate("/admin-management")}>Admin Panel</button>
                )}
                <button onClick={() => navigate("/profile")}>Profile</button>
                <button onClick={() => navigate("/riwayat")}>Riwayat</button>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </>
        ) : (
          <div className="navbar-actions">
            <Link to="/sign-up" className="navbar-button">
              Sign in
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
