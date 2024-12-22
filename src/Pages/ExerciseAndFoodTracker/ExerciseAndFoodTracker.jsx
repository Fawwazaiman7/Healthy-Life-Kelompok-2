import "./ExerciseAndFoodTracker.css";
import axios from "axios"; // Gunakan axios untuk koneksi ke backend
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function ExerciseAndFoodTracker() {
  // State untuk input olahraga
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseCalories, setExerciseCalories] = useState("");
  const [exerciseList, setExerciseList] = useState([]);

  // State untuk input makanan
  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState("");
  const [foodList, setFoodList] = useState([]);

  // State untuk target kalori
  const [dailyCalorieTarget, setDailyCalorieTarget] = useState("");
  const [currentTargetCalorie, setCurrentTargetCalorie] = useState(0);
  const [isTargetSet, setIsTargetSet] = useState(false);

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

  // Fungsi untuk menambahkan target kalori harian
  const addDailyCalorie = () => {
    if (dailyCalorieTarget && parseInt(dailyCalorieTarget) > 0) {
      setCurrentTargetCalorie(parseInt(dailyCalorieTarget));
      setIsTargetSet(true);
    } else {
      alert("Target kalori harian harus angka positif!");
    }
  };

  // Fungsi untuk menghitung status
  const calculateStatus = () => {
    if (totalBurnedCalories > totalConsumedCalories) {
      return "Defisit Kalori";
    } else if (totalBurnedCalories < totalConsumedCalories) {
      return "Surplus Kalori";
    } else {
      return "Seimbang";
    }
  };

  // Fungsi untuk mengirim data ke backend
  const saveToDatabase = async () => {
  try {
    const now = new Date();
    const formattedDate =
      now.toISOString().split("T")[0] +
      " " +
      now.toTimeString().split(" ")[0];

    const user = JSON.parse(localStorage.getItem("user"));
    const idPengguna = user ? user.id : null;

    if (!idPengguna) {
      alert("ID pengguna tidak ditemukan. Silakan login ulang.");
      return;
    }

    const dataToSend = {
      id_tracker: "TRK" + Date.now(),
      kalori_masuk: totalConsumedCalories,
      kalori_keluar: totalBurnedCalories,
      target_kalori: dailyCalorieTarget,
      status_kalori: calculateStatus(), // Tambahkan status kalori
      tanggal: formattedDate,
      id_pengguna: idPengguna,
      makanan_tracker: foodList,
      olahraga_tracker: exerciseList,
    };

    console.log("Data yang akan dikirim ke backend:", dataToSend);

    const response = await axios.post(
      "http://localhost:80/healthy_life_api/backend/tracker.php",
      dataToSend
    );

    if (response.data.success) {
      alert("Data berhasil disimpan ke database!");
    } else {
      console.error("Gagal menyimpan data:", response.data.message);
    }
  } catch (error) {
    console.error("Error saat menyimpan data:", error);
  }
};


  // Tombol untuk submit dan menghitung status kalori
  const handleSubmit = () => {
    const currentStatus = (
      <>
        Status Kalori: {calculateStatus()} <br />
        Kalori Masuk: {totalConsumedCalories} Kcal <br />
        Kalori Keluar: {totalBurnedCalories} Kcal <br />
        Target Kalori Harian: {dailyCalorieTarget || "Tidak diatur"} Kcal
      </>
    );
    setStatus(currentStatus);
    saveToDatabase();
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
            onChange={(e) => setDailyCalorieTarget(e.target.value)}
          />
          {!isTargetSet && (
            <button onClick={addDailyCalorie}>Tambah Kalori Harian</button>
          )}
        </div>

        {/* Target Kalori */}
        {isTargetSet && (
          <div className="makanan-card">
            <h3 style={{ color: "black", fontSize: "0.9rem" }}>
              Target Kalori Harian: {currentTargetCalorie} Kcal
            </h3>
          </div>
        )}

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
        <div className="tracker-grid">
          {exerciseList.map((exercise, index) => (
            <div className="makanan-card" key={index}>
              <p>{exercise.name}</p>
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
        <div className="tracker-grid">
          {foodList.map((food, index) => (
            <div className="makanan-card" key={index}>
              <p>{food.name}</p>
              <p>{food.calories} Kalori</p>
            </div>
          ))}
        </div>

        <button onClick={handleSubmit}>Submit</button>
        <div className="total-calories">
          <h2 style={{ color: "white" }}>Status Kalori:</h2>
          <p style={{ color: "white" }}>{status}</p>
        </div>
      </div>
    </>
  );
}

export default ExerciseAndFoodTracker;
