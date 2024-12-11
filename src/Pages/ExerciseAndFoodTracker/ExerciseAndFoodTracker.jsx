import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExerciseAndFoodTracker.css'; // Mengimpor CSS
import Navbar from '../../components/Navbar/Navbar';

function ExerciseAndFoodTracker() {
  const navigate = useNavigate();
  
  // State untuk input olahraga
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseCalories, setExerciseCalories] = useState('');
  const [exerciseList, setExerciseList] = useState([]);

  // State untuk input makanan
  const [foodName, setFoodName] = useState('');
  const [foodCalories, setFoodCalories] = useState('');
  const [foodList, setFoodList] = useState([]);

  // State untuk input kalori harian
  const [dailyCalorieTarget, setDailyCalorieTarget] = useState('');
  const [dailyCalorieList, setDailyCalorieList] = useState([]); // Daftar kalori harian

  // State untuk total kalori
  const [totalBurnedCalories, setTotalBurnedCalories] = useState(0);
  const [totalConsumedCalories, setTotalConsumedCalories] = useState(0);
  const [status, setStatus] = useState('');

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

  // Fungsi untuk menambahkan olahraga
  const addExercise = () => {
    if (exerciseName && exerciseCalories && !isNaN(exerciseCalories) && parseInt(exerciseCalories) > 0) {
      setExerciseList([...exerciseList, { name: exerciseName, calories: parseInt(exerciseCalories) }]);
      setTotalBurnedCalories(prev => prev + parseInt(exerciseCalories));
      calculateStatus(); // Hitung status setelah menambahkan olahraga
      setExerciseName('');
      setExerciseCalories('');
    } else {
      alert("Nama olahraga tidak boleh kosong dan kalori harus angka positif.");
    }
  };

  // Fungsi untuk menambahkan makanan
  const addFood = () => {
    if (foodName && foodCalories && !isNaN(foodCalories) && parseInt(foodCalories) > 0) {
      setFoodList([...foodList, { name: foodName, calories: parseInt(foodCalories) }]);
      setTotalConsumedCalories(prev => prev + parseInt(foodCalories));
      calculateStatus(); // Hitung status setelah menambahkan makanan
      setFoodName('');
      setFoodCalories('');
    } else {
      alert("Nama makanan tidak boleh kosong dan kalori harus angka positif.");
    }
  };

  // Fungsi untuk menambahkan kalori harian
  const addDailyCalorie = () => {
    if (dailyCalorieTarget && !isNaN(dailyCalorieTarget) && parseInt(dailyCalorieTarget) > 0) {
      setDailyCalorieList([...dailyCalorieList, parseInt(dailyCalorieTarget)]);
      setTotalConsumedCalories(prev => prev + parseInt(dailyCalorieTarget));
      calculateStatus(); // Hitung status setelah menambahkan kalori harian
      setDailyCalorieTarget('');
    } else {
      alert("Target kalori harian harus angka positif.");
    }
  };

  // Tombol untuk submit dan menghitung status kalori
  const handleSubmit = () => {
    calculateStatus(); // Hitung status sebelum navigasi
    navigate('/riwayat', { state: { exerciseList, foodList, dailyCalorieList } }); // Navigasi ke halaman riwayat dengan data
    setStatus(''); // Hapus status setelah submit
  };

  // Fungsi untuk menangani perubahan input
  const handleExerciseNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
      setExerciseName(value);
    }
  };

  const handleExerciseCaloriesChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setExerciseCalories(value);
    }
  };

  const handleFoodNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
      setFoodName(value);
    }
  };

  const handleFoodCaloriesChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setFoodCalories(value);
    }
  };

  const handleDailyCalorieTargetChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setDailyCalorieTarget(value);
    }
  };

  return (
    <>
      <Navbar />
      <div className="ExerciseAndFoodTracker">
        <h1>Tracker Olahraga dan Makanan</h1>
        
        {/* Input Target Kalori Harian */}
        <div>
          <h2>Target Kalori Harian Anda</h2>
          <input
            type="number"
            placeholder="Target Kalori Harian Anda"
            value={dailyCalorieTarget}
            onChange={handleDailyCalorieTargetChange}
          />
          <button onClick={addDailyCalorie}>Tambah Kalori Harian</button>
        </div>

        {/* Daftar Kalori Harian */}
        <div className="makanan-grid">
          {dailyCalorieList.map((calorie, index) => (
            <div className="makanan-card" key={index}>
              <h3 style={{ color: 'black' }}>Kalori Harian: {calorie} Kcal</h3>
            </div>
          ))}
        </div>

        {/* Input Olahraga */}
        <div>
          <h2>Input Olahraga</h2>
          <input
            type="text"
            placeholder="Nama Olahraga"
            value={exerciseName}
            onChange={handleExerciseNameChange}
          />
          <input
            type="number"
            placeholder="Kalori Terbakar"
            value={exerciseCalories}
            onChange={handleExerciseCaloriesChange}
          />
          <button onClick={addExercise}>Tambah Olahraga</button>
        </div>

        {/* Daftar Olahraga */}
        <div className="makanan-grid">
          {exerciseList.map((exercise, index) => (
            <div className="makanan-card" key={index}>
              <h3 style={{ color: 'black' }}>{exercise.name}</h3>
              <p style={{ color: 'black' }}>{exercise.calories} Kalori</p>
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
            onChange={handleFoodNameChange}
          />
          <input
            type="number"
            placeholder="Kalori Makanan"
            value={foodCalories}
            onChange={handleFoodCaloriesChange}
          />
          <button onClick={addFood}>Tambah Makanan</button>
        </div>

        {/* Daftar Makanan */}
        <div className="makanan-grid">
          {foodList.map((food, index) => (
            <div className="makanan-card" key={index}>
              <h3 style={{ color: 'black' }}>{food.name}</h3>
              <p style={{ color: 'black' }}>{food.calories} Kalori</p>
            </div>
          ))}
        </div>

        {/* Tombol Submit untuk menghitung Defisit atau Surplus Kalori */}
        <button onClick={handleSubmit}>Submit</button>

        {/* Status Kalori */}
        <div className="total-calories">
          <h2>Status Kalori:</h2>
          <p style={{ color: 'black' }}>{status}</p>
          <p style={{ color: 'black' }}>Total Kalori Terbakar: {totalBurnedCalories} Kcal</p>
          <p style={{ color: 'black' }}>Total Kalori Dikonsumsi: {totalConsumedCalories} Kcal</p>
        </div>
      </div>

      {/* Tambahkan Footer di sini */}
    </>
  );
}

export default ExerciseAndFoodTracker;
