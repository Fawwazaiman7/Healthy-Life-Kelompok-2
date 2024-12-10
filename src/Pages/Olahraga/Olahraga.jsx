import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "aos/dist/aos.css";
import "./Olahraga.css";
import WeeklyChallenge from "../WeeklyChallenge/WeeklyChallenge";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import Footer from "../../components/Footer/Footer"; // Impor Footer
import axios from "axios";

const Olahraga = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null); // Untuk menyimpan data exercise yang dipilih

  // Fetch data from database
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/healthy_life_api/backend/adminexercise.php"
        );
          if (response.data && Array.isArray(response.data)) {
            // Konversi URL YouTube ke embed link
            const updatedExercises = response.data.map((exercise) => ({
              ...exercise,
              video: exercise.video.replace("watch?v=", "embed/").split("&")[0], // Konversi URL ke format embed
            }));
            setExercises(updatedExercises);
          } else {
            console.error("Gagal memuat data olahraga:", response.data.message);
          }
      } catch (error) {
        console.error("Terjadi kesalahan saat memuat data olahraga:", error);
      }
    };

    fetchExercises();
  }, []);

  // Function to close the pop-up
  const closePopup = () => {
    setSelectedExercise(null);
  };

  return (
    <main>
      <Navbar />
      <WeeklyChallenge />

      {/* Section for Exercise Cards */}
      <section className="exercise-section">
        <h2 className="olahraga-title">Exercise Recommendation</h2>
        <div className="exercise-cards">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              title={exercise.title}
              time={exercise.time}
              calories={exercise.calories}
              image={exercise.image}
              video={exercise.video}
              onClick={(selected) => setSelectedExercise(selected)} // Mengatur state untuk pop-up
            />
          ))}
        </div>
      </section>

      {/* Pop-up untuk menampilkan video */}
      {selectedExercise && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>
              &times;
            </button>
            <h3>{selectedExercise.title}</h3>
            <iframe
              src={selectedExercise.video}
              title="Exercise Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Tambahkan Footer di sini */}
      <Footer />
    </main>
  );
};

export default Olahraga;
