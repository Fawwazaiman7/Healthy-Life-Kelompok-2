import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import './Makanan.css';
import FoodRecommendation from '../components/RecomOfTheDay/FoodRecommendation';
import FoodCard from '../components/FoodCard/FoodCard'; // Pastikan jalur ini benar

const foodItems = [
  {
    title: 'Yogurt Putih Kental Stroberi',
    time: '6 Minutes',
    calories: '200 Cal',
    image: '/images/yogurt.png', 
  },
  {
    title: 'Oseng Oseng Salmon',
    time: '35 Minutes',
    calories: '350 Cal',
    image: '/images/salmon.png', 
  },
  {
    title: 'Yogurt Putih Kental Stroberi',
    time: '6 Minutes',
    calories: '200 Cal',
    image: '/images/yogurt.png', 
  },
  {
    title: 'Oseng Oseng Salmon',
    time: '35 Minutes',
    calories: '350 Cal',
    image: '/images/salmon.png', 
  },
  {
    title: 'Yogurt Putih Kental Stroberi',
    time: '6 Minutes',
    calories: '200 Cal',
    image: '/images/yogurt.png', 
  },
  {
    title: 'Oseng Oseng Salmon',
    time: '35 Minutes',
    calories: '350 Cal',
    image: '/images/salmon.png', 
  },
  {
    title: 'Yogurt Putih Kental Stroberi',
    time: '6 Minutes',
    calories: '200 Cal',
    image: '/images/yogurt.png', 
  },
  {
    title: 'Oseng Oseng Salmon',
    time: '35 Minutes',
    calories: '350 Cal',
    image: '/images/salmon.png', 
  },
];

const Makanan = () => {
    return (
      <main>
        <Navbar />
        <FoodRecommendation />
        <div className="makanan-grid">
          {foodItems.map((food, index) => (
            <FoodCard
              key={index}
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
