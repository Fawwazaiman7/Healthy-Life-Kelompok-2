import React, { useState } from "react";
import './DoExercise.css';

function DoExercise() {
  // State untuk menyimpan input nama olahraga dan kalori
  const [activity, setActivity] = useState("");
  const [calories, setCalories] = useState("");
  const [activitiesList, setActivitiesList] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  // Fungsi untuk menangani form submit
  const handleAddActivity = () => {
    if (activity && calories) {
      const newActivity = { name: activity, calories: parseInt(calories) };
      setActivitiesList([...activitiesList, newActivity]);

      // Update total kalori
      setTotalCalories(totalCalories + newActivity.calories);

      // Reset input fields
      setActivity("");
      setCalories("");
    }
  };

  return (
    <div className="DoExercise">
      <h1>Kalori Olahraga Tracker</h1>
      
      {/* Form untuk input olahraga */}
      <div>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Nama Olahraga"
        />
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="Jumlah Kalori"
        />
        <button onClick={handleAddActivity}>Tambah Olahraga</button>
      </div>

      {/* Daftar olahraga dan kalori */}
      <div>
        <h2>Daftar Olahraga</h2>
        <ul>
          {activitiesList.map((act, index) => (
            <li key={index}>
              {act.name}: {act.calories} kalori
            </li>
          ))}
        </ul>
      </div>

      {/* Menampilkan total kalori */}
      <div>
        <h2>Total Kalori: {totalCalories} kalori</h2>
      </div>
    </div>
  );
}

export default DoExercise;
