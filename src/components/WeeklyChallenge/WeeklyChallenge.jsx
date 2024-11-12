// WeeklyChallenge.jsx
import React, { useState, useEffect } from 'react';
import './WeeklyChallenge.css'; // Make sure you have this CSS file
import exercises from '../../data/exerciseData'; // Import exercise data

export default function WeeklyChallenge() {
  const [challenges, setChallenges] = useState([]);

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

  return (
    <div className="weeklyChallenge">
      <h2 className="weeklyChallenge-title">Weekly Challenge</h2>
      <div className="challenge-cards">
        {challenges.map((challenge, index) => (
          <div className="challenge-card" key={index}>
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
              <button className="play-button"></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
