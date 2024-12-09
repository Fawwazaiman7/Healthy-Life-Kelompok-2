import React from 'react';
import { useParams } from 'react-router-dom';
import './ExerciseDetail.css';
import Navbar from '../../components/Navbar/Navbar';
import { exerciseItems } from '../../data/exerciseData'; // Pastikan Anda memiliki data latihan

const ExerciseDetail = () => {
  const { id } = useParams();
  const exercise = exerciseItems.find((item) => item.id === id);

  if (!exercise) {
    return <p>Exercise not found</p>;
  }

  return (
    <main>
      <Navbar />
      <div className="exerciseDetail">
        <button className="class-icon" onClick={() => window.history.back()}>
          X
        </button> {/* Tombol silang untuk kembali */}
        <h2>{exercise.title}</h2>
        <div className="exerciseInfo">
          <p>{exercise.duration} | {exercise.caloriesBurned} Cal</p>
        </div>
        <div className="exerciseImage">
          <img src={exercise.image} alt={exercise.title} />
        </div>
        <div className="exerciseContent">
          <h3>Benefits</h3>
          <ul>
            {exercise.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <p>{exercise.instructions}</p>
        </div>
      </div>
    </main>
  );
};

export default ExerciseDetail;
