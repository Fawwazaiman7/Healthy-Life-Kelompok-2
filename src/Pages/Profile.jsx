import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios untuk komunikasi backend
import './Profile.css';
import Navbar from '../components/Navbar/Navbar';

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Ambil data user dari backend
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          const response = await axios.get('http://localhost/healthy_life_api/profile.php', {
            params: { user_id: user.id }, // Kirim ID pengguna
          });
          if (response.data.success) {
            setUserData(response.data.user);
          } else {
            alert(response.data.message);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Failed to fetch profile data.');
      }
    };

    fetchProfile();
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
          <h2 className="profile-name">{userData.name}</h2>
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
