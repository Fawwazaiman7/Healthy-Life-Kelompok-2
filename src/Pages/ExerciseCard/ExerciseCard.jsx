import React from 'react';
import { useNavigate } from 'react-router-dom'; // Impor useNavigate
import './ExerciseCard.css'; // Pastikan Anda membuat file CSS terpisah untuk gaya

const ExerciseCard = ({ id, title, time, calories, image }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/exercise/${id}`); // Menggunakan ID untuk navigasi ke halaman detail
  };

  return (
    <div className="exercise-card" onClick={handleCardClick}> {/* Tambahkan onClick di sini */}
      <img src={image} alt={title} className="exercise-image" />
      <div className="exercise-info">
        <h3 className="exercise-title">{title}</h3>
        <div className="exercise-details">
          <span className="exercise-time">⏱ {time}</span>
          <span className="exercise-calories">🔥 {calories}</span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard; // Pastikan Anda mengekspor komponen ini
