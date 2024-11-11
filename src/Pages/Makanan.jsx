import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import './Makanan.css';
import FoodRecommendation from '../components/RecomOfTheDay/FoodRecommendation';
import FoodCard from '../components/FoodCard/FoodCard';

const foodItems = [
  {
    id: '1',
    title: 'Oseng Oseng Salmon',
    time: '35 Minutes',
    calories: '350 Cal',
    image: '/images/salmon.png',
  },
  {
    id: '2',
    title: 'Ayam Bakar Madu',
    time: '45 Minutes',
    calories: '400 Cal',
    image: '/images/ayam_bakar.png',
  },
  {
    id: '3',
    title: 'Gado-Gado',
    time: '25 Minutes',
    calories: '250 Cal',
    image: '/images/gado_gado.png',
  },
  {
    id: '4',
    title: 'Soto Ayam',
    time: '30 Minutes',
    calories: '300 Cal',
    image: '/images/soto_ayam.png',
  },
  {
    id: '5',
    title: 'Nasi Goreng Kampung',
    time: '20 Minutes',
    calories: '450 Cal',
    image: '/images/nasi_goreng.png',
  },
  {
    id: '6',
    title: 'Sate Ayam',
    time: '40 Minutes',
    calories: '360 Cal',
    image: '/images/sate_ayam.png',
  },
  {
    id: '7',
    title: 'Mie Goreng Spesial',
    time: '15 Minutes',
    calories: '500 Cal',
    image: '/images/mie_goreng.png',
  },
  {
    id: '8',
    title: 'Pecel Lele',
    time: '35 Minutes',
    calories: '380 Cal',
    image: '/images/pecel_lele.png',
  },
];

const Makanan = () => {
    return (
      <main>
        <Navbar />
        <FoodRecommendation />
        <div className="makanan-grid">
          {foodItems.map((food) => (
            <FoodCard
              key={food.id}
              id={food.id} // Tambahkan id sebagai prop
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
