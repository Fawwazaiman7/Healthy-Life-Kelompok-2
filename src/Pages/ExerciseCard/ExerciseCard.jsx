// ExerciseCard.jsx
import React from 'react';
import './ExerciseCard.css'; // Pastikan Anda membuat file CSS terpisah untuk gaya

export default function ExerciseCard({ title, time, calories, image }) {
  return (
    <div className="exercise-card">
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
}
