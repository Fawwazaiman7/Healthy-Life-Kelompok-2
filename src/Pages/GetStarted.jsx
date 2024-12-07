import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GetStarted.css';

function GetStarted() {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/signup');
    }
  }, [navigate]);

  const handleGenderClick = (selectedGender) => {
    setGender(selectedGender);
  };

  const validate = () => {
    const newErrors = {};
    if (!gender) newErrors.gender = 'Please select your gender';
    if (!age || age < 1 || age > 120) newErrors.age = 'Please enter a valid age (1-120)';
    if (!weight || weight < 1 || weight > 300) newErrors.weight = 'Please enter a valid weight (1-300 kg)';
    if (!height || height < 1 || height > 300) newErrors.height = 'Please enter a valid height (1-300 cm)';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Ideal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const handleGetStarted = async () => {
    if (!validate()) return;

    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      
      if (!userData || !userData.email) {
        navigate('/signup');
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      // Calculate BMI and category
      const bmi = calculateBMI(parseFloat(weight), parseFloat(height));
      const bmiCategory = getBMICategory(bmi);

      const data = {
        update: true,
        email: userData.email,
        jenis_kelamin: gender === 'male' ? 'L' : 'P',
        usia: parseInt(age),
        berat_badan: parseFloat(weight),
        tinggi_badan: parseFloat(height),
        kategori_bmi_pengguna: bmiCategory
      };

      console.log('Sending data:', data);

      const response = await axios.post(
        'http://localhost/healthy_life_api/backend/signup.php',
        data,
        config
      );

      console.log('Response:', response.data);

      if (response.data.success) {
        // Update localStorage dengan data terbaru
        const updatedUserData = {
          ...userData,
          jenis_kelamin: gender === 'male' ? 'L' : 'P',
          usia: age,
          berat_badan: weight,
          tinggi_badan: height,
          bmi: bmi,
          kategori_bmi_pengguna: bmiCategory
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        localStorage.setItem('isLoggedIn', 'true');
        
        navigate('/homelogin');
      } else {
        throw new Error(response.data?.message || 'Failed to update user information');
      }
    } catch (error) {
      console.error('Error details:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.response?.data?.message || error.message || 'An error occurred while saving your information'
      }));
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="get-started-container">
      <div className="form-box">
        <button className="close-button" onClick={handleClose}>✖</button>
        
        <h2>What's Your Gender?</h2>
        <div className="gender-selection">
          <button 
            className={`gender-button ${gender === 'male' ? 'selected' : ''}`} 
            onClick={() => handleGenderClick('male')}
          >
            <span role="img" aria-label="male">♂️</span>
            Male
          </button>
          <button 
            className={`gender-button ${gender === 'female' ? 'selected' : ''}`} 
            onClick={() => handleGenderClick('female')}
          >
            <span role="img" aria-label="female">♀️</span>
            Female
          </button>
        </div>
        {errors.gender && <div className="error-text">{errors.gender}</div>}
        
        <label>How Old Are You?</label>
        <input 
          type="number" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          placeholder="Age" 
          min="1"
          max="120"
        />
        {errors.age && <div className="error-text">{errors.age}</div>}

        <label>What Is Your Weight?</label>
        <div className="input-group">
          <input 
            type="number" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
            placeholder="Weight" 
            min="1"
            max="300"
          />
          <span>Kg</span>
        </div>
        {errors.weight && <div className="error-text">{errors.weight}</div>}

        <label>What Is Your Height?</label>
        <div className="input-group">
          <input 
            type="number" 
            value={height} 
            onChange={(e) => setHeight(e.target.value)} 
            placeholder="Height" 
            min="1"
            max="300"
          />
          <span>Cm</span>
        </div>
        {errors.height && <div className="error-text">{errors.height}</div>}

        {errors.submit && <div className="error-text">{errors.submit}</div>}

        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default GetStarted;