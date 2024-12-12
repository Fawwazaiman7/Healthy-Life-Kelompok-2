import React from 'react';
import { useLocation } from 'react-router-dom';
import './Riwayat.css'; // Mengimpor CSS jika diperlukan
import Navbar from '../components/Navbar/Navbar'; // Pastikan jalur ini benar
import Footer from '../components/Footer/Footer'; // Pastikan jalur ini benar

function Riwayat() {
  const location = useLocation();
  const { exerciseList, foodList, dailyCalorieList } = location.state || { 
    exerciseList: [], 
    foodList: [], 
    dailyCalorieList: [] 
  };

  return (
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
  );
}

export default Riwayat;
