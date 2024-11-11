import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import './Makanan.css';
import FoodRecommendation from '../components/RecomOfTheDay/FoodRecommendation';
import FoodCard from '../components/FoodCard/FoodCard';
import { foodItems } from '../data/foodData'; 

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
    </main>
  );
};

export default Makanan;
