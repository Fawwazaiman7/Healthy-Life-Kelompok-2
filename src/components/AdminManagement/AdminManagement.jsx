import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import AdminFoodForm from "../AdminFoodForm/AdminFoodForm";
import AdminExerciseForm from "../AdminExerciseForm/AdminExerciseForm";
import AdminArticleForm from "../AdminArticleForm/AdminArticleForm"; // Import Form Artikel
import { useNavigate } from "react-router-dom";
import "./AdminManagement.css";

const AdminManagement = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);
  const [articleList, setArticleList] = useState([]); // State untuk artikel
  const [isEditingFood, setIsEditingFood] = useState(false);
  const [isEditingExercise, setIsEditingExercise] = useState(false);
  const [isEditingArticle, setIsEditingArticle] = useState(false); // State untuk artikel
  const [currentFood, setCurrentFood] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(null); // State untuk artikel yang sedang diedit
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      const role = localStorage.getItem("role");
      if (role !== "admin") {
        alert("Akses Ditolak");
        navigate("/login");
        return;
      }

      try {
        await Promise.all([fetchFoods(), fetchExercises(), fetchArticles()]); // Tambahkan fetchArticles
      } catch (error) {
        console.error("Kesalahan saat memuat data awal:", error);
        setError("Gagal memuat data. Silakan coba lagi.");
      }
    };

    init();
  }, [navigate]);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost/healty_life/backend/adminFood.php"
      );
      console.log("📦 [DEBUG] Data makanan dari backend:", response.data);
      const data = response.data.data || [];
      console.log(
        "✅ [DEBUG] Tipe data:",
        Array.isArray(data) ? "array" : typeof data
      );
      setFoods(data);
    } catch (error) {
      console.error("Gagal memuat makanan:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost/healty_life/backend/articles.php"
      );
      console.log("🔥 [DEBUG] Response artikel:", response.data);
      const data = response.data.data || [];
      console.log("✅ [DEBUG] Data artikel:", data);
      console.log(
        "🧪 [DEBUG] Tipe data artikel:",
        Array.isArray(data) ? "array" : typeof data
      );
      setArticleList(data);
    } catch (error) {
      console.error("❌ Gagal memuat artikel:", error.message);
      setArticleList([]);
      setError("Data artikel gagal dimuat");
    } finally {
      setLoading(false);
    }
  };

  const handleEditFood = (food) => {
    setIsEditingFood(true);
    axios
      .get(`http://localhost/healty_life/backend/adminFood.php?id=${food.id}`)
      .then((response) => {
        console.log("Data artikel dari backend:", response.data);
        setCurrentFood(response.data); // Update dengan data lengkap dari backend
      })
      .catch((error) => {
        console.error("Gagal memuat data makanan untuk edit:", error);
        alert("Gagal memuat data makanan untuk edit.");
      });
  };

  const fetchExercises = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost/healty_life/backend/adminExercise.php"
      );
      console.log("🔥 [DEBUG] Response olahraga:", response.data);
      const data = response.data.data || [];
      console.log("✅ [DEBUG] Data olahraga:", data);
      console.log(
        "🧪 [DEBUG] Tipe data olahraga:",
        Array.isArray(data) ? "array" : typeof data
      );
      setExerciseList(data);
    } catch (error) {
      console.error("❌ Gagal memuat olahraga:", error);
      setExerciseList([]); // fallback kosong
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFood = async (food) => {
    try {
      const isEditing = !!food?.id;
      const method = isEditing ? "put" : "post";
      const url = "http://localhost/healty_life/backend/adminFood.php";

      const payload = {
        ...food,
        kalori: parseFloat(food.kalori), // penting: pastikan number
      };

      const response = await axios({
        method,
        url,
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        alert(
          isEditing
            ? "✅ Makanan berhasil diperbarui!"
            : "🎉 Makanan baru berhasil ditambahkan!"
        );
        await fetchFoods(); // refresh
        setIsEditingFood(false);
        setCurrentFood(null);
      } else {
        alert("⚠️ Gagal menyimpan makanan: " + response.data.message);
      }
    } catch (error) {
      console.error(
        "❌ Error saat menyimpan makanan:",
        error.response?.data || error.message
      );
      alert("❌ Terjadi kesalahan saat menyimpan makanan.");
    }
  };

  const handleDeleteFood = async (id) => {
    if (window.confirm("Anda yakin ingin menghapus makanan ini?")) {
      try {
        const response = await axios.delete(
          "http://localhost/healty_life/backend/adminFood.php",
          {
            data: { id: id }, // Mengirim ID dalam body
            headers: {
              "Content-Type": "application/json", // Pastikan headernya JSON
            },
          }
        );

        if (response.data.success) {
          alert("Makanan berhasil dihapus");
          await fetchFoods(); // Memperbarui data makanan setelah penghapusan
        } else {
          alert("Gagal menghapus makanan: " + response.data.message);
        }
      } catch (error) {
        console.error("Gagal menghapus makanan:", error);
        alert("Gagal menghapus makanan: " + error.message);
      }
    }
  };

  const handleSaveExercise = async (exercise) => {
    try {
      if (!exercise) return;

      const method = currentExercise ? "put" : "post";
      const url = "http://localhost/healty_life/backend/adminExercise.php";

      // Pastikan ID dikirim untuk update
      const payload = {
        ...exercise,
        id: currentExercise?.id, // Pastikan ID ada jika sudah ada
      };

      console.log("Payload yang dikirim ke backend:", payload);

      const response = await axios({
        method,
        url,
        data: payload,
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        alert(
          currentExercise
            ? "Exercise updated successfully!"
            : "Exercise added successfully!"
        );
        await fetchExercises(); // Refresh data olahraga di frontend
        setIsEditingExercise(false);
        setCurrentExercise(null);
      } else {
        alert("Failed to save exercise: " + response.data.message);
      }
    } catch (error) {
      console.error(
        "Gagal menyimpan olahraga:",
        error.response?.data || error.message
      );
      alert(
        "Gagal menyimpan olahraga: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleDeleteExercise = async (id) => {
    if (window.confirm("Anda yakin ingin menghapus olahraga ini?")) {
      try {
        const response = await axios.delete(
          "http://localhost/healty_life/backend/adminExercise.php",
          {
            data: { id },
          }
        );

        if (response.data.success) {
          await fetchExercises();
        }
      } catch (error) {
        console.error("Gagal menghapus olahraga:", error);
        alert("Gagal menghapus olahraga: " + error.message);
      }
    }
  };

  if (loading && !foods.length && !exerciseList.length && !articleList.length) {
    return (
      <>
        <Navbar />
        <div className="admin-management">
          <h1>Memuat...</h1>
        </div>
      </>
    );
  }

  const handleSaveArticle = async (article) => {
    try {
      const method = currentArticle ? "put" : "post";
      const url = "http://localhost/healty_life/backend/articles.php";

      const response = await axios({
        method,
        url,
        data: {
          ...article,
          id_artikel: currentArticle?.id_artikel, // Tambahkan ID jika sedang mengedit
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Respons Axios:", response); // Tambahkan di sini

      if (response.data.success) {
        alert(
          currentArticle
            ? "Article updated successfully!"
            : "Article added successfully!"
        );
        await fetchArticles();
        setIsEditingArticle(false);
        setCurrentArticle(null);
      } else {
        alert("Failed to save article: " + response.data.message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Terjadi kesalahan tidak diketahui.";
      console.error("Error:", message);
      alert(message);
    }
  };
  const handleDeleteArticle = async (id_artikel) => {
    if (window.confirm("Anda yakin ingin menghapus artikel ini?")) {
      console.log("ID Artikel yang akan dihapus:", id_artikel); // Debug ID Artikel
      try {
        const response = await axios.delete(
          "http://localhost/healty_life/backend/articles.php",
          {
            data: { id_artikel }, // Kirim ID artikel dalam body
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Respons Axios:", response); // Debug respons backend

        if (response.data.success) {
          alert("Artikel berhasil dihapus");
          await fetchArticles(); // Memperbarui daftar artikel
        } else {
          alert("Gagal menghapus artikel: " + response.data.message);
        }
      } catch (error) {
        console.error(
          "Gagal menghapus artikel:",
          error.response?.data || error.message
        );
        const message =
          error.response?.data?.message ||
          "Terjadi kesalahan saat menghapus artikel.";
        alert(message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-management">
        <h1>Manajemen Admin</h1>
        {error && (
          <div className="alert alert-danger">
            {error}
            <button
              onClick={() => {
                setError(null);
                Promise.all([fetchFoods(), fetchExercises(), fetchArticles()]);
              }}
            >
              Coba Lagi
            </button>
          </div>
        )}

        <div className="admin-columns">
          <div className="admin-column">
            <h2>Kelola Makanan</h2>
            <button
              className="add-button"
              onClick={() => {
                setIsEditingFood(true);
                setCurrentFood(null);
              }}
            >
              Tambah Makanan Baru
            </button>

            {isEditingFood && (
              <AdminFoodForm
                currentFood={currentFood}
                onSave={handleSaveFood}
                onCancel={() => {
                  setIsEditingFood(false);
                  setCurrentFood(null);
                }}
              />
            )}

            <ul className="list-group">
              {foods.map((food) => (
                <li key={food.id} className="list-group-item">
                  <div className="item-details">
                    <h5>{food.title}</h5>
                    <p>Kalori: {food.calories}</p>
                  </div>
                  <div className="action-buttons">
                    <button
                      className="btn-warning"
                      onClick={() => {
                        handleEditFood(food);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDeleteFood(food.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {
            <div className="admin-column">
              <h2>Kelola Artikel</h2>
              <button
                className="add-button"
                onClick={() => {
                  setIsEditingArticle(true);
                  setCurrentArticle(null); // Reset currentArticle untuk mode tambah
                }}
              >
                Tambah Artikel Baru
              </button>
              {isEditingArticle && (
                <AdminArticleForm
                  currentArticle={currentArticle} // Artikel saat ini (untuk mode edit)
                  onSave={handleSaveArticle} // Kirim fungsi handleSaveArticle
                  onCancel={() => setIsEditingArticle(false)} // Tutup form
                />
              )}
              <ul className="list-group">
                {articleList.map((article) => (
                  <li key={article.id_artikel} className="list-group-item">
                    <div className="item-details">
                      <h5>{article.judul}</h5>
                      <p>Konten: {article.konten.substring(0, 50)}...</p>{" "}
                      {/* optional preview */}
                    </div>
                    <div className="action-buttons">
                      <button
                        className="btn-warning"
                        onClick={() => {
                          setIsEditingArticle(true);
                          setCurrentArticle(article);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDeleteArticle(article.id_artikel)}
                      >
                        Hapus
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          }

          <div className="admin-column">
            <h2>Kelola Olahraga</h2>
            <button
              className="add-button"
              onClick={() => {
                setIsEditingExercise(true);
                setCurrentExercise(null);
              }}
            >
              Tambah Olahraga Baru
            </button>

            {isEditingExercise && (
              <AdminExerciseForm
                currentExercise={currentExercise}
                onSave={handleSaveExercise}
                onCancel={() => {
                  setIsEditingExercise(false);
                  setCurrentExercise(null);
                }}
                onFetchExercises={fetchExercises} // Tambahkan ini untuk fetch ulang data olahraga
              />
            )}

            <ul className="list-group">
              {exerciseList.map((exercise) => (
                <li key={exercise.id_olahraga} className="list-group-item">
                  <div className="item-details">
                    <h5>{exercise.nama_olahraga}</h5>
                    <p>Kalori: {exercise.kalori_per_set}</p>
                  </div>
                  <div className="action-buttons">
                    <button
                      className="btn-warning"
                      onClick={() => {
                        setIsEditingExercise(true);
                        setCurrentExercise(exercise);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDeleteExercise(exercise.id_olahraga)}
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminManagement;
