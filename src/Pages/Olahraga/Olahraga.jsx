import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "aos/dist/aos.css";
import "./Olahraga.css";
import WeeklyChallenge from "../WeeklyChallenge/WeeklyChallenge";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import Pagination from "../../components/Pagination/Pagination";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Olahraga = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;
  const location = useLocation();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredExercises.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost/healty_life/backend/adminExercise.php");

        console.log("🔥 [DEBUG] Response from API:", response.data);

        // ✅ Pastikan kita akses response.data.data
        if (response.data && Array.isArray(response.data.data)) {
          const updatedExercises = response.data.data.map((exercise) => ({
            id: exercise.id_olahraga,
            title: exercise.nama_olahraga,
            calories: exercise.kalori_per_set,
            time: exercise.estimasi_waktu,
            image: exercise.gambar,
            video: exercise.link_video
              .replace("watch?v=", "embed/")
              .split("&")[0],
          }));

          setExercises(updatedExercises);
          setFilteredExercises(updatedExercises);
          console.log("✅ [DEBUG] Exercises parsed:", updatedExercises);
        } else {
          console.warn("⚠️ [DEBUG] Data bukan array atau kosong:", response.data);
          setError("Data olahraga kosong atau format tidak sesuai.");
        }
      } catch (error) {
        console.error("❌ Gagal memuat data olahraga:", error?.response || error?.message || error);
        setError("Terjadi kesalahan saat mengambil data olahraga.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query) {
      const filtered = exercises.filter((exercise) =>
        exercise.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredExercises(filtered);
      setCurrentPage(1);
      console.log("🔍 [DEBUG] Filtered exercises for query:", query, filtered);
    } else {
      setFilteredExercises(exercises);
    }
  }, [location.search, exercises]);

  useEffect(() => {
    console.log("📄 [DEBUG] Current items on this page:", currentItems);
  }, [currentItems]);

  const closePopup = () => setSelectedExercise(null);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading exercises...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <Navbar />
      <WeeklyChallenge />

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
                onClick={() => setSelectedExercise(exercise)}
              />
            ))
          )}
        </div>
      </section>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredExercises.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

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
