import  { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "aos/dist/aos.css";
import "./Olahraga.css";
import WeeklyChallenge from "../WeeklyChallenge/WeeklyChallenge";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import Pagination from "../../components/Pagination/Pagination";
import Footer from "../../components/Footer/Footer"; // Impor Footer
import axios from "axios";
import { useLocation } from "react-router-dom";

const Olahraga = () => {
  const [exercises, setExercises] = useState([]); // Data semua exercises
  const [filteredExercises, setFilteredExercises] = useState([]); // Data setelah filter
  const [selectedExercise, setSelectedExercise] = useState(null); // Untuk menyimpan data exercise yang dipilih
  const [currentPage, setCurrentPage] = useState(1); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);// Untuk menyimpan errorHalaman saat ini
  const itemsPerPage = 8; // Jumlah item per halaman
  const location = useLocation();

  // Menghitung indeks awal dan akhir item pada halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredExercises.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Fetch data from database
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/healthy_life_api/backend/adminexercise.php"
        );
        if (response.data && Array.isArray(response.data)) {
          const updatedExercises = response.data.map((exercise) => ({
            ...exercise,
            video: exercise.video.replace("watch?v=", "embed/").split("&")[0], // Konversi URL ke format embed
          }));
          setExercises(updatedExercises);
          setFilteredExercises(updatedExercises);
          console.log("Fetched exercises:", updatedExercises); // Debug: Log data fetch
        } else {
          console.error("Gagal memuat data olahraga:", response.data.message);
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat memuat data olahraga:", error);
        setError("Failed to fetch exercise items. Please try again later.");
        setLoading(false); // Set loading selesai
      }
    };

    fetchExercises();
  }, []);

  // Update filteredExercises berdasarkan query parameter
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query) {
      const filtered = exercises.filter((exercise) =>
        exercise.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredExercises(filtered);
      setCurrentPage(1); // Reset ke halaman pertama
      console.log("Filtered items for query:", query, filtered); // Debug: Log hasil filter
    } else {
      setFilteredExercises(exercises);
    }
  }, [location.search, exercises]);

  // Log data pagination
  useEffect(() => {
    console.log("Current items on this page:", currentItems); // Debug: Log current items
  }, [currentItems]);

  // Function to close the pop-up
  const closePopup = () => {
    setSelectedExercise(null); // Menutup pop-up
  };

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (exercises.length === 0) return <p>Loading exercises...</p>;

  return (
    <main>
      <Navbar />
      <WeeklyChallenge />

      {/* Section for Exercise Cards */}
      <section className="exercise-section">
        <h2 className="olahraga-title">Exercise Recommendation</h2>
        <div className="exercise-cards">
          {currentItems.length === 0 ? (
            <p>Data tidak ditemukan untuk pencarian ini.</p>
          ) : (
            currentItems.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                title={exercise.title}
                time={exercise.time}
                calories={exercise.calories}
                image={exercise.image}
                video={exercise.video}
                onClick={() => setSelectedExercise(exercise)} // Mengatur state untuk pop-up
              />
            ))
          )}
        </div>
      </section>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredExercises.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
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

      <Footer />
    </main>
  );
};

export default Olahraga;