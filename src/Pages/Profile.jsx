import React, { useEffect, useState } from 'react';
import './Profile.css';
import Navbar from '../components/Navbar/Navbar';

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Ambil data user dari localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
    }
  }, []);

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
        </div>
        </div>
    </main>
  );
}

export default Profile;
