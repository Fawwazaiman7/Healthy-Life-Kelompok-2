import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Riwayat.css";
import Navbar from "../../components/Navbar/Navbar";

function Riwayat() {
  const location = useLocation();

  const { riwayatPerBulan } = location.state || {
    riwayatPerBulan: [
      {
        month: "2024-12",
        days: [
          {
            date: "2024-12-01",
            exerciseList: [
              { name: "Jogging", calories: 300 },
              { name: "Push-up", calories: 50 },
              { name: "Berenang", calories: 250 },
              { name: "Angkat Beban", calories: 200 },
              { name: "Yoga", calories: 150 },
              { name: "Lari", calories: 200 },
              { name: "Senam", calories: 100 },
            ],
            foodList: [
              { name: "Nasi Goreng", calories: 500 },
              { name: "Ayam Goreng", calories: 400 },
              { name: "Soto", calories: 350 },
              { name: "Es Teh Manis", calories: 100 },
              { name: "Kue Cubir", calories: 200 },
            ],
            dailyCaloriesIn: 1500,
            dailyCaloriesOut: 1050,
          },
          {
            date: "2024-12-02",
            exerciseList: [
              { name: "Berenang", calories: 250 },
              { name: "Lari", calories: 200 },
              { name: "Senam", calories: 150 },
              { name: "Jalan Kaki", calories: 100 },
              { name: "Sepak Bola", calories: 300 },
            ],
            foodList: [
              { name: "Salad Sayur", calories: 150 },
              { name: "Smoothie", calories: 250 },
              { name: "Roti Panggang", calories: 180 },
              { name: "Pisang Goreng", calories: 200 },
            ],
            dailyCaloriesIn: 780,
            dailyCaloriesOut: 700,
          },
        ],
      },
      {
        month: "2024-01",
        days: [
          {
            date: "2024-01-01",
            exerciseList: [
              { name: "Jogging", calories: 350 },
              { name: "Push-up", calories: 60 },
              { name: "Berenang", calories: 280 },
              { name: "Angkat Beban", calories: 220 },
              { name: "Yoga", calories: 180 },
              { name: "Lari", calories: 220 },
              { name: "Senam", calories: 120 },
            ],
            foodList: [
              { name: "Nasi Campur", calories: 600 },
              { name: "Ayam Bakar", calories: 420 },
              { name: "Mie Goreng", calories: 380 },
              { name: "Teh Tarik", calories: 150 },
              { name: "Kue Lapis", calories: 250 },
            ],
            dailyCaloriesIn: 1700,
            dailyCaloriesOut: 1150,
          },
          {
            date: "2024-01-02",
            exerciseList: [
              { name: "Berenang", calories: 270 },
              { name: "Lari", calories: 240 },
              { name: "Senam", calories: 170 },
              { name: "Jalan Cepat", calories: 120 },
              { name: "Sepak Bola", calories: 310 },
            ],
            foodList: [
              { name: "Salad Buah", calories: 180 },
              { name: "Smoothie Bowl", calories: 260 },
              { name: "Pasta", calories: 300 },
              { name: "Nasi Putih", calories: 200 },
            ],
            dailyCaloriesIn: 960,
            dailyCaloriesOut: 830,
          },
        ],
      },
      {
        month: "2024-02",
        days: [
          {
            date: "2024-02-01",
            exerciseList: [
              { name: "Jogging", calories: 310 },
              { name: "Push-up", calories: 70 },
              { name: "Berenang", calories: 240 },
              { name: "Angkat Beban", calories: 210 },
              { name: "Yoga", calories: 160 },
              { name: "Lari", calories: 230 },
              { name: "Senam", calories: 110 },
            ],
            foodList: [
              { name: "Nasi Goreng", calories: 500 },
              { name: "Ayam Goreng", calories: 400 },
              { name: "Kwetiau", calories: 350 },
              { name: "Es Krim", calories: 200 },
              { name: "Roti Bakar", calories: 150 },
            ],
            dailyCaloriesIn: 1600,
            dailyCaloriesOut: 1100,
          },
          {
            date: "2024-02-02",
            exerciseList: [
              { name: "Berenang", calories: 260 },
              { name: "Lari", calories: 220 },
              { name: "Senam", calories: 160 },
              { name: "Jalan Kaki", calories: 110 },
              { name: "Sepak Bola", calories: 290 },
            ],
            foodList: [
              { name: "Salad Sayur", calories: 140 },
              { name: "Smoothie", calories: 250 },
              { name: "Soto", calories: 280 },
              { name: "Pisang Goreng", calories: 220 },
            ],
            dailyCaloriesIn: 810,
            dailyCaloriesOut: 760,
          },
        ],
      },
    ],
  };

  const [selectedMonth, setSelectedMonth] = useState("2024-12");
  const filteredData = riwayatPerBulan.filter(
    (item) => item.month === selectedMonth
  )[0];

  return (
    <div className="riwayat-container">
      <Navbar />
      <h1>Riwayat Tracker</h1>

      <div className="filter-bulan">
        <label htmlFor="month">Pilih Bulan: </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="2024-12">Desember 2024</option>
          <option value="2024-01">Januari 2024</option>
          <option value="2024-02">Februari 2024</option>
        </select>
      </div>

      {filteredData ? (
        filteredData.days.map((day, index) => (
          <div className="riwayat-card" key={index}>
            <h2>{day.date}</h2>

            <h3>Olahraga:</h3>
            <ul>
              {day.exerciseList.map((exercise, idx) => (
                <li key={idx}>
                  {exercise.name}: {exercise.calories} Kalori
                </li>
              ))}
            </ul>

            <h3>Makanan:</h3>
            <ul>
              {day.foodList.map((food, idx) => (
                <li key={idx}>
                  {food.name}: {food.calories} Kalori
                </li>
              ))}
            </ul>

            <h4>Total Kalori Masuk: {day.dailyCaloriesIn} Kcal</h4>
            <h4>Total Kalori Keluar: {day.dailyCaloriesOut} Kcal</h4>
          </div>
        ))
      ) : (
        <p>Tidak ada riwayat untuk bulan ini.</p>
      )}


    </div>
  );
}

export default Riwayat;
