import React, { useState, useEffect, useCallback } from "react";
import "./WeeklyChallenge.css";

export default function WeeklyChallenge() {
  const [challenges, setChallenges] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

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

  const fetchExercises = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:80/healthy_life_api/backend/adminexercise.php"
      );
      const data = await response.json();
      if (response.ok && Array.isArray(data)) {
        const updatedChallenges = data.map((exercise) => ({
          ...exercise,
          video: exercise.video.replace("watch?v=", "embed/").split("&")[0],
        }));

        const randomChallenges = getRandomChallenges(updatedChallenges);
        setChallenges(randomChallenges);

        // Simpan tantangan dan tanggal dalam format ISO di localStorage
        const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
        localStorage.setItem(
          "weeklyChallenges",
          JSON.stringify(randomChallenges)
        );
        localStorage.setItem("lastGeneratedDate", currentDate);
        console.log(`Data tantangan baru disimpan ke localStorage:`);
        console.log(`Tanggal sekarang: ${currentDate}`);
        console.log("Tantangan baru:", randomChallenges);
      } else {
        console.error("Failed to fetch exercises:", data);
      }
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  }, []);

  useEffect(() => {
    const lastGeneratedDate = localStorage.getItem("lastGeneratedDate");
    const savedChallenges = localStorage.getItem("weeklyChallenges");
    const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    console.log(`Tanggal sekarang: ${currentDate}`);
    console.log(
      `Tanggal terakhir disimpan di localStorage: ${lastGeneratedDate}`
    );

    if (lastGeneratedDate && savedChallenges) {
      const lastDate = new Date(lastGeneratedDate);
      const now = new Date(currentDate);

      // Hitung perbedaan hari
      let daysDiff = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
      console.log(`Perbedaan hari sejak tantangan terakhir: ${daysDiff} hari`);

      // Jika daysDiff negatif, reset data di localStorage ke tanggal sekarang
      if (daysDiff < 0) {
        localStorage.setItem("lastGeneratedDate", currentDate);
        daysDiff = 0; // Reset selisih hari ke 0
        console.log(
          "Tanggal sistem komputer diubah ke masa lalu. Mereset data di localStorage ke tanggal sekarang."
        );
      }

      if (daysDiff < 7) {
        console.log("Menggunakan tantangan yang ada dari localStorage.");
        setChallenges(JSON.parse(savedChallenges));
        return;
      }
    }

    console.log(
      "Mengambil tantangan baru karena lebih dari 7 hari atau tidak ada data."
    );
    fetchExercises();
  }, [fetchExercises]);

  const handleCardClick = (challenge) => {
    setSelectedVideo(challenge);
  };

  const closePopup = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="container">
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

      {selectedVideo && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
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
