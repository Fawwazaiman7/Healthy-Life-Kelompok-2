import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./GetStarted.css";

function GetStarted() {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/signup");
    }
  }, [navigate]);

  const handleGenderClick = (selectedGender) => {
    setGender(selectedGender);
  };

  const validate = () => {
    const newErrors = {};
    if (!gender) newErrors.gender = "Please select your gender";
    if (!age || age < 1 || age > 120)
      newErrors.age = "Please enter a valid age (1-120)";
    if (!weight || weight < 1 || weight > 300)
      newErrors.weight = "Please enter a valid weight (1-300 kg)";
    if (!height || height < 1 || height > 300)
      newErrors.height = "Please enter a valid height (1-300 cm)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100; // Convert height to meters
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const handleGetStarted = async () => {
    if (!validate()) return;

    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData || !userData.email) {
        navigate("/signup");
        return;
      }

      const bmi = calculateBMI(parseFloat(weight), parseFloat(height));

      const data = {
        update: true,
        email: userData.email,
        jenis_kelamin: gender === "male" ? "L" : "P",
        usia: parseInt(age),
        berat_badan: parseFloat(weight),
        tinggi_badan: parseFloat(height),
        bmi: bmi, // Tambahkan BMI ke data yang dikirim
      };

      const response = await axios.post(
        "http://localhost:80/healthy_life_api/backend/signup.php",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        const updatedUserData = {
          ...userData,
          jenis_kelamin: gender === "male" ? "L" : "P",
          usia: age,
          berat_badan: weight,
          tinggi_badan: height,
          bmi: bmi, // Simpan BMI di localStorage
        };

        localStorage.setItem("user", JSON.stringify(updatedUserData));
        localStorage.setItem("isLoggedIn", "true");

        navigate("/"); // Arahkan ke home setelah berhasil
      } else {
        throw new Error(
          response.data?.message || "Failed to update user information"
        );
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while saving your information",
      }));
    }
  };

  return (
    <div className="get-started-container">
      <div className="form-box">
        <h2>Apa Jenis Kelamin Anda?</h2>
        <div className="gender-selection">
          <button
            className={`gender-button ${gender === "male" ? "selected" : ""}`}
            onClick={() => handleGenderClick("male")}
          >
            Male
          </button>
          <button
            className={`gender-button ${gender === "female" ? "selected" : ""}`}
            onClick={() => handleGenderClick("female")}
          >
            Female
          </button>
        </div>
        {errors.gender && <div className="error-text">{errors.gender}</div>}

        <label>Berapa Usia Anda?</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          min="1"
          max="120"
        />
        {errors.age && <div className="error-text">{errors.age}</div>}

        <label>Berapa Berat Badan Anda?</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight"
          min="1"
          max="300"
        />
        {errors.weight && <div className="error-text">{errors.weight}</div>}

        <label>Berapa Tinggi Badan?</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height"
          min="1"
          max="300"
        />
        {errors.height && <div className="error-text">{errors.height}</div>}

        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default GetStarted;
