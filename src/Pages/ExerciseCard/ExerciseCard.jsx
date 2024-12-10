import React from "react";
import "./ExerciseCard.css";

const ExerciseCard = ({ title, time, calories, image, video, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick({ title, video }); // Mengirim data title dan video ke parent
    }
  };

  return (
    <div className="exercise-card" onClick={handleClick}>
      <img src={image} alt={title} className="exercise-card-image" />
      <div className="exercise-card-content">
        <h3 className="exercise-card-title">{title}</h3>
        <div className="exercise-card-details">
          <span>{time} </span>
          <span>🔥 {calories} kal</span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
