import React, { useState, useEffect, useCallback } from "react";
import "./WeeklyChallenge.css";

export default function WeeklyChallenge() {
  const [challenges, setChallenges] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Function to pick two random exercises from fetched data
  const getRandomChallenges = (exercises) => {
    const randomChallenges = [];
    const indices = new Set();

    while (indices.size < 2 && exercises.length > 1) {
      const randomIndex = Math.floor(Math.random() * exercises.length);
      indices.add(randomIndex);
    }

    indices.forEach((index) => randomChallenges.push(exercises[index]));
    return randomChallenges;
  };

  // Fetch exercises data from the backend
  const fetchExercises = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:80/healthy_life_api/backend/adminexercise.php"
      );
      const data = await response.json();
      if (response.ok && Array.isArray(data)) {
        // Convert YouTube URLs to embed links
        const updatedChallenges = data.map((exercise) => ({
          ...exercise,
          video: exercise.video.replace("watch?v=", "embed/")
            .split("&")[0], // Remove parameters like `&t=14s`
        }));
        setChallenges(getRandomChallenges(updatedChallenges));
        localStorage.setItem("challenges", JSON.stringify(updatedChallenges)); // Simpan tantangan ke localStorage
        localStorage.setItem("lastFetchDate", new Date().toISOString()); // Simpan tanggal terakhir diambil
      } else {
        console.error("Failed to fetch exercises:", data);
      }
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  }, []);

  // Check if 7 days have passed since last fetch
  const checkChallengeReset = useCallback(() => {
    const lastFetchDate = localStorage.getItem("lastFetchDate");
    const currentDate = new Date();

    if (!lastFetchDate) {
      // Jika tidak ada tanggal yang disimpan, ambil tantangan
      fetchExercises();
    } else {
      const lastDate = new Date(lastFetchDate);
      const daysPassed = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));

      if (daysPassed >= 7) {
        // Jika sudah 7 hari, ambil tantangan baru
        fetchExercises();
      } else {
        // Jika kurang dari 7 hari, ambil tantangan dari localStorage
        const existingChallenges = JSON.parse(localStorage.getItem("challenges"));
        if (existingChallenges) {
          setChallenges(getRandomChallenges(existingChallenges)); // Ambil tantangan acak dari yang ada
        } else {
          fetchExercises(); // Fallback jika tidak ada tantangan yang ditemukan
        }
      }
    }
  }, [fetchExercises]);

  // Fetch data when component mounts
  useEffect(() => {
    checkChallengeReset();
  }, [checkChallengeReset]);

  // Function to handle card click
  const handleCardClick = (challenge) => {
    setSelectedVideo(challenge);
  };

  // Function to close popup
  const closePopup = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="container"> {/* Container untuk tantangan */}
      <div className="weeklyChallenge">
        <h2 className="weeklyChallenge-title">Weekly Challenge</h2>
        <div className="challenge-cards">
          {challenges.map((challenge, index) => (
            <div
              className="challenge-card"
              key={index}
              onClick={() => handleCardClick(challenge)}
            >
              <img
                src={challenge.image}
                alt={challenge.title}
                className="challenge-image"
              />
              <div className="challenge-info">
                <h3 className="challenge-title">{challenge.title}</h3>
                <div className="challenge-details">
                  <span>{challenge.time} </span>
                  <span>🔥 {challenge.calories} kal</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Window */}
      {selectedVideo && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
          >
            <button className="popup-close" onClick={closePopup}>
              &times;
            </button>
            <h3>{selectedVideo.title}</h3>
            <iframe
              src={selectedVideo.video}
              title={`Video for ${selectedVideo.title}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
