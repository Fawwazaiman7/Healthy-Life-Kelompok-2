import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import Navbar from "../../components/Navbar/Navbar";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ weight: "", age: "", height: "" , calorie_target: ""});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = JSON.parse(localStorage.getItem("user")).email;
        const response = await axios.get(
          `http://localhost:80/healthy_life_api/backend/profile.php`,
          { params: { email: userEmail } }
        );

        if (response.data.success) {
          setUserData(response.data.user);
          setFormData({
            weight: response.data.user.berat_badan || "",
            age: response.data.user.usia || "",
            height: response.data.user.tinggi_badan || "",
            calorie_target: response.data.user.target_kalori || "",
          });
        } else {
          console.error("Gagal memuat data pengguna:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        id: userData.id, // Pastikan id dikirim
        target_kalori: formData.target_kalori || userData.target_kalori, // Tambahkan jika diperlukan
        berat_badan: formData.weight,
        usia: formData.age,
        tinggi_badan: formData.height,
      };

      console.log("Data yang dikirim ke backend:", updatedData); // Debug data yang dikirim

      if (!updatedData.id || !updatedData.target_kalori) {
        alert("ID dan Target Kalori harus diisi!");
        return;
      }

      const response = await axios.put(
        `http://localhost:80/healthy_life_api/backend/profile.php`,
        updatedData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setUserData((prevData) => ({
          ...prevData,
          berat_badan: formData.weight,
          usia: formData.age,
          tinggi_badan: formData.height,
        }));
        setIsEditing(false);
        alert("Profil berhasil diperbarui!");
      } else {
        alert("Gagal memperbarui profil: " + response.data.message);
      }
    } catch (error) {
      console.error(
        "Gagal memperbarui data pengguna:",
        error.response?.data || error.message
      );
      alert("Terjadi kesalahan saat memperbarui profil.");
    }
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
            <span role="img" aria-label="user-icon">
              👤
            </span>
          </div>
          <h2 className="profile-name">{userData.nama}</h2>
        </div>

        <div className="profile-stats">
          {isEditing ? (
            <div className="edit-form">
              <div className="form-item">
                <label>Berat Badan (kg):</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-item">
                <label>Usia (tahun):</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-item">
                <label>Tinggi Badan (cm):</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-item">
                <label>Target Kalori:</label>
                <input
                  type="number"
                  name="calorie_target"
                  value={formData.calorie_target}
                  readOnly
                />
              </div>
              <button className="save-button" onClick={handleSave}>
                Simpan Perubahan
              </button>
            </div>
          ) : (
            <>
              <div className="stat-item">
                <p className="stat-value">{userData.berat_badan} kg</p>
                <p className="stat-label">Berat Badan</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">{userData.usia}</p>
                <p className="stat-label">Usia</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">{userData.tinggi_badan} cm</p>
                <p className="stat-label">Tinggi Badan</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">{userData.target_kalori}</p>
                <p className="stat-label">Target Kalori</p>
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
