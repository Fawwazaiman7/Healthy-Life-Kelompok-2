import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha"; // Library reCAPTCHA
import "./Login.css";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCaptchaEnabled, setIsCaptchaEnabled] = useState(false); // State untuk toggle CAPTCHA
  const recaptchaRef = useRef(null); // Referensi widget reCAPTCHA
  const navigate = useNavigate();

  useEffect(() => {
    if (recaptchaRef.current) {
      console.log("ReCAPTCHA is ready");
    }
  }, [recaptchaRef]);

  useEffect(() => {
    console.log(
      "CAPTCHA Status Changed:",
      isCaptchaEnabled ? "Enabled" : "Disabled"
    );
  }, [isCaptchaEnabled]);

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogIn = async () => {
    if (!validate()) return;

    let captchaToken = null;
    console.log("isCaptchaEnabled: ", isCaptchaEnabled);

    // Pastikan hanya mengambil token jika CAPTCHA diaktifkan
    if (isCaptchaEnabled) {
      console.log("Getting CAPTCHA Token...");
      captchaToken = recaptchaRef.current.getValue();
      if (!captchaToken) {
        setErrors({ submit: "CAPTCHA token is missing" });
        return;
      }
    } else {
      console.log("Captcha Disabled. Skipping Token Retrieval.");
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:80/healthy_life_api/backend/login.php",
        {
          username,
          password,
          isCaptchaEnabled, // Kirim status CAPTCHA
          ...(isCaptchaEnabled && { recaptchaResponse: captchaToken }),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        if (response.data.role === "admin") {
          navigate("/admin-management");
        } else {
          navigate(response.data.profileComplete ? "/profile" : "/getstarted");
        }
      } else {
        setErrors({ submit: response.data.message || "Invalid credentials" });
      }
    } catch (error) {
      let errorMessage = "An error occurred during login.";
      if (error.response) {
        errorMessage = error.response.data?.message || "Server error occurred.";
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = "Error processing your request.";
      }
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }
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
            className={`input-field ${errors.username ? "error" : ""}`}
          />
          {errors.username && (
            <div className="error-text">{errors.username}</div>
          )}
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`input-field ${errors.password ? "error" : ""}`}
          />
          {errors.password && (
            <div className="error-text">{errors.password}</div>
          )}
        </div>

        {/* Toggle CAPTCHA */}
        <div className="captcha-toggle">
          <label>
            <input
              type="checkbox"
              checked={isCaptchaEnabled}
              onChange={(e) => {
                setIsCaptchaEnabled(e.target.checked);
                console.log("CAPTCHA Enabled:", e.target.checked); // Tambahkan log ini
              }}
            />
            Enable CAPTCHA
          </label>
        </div>

        {isCaptchaEnabled && (
          <div className="recaptcha-container">
            {console.log("ReCAPTCHA Rendered")} {/* Tambahkan log ini */}
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Lde4ZUqAAAAAHRmk0U0ftnPWVbMZRB3x7IbOH2e" // Ganti dengan site key Anda
            />
          </div>
        )}

        {errors.submit && <div className="error-text">{errors.submit}</div>}
        <button
          onClick={handleLogIn}
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </div>
      <div className="login-image-container"></div>
      <img src="/images/login.png" alt="Login Illustration" />
    </div>
  );
}

export default LogIn;
