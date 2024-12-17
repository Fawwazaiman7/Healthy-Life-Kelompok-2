import React, { useEffect, useState } from "react";
import "./FoodRecommendation.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function FoodRecommendation() {
  const [recommendedFood, setRecommendedFood] = useState(null);

  // Fetch food data from the backend
  const fetchFoodData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:80/healthy_life_api/backend/adminfood.php"
      );
      const foods = response.data;

      if (foods && foods.length > 0) {
        // Randomly select one food item
        const randomFood = foods[Math.floor(Math.random() * foods.length)];
        setRecommendedFood(randomFood);

        // Simpan data dan tanggal ke localStorage (gunakan format ISO)
        const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
        localStorage.setItem("lastRecommendedFood", JSON.stringify(randomFood));
        localStorage.setItem("lastGeneratedDateFood", currentDate);
        console.log(`Data makanan baru disimpan ke localStorage:`);
        console.log(`Tanggal sekarang: ${currentDate}`);
        console.log("Makanan baru:", randomFood);
      }
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    const lastGeneratedDateFood = localStorage.getItem("lastGeneratedDateFood");
    const lastRecommendedFood = localStorage.getItem("lastRecommendedFood");
    const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    console.log(`Tanggal sekarang: ${currentDate}`);
    console.log(
      `Tanggal terakhir disimpan di localStorage: ${lastGeneratedDateFood}`
    );

    if (lastGeneratedDateFood && lastRecommendedFood) {
      const lastDate = new Date(lastGeneratedDateFood);
      const now = new Date(currentDate);

      // Hitung perbedaan hari
      let daysDiff = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
      console.log(`Perbedaan hari sejak makanan terakhir: ${daysDiff} hari`);

      // Jika daysDiff negatif, reset data di localStorage ke tanggal sekarang
      if (daysDiff < 0) {
        localStorage.setItem("lastGeneratedDateFood", currentDate);
        daysDiff = 0; // Reset selisih hari ke 0
        console.log(
          "Tanggal sistem komputer diubah ke masa lalu. Mereset data di localStorage ke tanggal sekarang."
        );
      }

      if (daysDiff < 1) {
        setRecommendedFood(JSON.parse(lastRecommendedFood));
        console.log("Menggunakan makanan yang ada dari localStorage.");
        return;
      }
    }

    fetchFoodData();
    console.log(
      "Mengambil makanan baru karena lebih dari 1 hari atau tidak ada data."
    );
  }, []);

  if (!recommendedFood) {
    return <p>Loading recommendation...</p>; // Show a loading message while fetching data
  }

  return (
    <div className="container">
      {/* Title */}
      <h2 className="title">
        Rekomendasi
        <br />
        Makanan
        <br />
        Hari Ini
      </h2>

      {/* Featured Food Section */}
      <Link to={`/recipe/${recommendedFood.id}`} className="foodContainer">
        {/* Image */}
        <img
          src={recommendedFood.image}
          alt={recommendedFood.title}
          className="image"
        />

        {/* Recommendation Label */}
        <div className="label">Rekomendasi Makanan Hari Ini</div>

        {/* Text Content */}
        <div className="overlay">
          <h3 className="foodTitleRecom">{recommendedFood.title}</h3>
          <div className="details">
            <span className="detailItem">
              🔥 {recommendedFood.calories} kalori
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}