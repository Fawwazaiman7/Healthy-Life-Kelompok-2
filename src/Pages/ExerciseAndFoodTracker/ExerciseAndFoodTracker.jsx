import React, { useState } from "react";
import "./ExerciseAndFoodTracker.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from "axios"; // Gunakan axios untuk koneksi ke backend

function ExerciseAndFoodTracker() {
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseCalories, setExerciseCalories] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState("");
  const [foodList, setFoodList] = useState([]);
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
  const handleSubmit = () => {
    calculateStatus();
    saveToDatabase();
  };

  return (
    <>
      <Navbar />
      <div className="ExerciseAndFoodTracker">
        <h1>Tracker Olahraga dan Makanan</h1>
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
        <div className="makanan-grid">
          {exerciseList.map((exercise, index) => (
            <div className="makanan-card" key={index}>
              <h3>{exercise.name}</h3>
              <p>{exercise.calories} Kalori</p>
            </div>
          ))}
        </div>
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
        <div className="makanan-grid">
          {foodList.map((food, index) => (
            <div className="makanan-card" key={index}>
              <h3>{food.name}</h3>
              <p>{food.calories} Kalori</p>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <div className="total-calories">
          <h2>Status Kalori:</h2>
          <p>{status}</p>
          <p>Total Kalori Terbakar: {totalBurnedCalories} Kcal</p>
          <p>Total Kalori Dikonsumsi: {totalConsumedCalories} Kcal</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExerciseAndFoodTracker;
