import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "aos/dist/aos.css";
import "./Olahraga.css";
import WeeklyChallenge from "../WeeklyChallenge/WeeklyChallenge";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import Footer from "../../components/Footer/Footer"; // Impor Footer
import Pagination from "../../components/Pagination/Pagination"; // Impor komponen Pagination
import axios from "axios";

const Olahraga = () => {
  const [exercises, setExercises] = useState([]); // State untuk data latihan
  const [selectedExercise, setSelectedExercise] = useState(null); // Untuk menyimpan data exercise yang dipilih
  const [loading, setLoading] = useState(true); // State untuk indikator loading
  const [error, setError] = useState(null); // State untuk error handling
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
  const itemsPerPage = 6; // Jumlah item per halaman

  // Menghitung indeks awal dan akhir item pada halaman saat ini
  const indexOfLastExercise = currentPage * itemsPerPage;
  const indexOfFirstExercise = indexOfLastExercise - itemsPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise); // Mengambil latihan untuk halaman saat ini

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
        setLoading(false); // Set loading selesai
      } catch (error) {
        console.error("Terjadi kesalahan saat memuat data olahraga:", error);
        setError("Failed to fetch exercise items. Please try again later.");
        setLoading(false); // Set loading selesai
      }
    };

    fetchExercises(); // Panggil fungsi untuk fetch data
  }, []); // Hanya dijalankan sekali saat komponen dimuat

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Mengubah halaman saat ini
  };

  const closePopup = () => {
    setSelectedExercise(null); // Menutup pop-up
  };

  if (loading) {
    return <p>Loading exercises...</p>; // Tampilkan loading saat data belum diambil
  }

  if (error) {
    return <p>{error}</p>; // Tampilkan pesan error jika ada masalah
  }

  return (
    <main>
      <Navbar />
      <WeeklyChallenge />

      {/* Section for Exercise Cards */}
      <section className="exercise-section">
        <h2 className="olahraga-title">Exercise Recommendation</h2>
        <div className="exercise-cards">
          {currentExercises.map((exercise) => (
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

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={exercises.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange} // Mengubah halaman
      />

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
