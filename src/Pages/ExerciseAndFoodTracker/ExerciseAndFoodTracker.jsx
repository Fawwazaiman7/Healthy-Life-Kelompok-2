// src/Pages/ExerciseAndFoodTracker.jsx
import React, { useState } from 'react';
import './ExerciseAndFoodTracker.css'; // Mengimpor CSS
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer'; // Impor Footer

function ExerciseAndFoodTracker() {
  // State untuk input olahraga
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseCalories, setExerciseCalories] = useState('');
  const [exerciseList, setExerciseList] = useState([]);

  // State untuk input makanan
  const [foodName, setFoodName] = useState('');
  const [foodCalories, setFoodCalories] = useState('');
  const [foodList, setFoodList] = useState([]);

  // State untuk total kalori
  const [totalBurnedCalories, setTotalBurnedCalories] = useState(0);
  const [totalConsumedCalories, setTotalConsumedCalories] = useState(0);
  const [status, setStatus] = useState('');

  // Fungsi untuk menambahkan olahraga
  const addExercise = () => {
    if (exerciseName && exerciseCalories) {
      setExerciseList([...exerciseList, { name: exerciseName, calories: parseInt(exerciseCalories) }]);
      setTotalBurnedCalories(prev => prev + parseInt(exerciseCalories)); // Menambahkan kalori yang terbakar
      setExerciseName('');
      setExerciseCalories('');
    }
  };

  // Fungsi untuk menambahkan makanan
  const addFood = () => {
    if (foodName && foodCalories) {
      setFoodList([...foodList, { name: foodName, calories: parseInt(foodCalories) }]);
      setTotalConsumedCalories(prev => prev + parseInt(foodCalories)); // Menambahkan kalori yang dikonsumsi
      setFoodName('');
      setFoodCalories('');
    }
  };

  // Fungsi untuk menghitung defisit atau surplus kalori
  const calculateStatus = () => {
    if (totalBurnedCalories > totalConsumedCalories) {
      setStatus('Defisit Kalori'); // Total kalori yang dibakar lebih besar
    } else if (totalBurnedCalories < totalConsumedCalories) {
      setStatus('Surplus Kalori'); // Total kalori yang dikonsumsi lebih besar
    } else {
      setStatus('Seimbang'); // Kalori terbakar sama dengan yang dikonsumsi
    }
  };

  // Tombol untuk submit dan menghitung status kalori
  const handleSubmit = () => {
    calculateStatus(); // Menghitung apakah defisit atau surplus
  };

  return (
    <>
      <Navbar />
      <div className="ExerciseAndFoodTracker">
        <h1>Tracker Olahraga dan Makanan</h1>
        
        {/* Input Olahraga */}
        <div>
          <h2>Input Olahraga</h2>
          <input
            type="text"
            placeholder="Nama Olahraga"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Kalori Terbakar"
            value={exerciseCalories}
            onChange={(e) => setExerciseCalories(e.target.value)}
          />
          <button onClick={addExercise}>Tambah Olahraga</button>
        </div>

        {/* Daftar Olahraga */}
        <div className="makanan-grid">
          {exerciseList.map((exercise, index) => (
            <div className="makanan-card" key={index}>
              <h3>{exercise.name}</h3>
              <p>{exercise.calories} Kalori</p>
            </div>
          ))}
        </div>

        {/* Input Makanan */}
        <div>
          <h2>Input Makanan</h2>
          <input
            type="text"
            placeholder="Nama Makanan"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Kalori Makanan"
            value={foodCalories}
            onChange={(e) => setFoodCalories(e.target.value)}
          />
          <button onClick={addFood}>Tambah Makanan</button>
        </div>

        {/* Daftar Makanan */}
        <div className="makanan-grid">
          {foodList.map((food, index) => (
            <div className="makanan-card" key={index}>
              <h3>{food.name}</h3>
              <p>{food.calories} Kalori</p>
            </div>
          ))}
        </div>

        {/* Tombol Submit untuk menghitung Defisit atau Surplus Kalori */}
        <button onClick={handleSubmit}>Submit</button>

        {/* Status Kalori */}
        <div className="total-calories">
          <h2>Status Kalori:</h2>
          <p>{status}</p>
          <p>Total Kalori Terbakar: {totalBurnedCalories} Kcal</p>
          <p>Total Kalori Dikonsumsi: {totalConsumedCalories} Kcal</p>
        </div>
      </div>

      {/* Tambahkan Footer di sini */}
      <Footer />
    </>
  );
}

export default ExerciseAndFoodTracker;
