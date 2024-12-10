import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FoodCard.css';

const FoodCard = ({ id, title, time, calories, image }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipe/${id}`); // Menggunakan ID untuk navigasi ke halaman detail
  };

  return (
    <div className="foodCard" onClick={handleCardClick}>
      <div className="foodDetails">
        <h3 className="foodTitle">{title}</h3>
        <p className="foodInfo">{calories} kalori</p>
      </div>
      <div className="imageContainer">
        <img src={image} alt={title} className="foodImage" />
      </div>
    </div>
  );
};

export default FoodCard;



