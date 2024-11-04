import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GetStarted.css';

function GetStarted() {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const navigate = useNavigate();

  const handleGenderClick = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleClose = () => {
    navigate('/'); // Redirect ke halaman utama
  };

  return (
    <div className="get-started-container">
      <div className="form-box">
        {/* Tombol Close "X" */}
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
        
        <label>How Old Are You?</label>
        <input 
          type="number" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          placeholder="Age" 
        />

        <label>What Is Your Weight?</label>
        <div className="input-group">
          <input 
            type="number" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
            placeholder="Weight" 
          />
          <span>Kg</span>
        </div>

        <label>What Is Your Height?</label>
        <div className="input-group">
          <input 
            type="number" 
            value={height} 
            onChange={(e) => setHeight(e.target.value)} 
            placeholder="Height" 
          />
          <span>Cm</span>
        </div>

        <button className="get-started-button">Get Started</button>
      </div>
    </div>
  );
}

export default GetStarted;
