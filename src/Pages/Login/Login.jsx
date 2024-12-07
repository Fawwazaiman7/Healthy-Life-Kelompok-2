import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function LogIn() {
  const [email, setEmail] = useState(""); // Tambahkan state untuk email
  const [username, setUsername] = useState(""); // Ganti nickname dengan username
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogIn = () => {
    if (!username || !password) { // Ganti nickname dengan username
      alert("All fields are required");
      return;
    }

    // Periksa apakah username dan password cocok untuk Admin
    if (username === "Admin" && password === "Admin") {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", "admin"); // Simpan role admin
      alert("Welcome, Admin!");
      navigate("/admin-management");
      return;
    }
    
    // Periksa login untuk pengguna biasa
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username === username && user.password === password) { // Ganti nickname dengan username
      localStorage.setItem("isLoggedIn", true);
      alert("Log In Successful!");
      navigate("/"); // Redirect ke halaman Home
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-fullscreen">
      <div className="login-form-container">
        <h2>Welcome Back</h2>
        <input
          type="text" // Ganti type menjadi text untuk username
          placeholder="Username" // Ganti placeholder menjadi Username
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Ganti nickname dengan username
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
