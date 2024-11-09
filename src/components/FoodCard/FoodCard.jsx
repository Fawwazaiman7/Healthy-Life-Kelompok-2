import React from 'react';
import './FoodCard.css'; // Pastikan jalur ini benar

const FoodCard = ({ title, time, calories, image }) => {
  return (
    <div className="foodCard">
      <div className="foodDetails">
        <h3 className="foodTitle">{title}</h3>
        <p className="foodInfo">{time} | {calories}</p>
      </div>
      <div className="imageContainer">
        <img src={image} alt={title} className="foodImage" />
      </div>
    </div>
  );
};

export default FoodCard;

