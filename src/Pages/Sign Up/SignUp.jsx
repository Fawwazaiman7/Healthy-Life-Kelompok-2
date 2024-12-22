import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validasi input pengguna
  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = 'Email must contain "@" symbol';
    }
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fungsi untuk menangani proses signup
 const handleSignUp = async () => {
   if (!validate()) return;

   try {
     console.log("Sending signup data to backend...");
     const response = await axios.post(
       "http://localhost:80/healthy_life_api/backend/signup.php",
       {
         name: username,
         email,
         password,
       }
     );

     console.log("Signup response:", response.data);

     if (response.data.success) {
       console.log("Signup successful!");

       if (response.data.user) {
         console.log("Storing user data in localStorage...");
         localStorage.setItem("user", JSON.stringify(response.data.user));
         console.log("User data stored:", localStorage.getItem("user"));
       } else {
         console.warn("No user data returned from backend.");
       }

       alert("Sign Up Successful!");
       navigate("/getstarted");
     } else {
       console.error("Backend error:", response.data.message);
       alert(response.data.message || "Sign up failed. Please try again.");
     }
   } catch (error) {
     console.error("Error during signup process:", error);
     alert("Error occurred during sign up. Please try again.");
   }
 };



  return (
    <div className="signup-fullscreen">
      <div className="signup-form-container">
        <h2>Welcome</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        {errors.username && <div className="error-text">{errors.username}</div>}
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
        <p>
          Already have an account?{" "}
          <span
            className="link"
            onClick={() => navigate("/login")}
            style={{
              color: "green",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Login here
          </span>
        </p>
      </div>
      <div className="signup-image-container">
        <img src="/images/login.png" alt="Signup Illustration" />
      </div>
    </div>
  );
}

export default SignUp;
