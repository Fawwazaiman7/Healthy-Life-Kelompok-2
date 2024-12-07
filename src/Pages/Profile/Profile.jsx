import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios untuk komunikasi backend
import './Profile.css';
import Navbar from '../../components/Navbar/Navbar';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State untuk toggle mode edit
  const [formData, setFormData] = useState({ weight: '', age: '', height: '' });

  useEffect(() => {
    // Ambil data user dari localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
      setFormData({
        weight: user.weight || '',
        age: user.age || '',
        height: user.height || '',
      });
    }
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle mode edit
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const updatedUser = { ...userData, ...formData };
    setUserData(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Simpan ke localStorage
    setIsEditing(false); // Keluar dari mode edit
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-icon">
            <span role="img" aria-label="user-icon">👤</span>
          </div>
          <h2 className="profile-name">{userData.nickname || `${userData.firstName} ${userData.lastName}`}</h2>
        </div>

        <div className="profile-stats">
          {isEditing ? (
            <div className="edit-form">
              <div className="form-item">
                <label>Weight (kg):</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-item">
                <label>Age (years):</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-item">
                <label>Height (cm):</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                />
              </div>
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
            </div>
          ) : (
            <>
              <div className="stat-item">
                <p className="stat-value">{userData.weight} kg</p>
                <p className="stat-label">Weight</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">{userData.age}</p>
                <p className="stat-label">Years Old</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">{userData.height} cm</p>
                <p className="stat-label">Height</p>
              </div>
              <button className="edit-button" onClick={handleEditToggle}>
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Profile;
