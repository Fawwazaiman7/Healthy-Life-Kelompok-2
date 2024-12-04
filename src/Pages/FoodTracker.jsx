import React, { useState } from "react";
import './FoodTracker.css';

function FoodTracker() {
  // State untuk menyimpan input nama makanan dan kalori
  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  // Fungsi untuk menangani form submit
  const handleAddFood = () => {
    if (foodName && foodCalories) {
      const newFood = { name: foodName, calories: parseInt(foodCalories) };
      setFoodList([...foodList, newFood]);

      // Update total kalori
      setTotalCalories(totalCalories + newFood.calories);

      // Reset input fields
      setFoodName("");
      setFoodCalories("");
    }
  };

  return (
    <div className="FoodTracker">
      <h1>Input Makanan Harian & Hitung Kalori</h1>
      
      {/* Form untuk input makanan */}
      <div>
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="Nama Makanan"
        />
        <input
          type="number"
          value={foodCalories}
          onChange={(e) => setFoodCalories(e.target.value)}
          placeholder="Jumlah Kalori"
        />
        <button onClick={handleAddFood}>Tambah Makanan</button>
      </div>

      {/* Daftar makanan dan kalori */}
      <div>
        <h2>Daftar Makanan</h2>
        <ul>
          {foodList.map((food, index) => (
            <li key={index}>
              {food.name}: {food.calories} kalori
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

export default FoodTracker;
