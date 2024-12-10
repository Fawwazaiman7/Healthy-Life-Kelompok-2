// src/Pages/Makanan.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Makanan.css";
import FoodRecommendation from "../RecomOfTheDay/FoodRecommendation";
import FoodCard from "../FoodCard/FoodCard";
import Footer from "../../components/Footer/Footer"; // Impor Footer
import axios from "axios"; // Untuk mengambil data dari API

const Makanan = () => {
  const [foodItems, setFoodItems] = useState([]); // State untuk data makanan
  const [loading, setLoading] = useState(true); // State untuk indikator loading
  const [error, setError] = useState(null); // State untuk error handling

  useEffect(() => {
    // Fungsi untuk mengambil data makanan dari API
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/healthy_life_api/backend/adminfood.php"
        );
        setFoodItems(response.data); // Simpan data ke state
        setLoading(false); // Set loading selesai
      } catch (err) {
        console.error("Error fetching food items:", err);
        setError("Failed to fetch food items. Please try again later.");
        setLoading(false); // Set loading selesai
      }
    };

    fetchFoodItems(); // Panggil fungsi untuk fetch data
  }, []); // Hanya dijalankan sekali saat komponen dimuat

  if (loading) {
    return <p>Loading food items...</p>; // Tampilkan loading saat data belum diambil
  }

  if (error) {
    return <p>{error}</p>; // Tampilkan pesan error jika ada masalah
  }

  return (
    <main>
      <Navbar />
      {/* Rekomendasi Makanan */}
      <FoodRecommendation />
      {/* Daftar Makanan */}
      <div className="makanan-grid">
        {foodItems.map((food) => (
          <FoodCard
            key={food.id}
            id={food.id}
            title={food.title}
            calories={food.calories}
            image={food.image}
          />
        ))}
      </div>
      {/* Tambahkan Footer di sini */}
      <Footer />
    </main>
  );
};

export default Makanan;
