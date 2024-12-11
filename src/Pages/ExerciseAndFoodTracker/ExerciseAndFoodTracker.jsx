import React, { useState } from "react";
import "./ExerciseAndFoodTracker.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from "axios"; // Gunakan axios untuk koneksi ke backend
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
  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState("");
  const [foodList, setFoodList] = useState([]);

  // State untuk input kalori harian
  const [dailyCalorieTarget, setDailyCalorieTarget] = useState('');
  const [dailyCalorieList, setDailyCalorieList] = useState([]); // Daftar kalori harian

  // State untuk total kalori
  const [totalBurnedCalories, setTotalBurnedCalories] = useState(0);
  const [totalConsumedCalories, setTotalConsumedCalories] = useState(0);
  const [status, setStatus] = useState("");

  // Fungsi untuk menambahkan olahraga
  const addExercise = () => {
    if (exerciseName && exerciseCalories) {
      setExerciseList([
        ...exerciseList,
        { name: exerciseName, calories: parseInt(exerciseCalories) },
      ]);
      setTotalBurnedCalories((prev) => prev + parseInt(exerciseCalories));
      setExerciseName("");
      setExerciseCalories("");
    }
  };

  // Fungsi untuk menambahkan makanan
  const addFood = () => {
    if (foodName && foodCalories) {
      setFoodList([
        ...foodList,
        { name: foodName, calories: parseInt(foodCalories) },
      ]);
      setTotalConsumedCalories((prev) => prev + parseInt(foodCalories));
      setFoodName("");
      setFoodCalories("");
    }
  };

  // Fungsi untuk menghitung status
  const calculateStatus = () => {
    if (totalBurnedCalories > totalConsumedCalories) {
      setStatus("Defisit Kalori");
    } else if (totalBurnedCalories < totalConsumedCalories) {
      setStatus("Surplus Kalori");
    } else {
      setStatus("Seimbang");
    }
  };

  // Fungsi untuk mengirim data ke backend
  const saveToDatabase = async () => {
    try {
      const now = new Date(); // Ambil tanggal saat ini
      const formattedDate =
        now.toISOString().split("T")[0] +
        " " +
        now.toTimeString().split(" ")[0]; // Format YYYY-MM-DD HH:MM:SS

      const dataToSend = {
        id_tracker: "TRK" + Date.now(), // ID tracker unik
        kalori_masuk: totalConsumedCalories,
        kalori_keluar: totalBurnedCalories,
        tanggal: formattedDate, // Kirim tanggal dalam format yang benar
      };

      console.log("Data yang akan dikirim:", dataToSend);

      const response = await axios.post(
        "http://localhost:80/healthy_life_api/backend/tracker.php",
        dataToSend
      );

      console.log("Respons backend:", response.data);

      if (response.data.success) {
        alert("Data berhasil disimpan ke database!");
      } else {
        alert(
          `Gagal menyimpan data: ${
            response.data.message || "Kesalahan tidak diketahui"
          }`
        );
      }
    } catch (error) {
      console.error("Error saat menyimpan data:", error);
      alert("Terjadi kesalahan saat menyimpan data. Cek log untuk detail.");
    }
  };




  // Tombol submit untuk menghitung dan menyimpan
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
    calculateStatus();
    saveToDatabase();
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
        <div className="makanan-grid">
          {exerciseList.map((exercise, index) => (
            <div className="makanan-card" key={index}>
              <h3 style={{ color: 'black' }}>{exercise.name}</h3>
              <p style={{ color: 'black' }}>{exercise.calories} Kalori</p>
            </div>
          ))}
        </div>
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
        <div className="makanan-grid">
          {foodList.map((food, index) => (
            <div className="makanan-card" key={index}>
              <h3 style={{ color: 'black' }}>{food.name}</h3>
              <p style={{ color: 'black' }}>{food.calories} Kalori</p>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <div className="total-calories">
          <h2>Status Kalori:</h2>
          <p style={{ color: 'black' }}>{status}</p>
          <p style={{ color: 'black' }}>Total Kalori Terbakar: {totalBurnedCalories} Kcal</p>
          <p style={{ color: 'black' }}>Total Kalori Dikonsumsi: {totalConsumedCalories} Kcal</p>
        </div>
      </div>

      {/* Tambahkan Footer di sini */}
      <Footer />
    </>
  );
}

export default ExerciseAndFoodTracker;
