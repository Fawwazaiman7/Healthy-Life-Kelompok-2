import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Impor useNavigate
import './WeeklyChallenge.css'; // Pastikan Anda memiliki file CSS ini
import exercises from '../../data/exerciseData'; // Import exercise data

export default function WeeklyChallenge() {
  const [challenges, setChallenges] = useState([]);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Function to pick two random exercises
  const getRandomChallenges = () => {
    const randomChallenges = [];
    const indices = new Set();

    while (indices.size < 2) {
      const randomIndex = Math.floor(Math.random() * exercises.length);
      indices.add(randomIndex);
    }

    indices.forEach((index) => randomChallenges.push(exercises[index]));
    return randomChallenges;
  };

  // Set random challenges on component mount
  useEffect(() => {
    setChallenges(getRandomChallenges());
  }, []);

  const handleCardClick = (id) => {
    navigate(`/exercise/${id}`); // Navigasi ke halaman detail olahraga
  };

  return (
    <div className="container"> {/* Container untuk tantangan */}
      <div className="weeklyChallenge">
        <h2 className="weeklyChallenge-title">Weekly Challenge</h2>
        <div className="challenge-cards">
          {challenges.map((challenge) => (
            <div className="challenge-card" key={challenge.id} onClick={() => handleCardClick(challenge.id)}> {/* Tambahkan onClick di sini */}
              <img
                src={challenge.image}
                alt={challenge.title}
                className="challenge-image"
              />
              <div className="challenge-info">
                <h3 className="challenge-title">{challenge.title}</h3>
                <div className="challenge-details">
                  <span>{challenge.time}</span>
                  <span>🔥 {challenge.calories}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
