import React from 'react';
import { useLocation } from 'react-router-dom';
import './Riwayat.css'; // Mengimpor CSS jika diperlukan
import Navbar from '../components/Navbar/Navbar'; // Pastikan jalur ini benar
import Footer from '../components/Footer/Footer'; // Pastikan jalur ini benar

function Riwayat() {
  const location = useLocation();
  const { exerciseList, foodList, dailyCalorieList, currentStatus } = location.state || { 
    exerciseList: [], 
    foodList: [], 
    dailyCalorieList: [],
    currentStatus: "" // Menambahkan currentStatus
  };

  // Menentukan warna berdasarkan status kalori
  const statusColor = currentStatus === "Surplus Kalori" ? "green" : currentStatus === "Defisit Kalori" ? "red" : "white";

  return (
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
  );
}

export default Riwayat;
