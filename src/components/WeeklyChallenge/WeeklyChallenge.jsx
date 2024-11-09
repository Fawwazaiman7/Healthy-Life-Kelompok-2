import React from 'react';
import './WeeklyChallenge.css'; // Pastikan Anda mengimpor CSS

export default function WeeklyChallenge() {
  const challenges = [
    {
      title: 'Push Up',
      time: '15 Minutes',
      calories: '120 Cal',
      image: '/images/pushup.png', // Ganti dengan jalur gambar yang sesuai
    },
    {
      title: 'Squad Jump',
      time: '20 Minutes',
      calories: '120 Cal',
      image: '/images/squadjump.png', // Ganti dengan jalur gambar yang sesuai
    },
  ];

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
                <span>{challenge.calories}</span>
              </div>
              <button className="play-button"></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
