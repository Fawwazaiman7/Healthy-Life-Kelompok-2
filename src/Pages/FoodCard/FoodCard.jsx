import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FoodCard.css';

const FoodCard = ({ id, title, time, calories, image }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log("Navigating to recipe with ID:", id); // Log ID
    navigate(`/recipe/${id}`); // Menggunakan ID untuk navigasi ke halaman detail
  };

  return (
    <div className="foodCard" onClick={handleCardClick}>
      <div className="imageContainer">
        <img src={image} alt={title} className="foodImage" />
      </div>
      <div className="foodDetails">
        <h3 className="foodTitle">{title}</h3>
        <p className="foodInfo">{calories} kalori</p>
        <p className="foodTime">{time} menit</p> {/* Menambahkan waktu memasak */}
      </div>
    </div>
  );
};

export default FoodCard;
