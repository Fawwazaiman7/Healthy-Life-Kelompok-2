// src/Pages/Makanan.jsx
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Makanan.css';
import FoodRecommendation from '../RecomOfTheDay/FoodRecommendation';
import FoodCard from '../FoodCard/FoodCard';
import { foodItems } from '../../data/foodData'; 
import Footer from '../../components/Footer/Footer'; // Impor Footer

const Makanan = () => {
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
            time={food.time}
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
