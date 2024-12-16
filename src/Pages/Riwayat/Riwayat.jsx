import React from 'react';
import { useLocation } from 'react-router-dom';
import './Riwayat.css'; // Mengimpor CSS jika diperlukan
import Navbar from '../../components/Navbar/Navbar'; // Pastikan jalur ini benar
import Footer from '../../components/Footer/Footer'; // Pastikan jalur ini benar

function Riwayat() {
  const location = useLocation();
<<<<<<< HEAD:src/Pages/Riwayat.jsx
  const { exerciseList, foodList, dailyCalorieList, currentStatus } = location.state || { 
    exerciseList: [], 
    foodList: [], 
    dailyCalorieList: [],
    currentStatus: "" // Menambahkan currentStatus
=======
  const { exerciseList, foodList, dailyCalorieList } = location.state || {
    exerciseList: [],
    foodList: [],
    dailyCalorieList: [],
>>>>>>> 9c50bc5baebdf0e7cff29129099f0909fa077e4a:src/Pages/Riwayat/Riwayat.jsx
  };

  // Menentukan warna berdasarkan status kalori
  const statusColor = currentStatus === "Surplus Kalori" ? "green" : currentStatus === "Defisit Kalori" ? "red" : "white";

  return (
<<<<<<< HEAD:src/Pages/Riwayat.jsx
    <>
      <div className="riwayat-container">
        <Navbar /> {/* Menambahkan Navbar di sini */}
        <h1>Riwayat Tracker</h1>

        <h2>Status Kalori:</h2>
        <p style={{ color: statusColor, fontWeight: 'bold' }}>{currentStatus}</p> {/* Menampilkan status kalori dengan warna dan tebal */}

        <h2>Riwayat Olahraga</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Nama Olahraga</th>
              <th>Kalori Terbakar</th>
            </tr>
          </thead>
          <tbody>
            {exerciseList.length > 0 ? (
              exerciseList.map((exercise, index) => (
                <tr key={index}>
                  <td>{exercise.name}</td>
                  <td>{exercise.calories} Kalori</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Tidak ada riwayat olahraga yang tersedia.</td>
              </tr>
            )}
          </tbody>
        </table>

        <h2>Riwayat Makanan</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Nama Makanan</th>
              <th>Kalori</th>
            </tr>
          </thead>
          <tbody>
            {foodList.length > 0 ? (
              foodList.map((food, index) => (
                <tr key={index}>
                  <td>{food.name}</td>
                  <td>{food.calories} Kalori</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Tidak ada riwayat makanan yang tersedia.</td>
              </tr>
            )}
          </tbody>
        </table>

        <h2>Riwayat Kalori Harian</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Kalori Harian</th>
            </tr>
          </thead>
          <tbody>
            {dailyCalorieList.length > 0 ? (
              dailyCalorieList.map((calorie, index) => (
                <tr key={index}>
                  <td>{calorie} Kcal</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Tidak ada riwayat kalori harian yang tersedia.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer /> {/* Menambahkan Footer di luar container */}
    </>
=======
    <div className="riwayat-container">
      <Navbar /> {/* Menambahkan Navbar di sini */}
      <h1>Riwayat Tracker</h1>
      <h2>Riwayat Olahraga</h2>
      <div className="riwayat-grid">
        {exerciseList.length > 0 ? (
          exerciseList.map((exercise, index) => (
            <div className="riwayat-card" key={index}>
              <h3>{exercise.name}</h3>
              <p>{exercise.calories} Kalori</p>
            </div>
          ))
        ) : (
          <p>Tidak ada riwayat olahraga yang tersedia.</p>
        )}
      </div>
      <h2>Riwayat Makanan</h2>
      <div className="riwayat-grid">
        {foodList.length > 0 ? (
          foodList.map((food, index) => (
            <div className="riwayat-card" key={index}>
              <h3>{food.name}</h3>
              <p>{food.calories} Kalori</p>
            </div>
          ))
        ) : (
          <p>Tidak ada riwayat makanan yang tersedia.</p>
        )}
      </div>
      <h2>Riwayat Kalori Harian</h2>
      <div className="riwayat-grid">
        {dailyCalorieList.length > 0 ? (
          dailyCalorieList.map((calorie, index) => (
            <div className="riwayat-card" key={index}>
              <h3>Kalori Harian: {calorie} Kcal</h3>
            </div>
          ))
        ) : (
          <p>Tidak ada riwayat kalori harian yang tersedia.</p>
        )}
      </div>
      <Footer /> {/* Menambahkan Footer di sini */}
    </div>
>>>>>>> 9c50bc5baebdf0e7cff29129099f0909fa077e4a:src/Pages/Riwayat/Riwayat.jsx
  );
}

export default Riwayat;
