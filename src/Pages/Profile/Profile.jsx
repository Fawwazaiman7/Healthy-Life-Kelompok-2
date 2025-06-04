import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import Navbar from "../../components/Navbar/Navbar";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    weight: "",
    age: "",
    height: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = JSON.parse(localStorage.getItem("user")).email;
        const response = await axios.get(
          `http://localhost/healty_life/backend/profile.php`,
          { params: { email: userEmail } }
        );

        if (response.data.success) {
          setUserData(response.data.user);
          setFormData({
            id: response.data.user.id_pengguna, // Sesuaikan dengan backend
            weight: response.data.user.berat_badan || "",
            age: response.data.user.usia || "",
            height: response.data.user.tinggi_badan || "",
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

  const handleDeleteAccount = async () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus akun ini?")) {
      try {
        const response = await axios.delete(
          `http://localhost/healty_life/backend/profile.php`,
          { data: { id: userData.id_pengguna || formData.id } }
        );

        if (response.data.success) {
          alert("Akun Anda telah berhasil dihapus.");
          localStorage.removeItem("user");
          localStorage.setItem("isLoggedIn", "false");
          window.location.href = "/";
        } else {
          alert("Gagal menghapus akun: " + response.data.message);
        }
      } catch (error) {
        console.error(
          "Gagal menghapus akun:",
          error.response?.data || error.message
        );
        alert("Terjadi kesalahan saat menghapus akun.");
      }
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.weight || !formData.age || !formData.height) {
        alert("Semua field harus diisi!");
        return;
      }

      const updatedData = {
        id: formData.id, // ini id_pengguna sebenarnya
        berat_badan: formData.weight,
        usia: formData.age,
        tinggi_badan: formData.height,
      };

      console.log("Data yang dikirim ke backend:", updatedData);

      const response = await axios.put(
        `http://localhost/healty_life/backend/profile.php`,
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

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      weight: userData.berat_badan || "",
      age: userData.usia || "",
      height: userData.tinggi_badan || "",
      calorie_target: userData.target_kalori || "",
    });
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  const bmi =
    userData.berat_badan && userData.tinggi_badan
      ? (userData.berat_badan / (userData.tinggi_badan / 100) ** 2).toFixed(2)
      : "N/A";

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
          <a href="/getstarted">Isi Biodata Kembali?</a>
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
              <button className="delete-button" onClick={handleDeleteAccount}>
                Hapus Akun Saya
              </button>

              <div className="button-group">
                <button className="save-button" onClick={handleSave}>
                  Simpan Perubahan
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  Batal
                </button>
              </div>
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
                <p className="stat-value">{bmi} kg/m²</p>
                <p className="stat-label">BMI</p>
              </div>
              <button className="save-button" onClick={handleEditToggle}>
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
