import "./ExerciseAndFoodTracker.css";
import axios from "axios"; // Gunakan axios untuk koneksi ke backend
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function ExerciseAndFoodTracker() {
  const navigate = useNavigate();

  // State untuk input olahraga
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseCalories, setExerciseCalories] = useState("");
  const [exerciseList, setExerciseList] = useState([]);

  // State untuk input makanan
  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState("");
  const [foodList, setFoodList] = useState([]);

  // State untuk input kalori harian
  const [dailyCalorieTarget, setDailyCalorieTarget] = useState("");
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

  // Fungsi untuk menambahkan kalori harian
  const addDailyCalorie = () => {
    if (
      dailyCalorieTarget &&
      !isNaN(dailyCalorieTarget) &&
      parseInt(dailyCalorieTarget) > 0
    ) {
      setDailyCalorieList([...dailyCalorieList, parseInt(dailyCalorieTarget)]);
      setTotalConsumedCalories((prev) => prev + parseInt(dailyCalorieTarget));
      setDailyCalorieTarget("");
    } else {
      alert("Target kalori harian harus angka positif.");
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
    const now = new Date(); // Ambil tanggal saat ini
    const formattedDate =
      now.toISOString().split("T")[0] + " " + now.toTimeString().split(" ")[0]; // Format YYYY-MM-DD HH:MM:SS

    // Ambil id_pengguna dari localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User data dari LocalStorage:", user);
    const idPengguna = user ? user.id : null; // Ambil 'id' sesuai respons backend

    if (!idPengguna) {
      alert("ID pengguna tidak ditemukan. Silakan login ulang.");
      return;
    }


    const dataToSend = {
      id_tracker: "TRK" + Date.now(), // ID tracker unik
      kalori_masuk: totalConsumedCalories,
      kalori_keluar: totalBurnedCalories,
      tanggal: formattedDate, // Kirim tanggal dalam format yang benar
      id_pengguna: idPengguna, // Kirim ID pengguna
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


  // Tombol untuk submit dan menghitung status kalori
  const handleSubmit = () => {
    const currentStatus = calculateStatus();
    setStatus(currentStatus); // Set status kalori
    saveToDatabase();
    navigate("/riwayat", {
      state: {
        riwayatPerBulan: [
          {
            month:
              new Date().toISOString().split("-")[0] +
              "-" +
              new Date().toISOString().split("-")[1], // Format bulan saat ini
            days: [
              {
                date: new Date().toISOString().split("T")[0], // Tanggal saat ini
                exerciseList: exerciseList,
                foodList: foodList,
                dailyCaloriesIn: totalConsumedCalories,
                dailyCaloriesOut: totalBurnedCalories,
              },
            ],
          },
        ],
      },
    });
  };

  // Fungsi untuk menangani perubahan input
  const handleExerciseNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
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
    if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
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
        <div className="tracker-grid">
          {dailyCalorieList.map((calorie, index) => (
            <div className="makanan-card" key={index}>
              <h3 style={{ color: "black", fontSize: "0.9rem" }}>
                Kalori Harian: {calorie} Kcal
              </h3>
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
            placeholder="Kalori Terbakar (kal)"
            value={exerciseCalories}
            onChange={handleExerciseCaloriesChange}
          />
          <button onClick={addExercise}>Tambah Olahraga</button>
        </div>
        <div className="tracker-grid">
          {exerciseList.map((exercise, index) => (
            <div className="makanan-card" key={index}>
              <h3 style={{ color: "black", fontSize: "0.9rem" }}>
                {exercise.name}
              </h3>
              <p style={{ color: "black", fontSize: "0.9rem" }}>
                {exercise.calories} Kalori
              </p>
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
        <div className="tracker-grid">
          {foodList.map((food, index) => (
            <div className="makanan-card" key={index}>
              <h3 style={{ color: "black", fontSize: "0.9rem" }}>
                {food.name}
              </h3>
              <p style={{ color: "black", fontSize: "0.9rem" }}>
                {food.calories} Kalori
              </p>
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
