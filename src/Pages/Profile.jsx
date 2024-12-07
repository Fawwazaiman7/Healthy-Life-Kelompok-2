import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import Navbar from '../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    berat_badan: '',
    tinggi_badan: '',
    usia: ''
  });

  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn !== 'true') {
        navigate('/login');  // Use navigate to redirect to login
        return false;
      }
      return true;
    };

    const fetchProfile = async () => {
      if (!checkAuth()) return;

      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (!user || !user.email) {
          throw new Error('User data not found');
        }

        const response = await axios.get(
          'http://localhost/healthy_life_api/backend/profile.php',
          {
            params: { email: user.email },
            headers: {
              'Accept': 'application/json'
            }
          }
        );

        if (response.data.success) {
          setUserData(response.data.user);
          setFormData({
            berat_badan: response.data.user.berat_badan,
            tinggi_badan: response.data.user.tinggi_badan,
            usia: response.data.user.usia
          });
          localStorage.setItem('user', JSON.stringify(response.data.user));
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.message || 'Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.email) {
        throw new Error('User data not found');
      }

      const response = await axios.post(
        'http://localhost/healthy_life_api/backend/update_profile.php',
        {
          email: user.email,
          ...formData
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setUserData({
          ...userData,
          ...formData
        });
        setIsEditing(false);
        localStorage.setItem('user', JSON.stringify({ ...userData, ...formData }));
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setError(error.message || 'Failed to save profile data');
    }
  };

  const handleCancelClick = () => {
    setFormData({
      berat_badan: userData?.berat_badan,
      tinggi_badan: userData?.tinggi_badan,
      usia: userData?.usia
    });
    setIsEditing(false);
  };

  const calculateIdealWeight = (tinggi_badan) => {
    // Misalkan kita anggap ini untuk pria, jika ingin membedakan pria dan wanita
    if (!tinggi_badan) return null;

    // Rumus berat badan ideal untuk pria (dengan tinggi badan dalam cm)
    const idealWeight = (tinggi_badan - 100) - (tinggi_badan - 150) / 4;
    
    return idealWeight.toFixed(1); // Mengembalikan nilai dengan 1 desimal
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-icon">
              <span role="img" aria-label="loading">⌛</span>
            </div>
            <h2 className="profile-name">Loading...</h2>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-icon">
              <span role="img" aria-label="error">⚠️</span>
            </div>
            <h2 className="profile-name">Error: {error}</h2>
            <button 
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#fff',
                color: '#8dc63f',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                marginTop: '10px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-icon">
            <span role="img" aria-label="user-icon">👤</span>
          </div>
          <h2 className="profile-name">{userData?.nama}</h2>
        </div>

        <div className="profile-stats">
          {!isEditing ? (
            <>
              <div className="stat-item">
                <p className="stat-value">{userData?.berat_badan} kg</p>
                <p className="stat-label">Weight</p>
              </div>
              
              <div className="stat-item">
                <p className="stat-value">{userData?.tinggi_badan} cm</p>
                <p className="stat-label">Height</p>
              </div>
              
              <div className="stat-item">
                <p className="stat-value">{userData?.usia}</p>
                <p className="stat-label">Age</p>
              </div>

              {/* Menampilkan Berat Badan Ideal */}
              <div className="stat-item">
                <p className="stat-value">{calculateIdealWeight(userData?.tinggi_badan)} kg</p>
                <p className="stat-label">Ideal Weight</p>
              </div>

              <div className="edit-button">
                <button
                  onClick={handleEditClick}
                  className="btn-edit-profile"
                >
                  Edit Profile
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="stat-item">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  name="berat_badan"
                  value={formData.berat_badan}
                  onChange={handleChange}
                  className="input-edit"
                />
              </div>

              <div className="stat-item">
                <label>Height (cm)</label>
                <input
                  type="number"
                  name="tinggi_badan"
                  value={formData.tinggi_badan}
                  onChange={handleChange}
                  className="input-edit"
                />
              </div>

              <div className="stat-item">
                <label>Age</label>
                <input
                  type="number"
                  name="usia"
                  value={formData.usia}
                  onChange={handleChange}
                  className="input-edit"
                />
              </div>

              <div className="edit-buttons">
                <button
                  onClick={handleSaveClick}
                  className="btn-save-profile"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className="btn-cancel-profile"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
