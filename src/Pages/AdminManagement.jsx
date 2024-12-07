import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import AdminFoodForm from "../components/AdminFoodForm";
import AdminExerciseForm from "../components/AdminExerciseForm";
import AdminArticleForm from "../AdminArticleForm/AdminArticleForm"; // Import Form Artikel
import { useNavigate } from "react-router-dom";
import "./AdminManagement.css";

const AdminManagement = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);
  const [articleList, setArticleList] = useState(articles); // State untuk artikel
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
        await Promise.all([fetchFoods(), fetchExercises()]);
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
        "http://localhost:80/healthy_life_api/backend/adminFood.php"
      );
      setFoods(response.data);
    } catch (error) {
      console.error("Gagal memuat makanan:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleEditFood = (food) => {
    setIsEditingFood(true);
    axios
      .get(
        `http://localhost:80/healthy_life_api/backend/adminFood.php?id=${food.id}`
      )
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
        "http://localhost:80/healthy_life_api/backend/adminExercise.php"
      );
      setExerciseList(response.data);
    } catch (error) {
      console.error("Gagal memuat olahraga:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFood = async (food) => {
    try {
      const method = currentFood ? "put" : "post";
      const url = "http://localhost:80/healthy_life_api/backend/adminFood.php";
      const response = await axios({
        method,
        url,
        data: {
          ...food,
          id: currentFood?.id, // Tambahkan ID jika sedang mengedit
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        await fetchFoods();
        setIsEditingFood(false);
        setCurrentFood(null);
      } else {
        alert("Failed to save food: " + response.data.message);
      }
    } catch (error) {
      console.error(
        "Failed to save food:",
        error.response?.data || error.message
      );
      alert("Failed to save food");
    }
  };

  const handleDeleteFood = async (id) => {
    if (window.confirm("Anda yakin ingin menghapus makanan ini?")) {
      try {
        const response = await axios.delete(
          "http://localhost:80/healthy_life_api/backend/adminFood.php",
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
      if (!exercise) {
        return;
      }

      // Validasi data yang diperlukan
      if (
        !exercise.judul ||
        !exercise.kalori_per_set ||
        !exercise.estimasi_waktu
      ) {
        alert("Please ensure all required fields are filled out.");
        return;
      }

      const method = currentExercise ? "put" : "post";
      const url =
        "http://localhost:80/healthy_life_api/backend/adminExercise.php";

      const response = await axios({
        method,
        url,
        data: {
          ...exercise,
          id: currentExercise?.id, // Tambahkan ID jika sedang mengedit
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        alert(
          currentExercise
            ? "Exercise updated successfully!"
            : "Exercise added successfully!"
        );
        await fetchExercises(); // Memperbarui daftar olahraga
        setIsEditingExercise(false);
        setCurrentExercise(null);
        window.location.reload(); // Refresh jika pengguna memilih OK
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
          "http://localhost:80/healthy_life_api/backend/adminExercise.php",
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

  if (loading && !foods.length && !exerciseList.length) {
    return (
      <>
        <Navbar />
        <div className="admin-management">
          <h1>Memuat...</h1>
        </div>
      </>
    );
  }

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:80/healthy_life_api/backend/adminArticle.php"
      );
      setArticleList(response.data);
    } catch (error) {
      console.error("Gagal memuat artikel:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSaveArticle = async (article) => {
    try {
      const method = currentArticle ? "put" : "post";
      const url =
        "http://localhost:80/healthy_life_api/backend/adminArticle.php";

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

      if (response.data.success) {
        await fetchArticles();
        setIsEditingArticle(false);
        setCurrentArticle(null);
        alert(
          currentArticle
            ? "Article updated successfully!"
            : "Article added successfully!"
        );
      } else {
        alert("Failed to save article: " + response.data.message);
      }
    } catch (error) {
      console.error(
        "Failed to save article:",
        error.response?.data || error.message
      );
      alert("Failed to save article");
    }
  };

  const handleEditArticle = (article) => {
    setIsEditingArticle(true);
    axios
      .get(
        `http://localhost:80/healthy_life_api/backend/adminArticle.php?id=${article.id_artikel}`
      )
      .then((response) => {
        if (response.data) {
          console.log("Data artikel dari backend:", response.data);
          setCurrentArticle({
            id_artikel: response.data.id_artikel,
            judul: response.data.judul,
            konten: response.data.konten,
            kategori_artikel: response.data.kategori_artikel,
            kategori_bmi_artikel: response.data.kategori_bmi_artikel,
          });
        } else {
          alert("Artikel tidak ditemukan.");
          setIsEditingArticle(false);
        }
      })
      .catch((error) => {
        console.error("Gagal memuat data artikel untuk edit:", error);
        alert("Gagal memuat data artikel untuk edit.");
      });
  };


  const handleDeleteArticle = async (id_artikel) => {
    if (window.confirm("Anda yakin ingin menghapus artikel ini?")) {
      try {
        const response = await axios.delete(
          "http://localhost:80/healthy_life_api/backend/adminArticle.php",
          {
            data: { id_artikel },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          alert("Artikel berhasil dihapus");
          await fetchArticles();
        } else {
          alert("Gagal menghapus artikel: " + response.data.message);
        }
      } catch (error) {
        console.error("Gagal menghapus artikel:", error);
        alert("Gagal menghapus artikel: " + error.message);
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
                Promise.all([fetchFoods(), fetchExercises()]);
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

          {/* Kolom Manage Articles */}
          <div className="admin-column">
            <h2>Manage Articles</h2>
            <button
              className="add-button"
              onClick={() => {
                setIsEditingArticle(true);
                setCurrentArticle(null);
              }}
            >
              Add New Article
            </button>
            {isEditingArticle && (
              <AdminArticleForm
                currentArticle={currentArticle}
                onSave={handleSaveArticle}
                onCancel={() => setIsEditingArticle(false)}
              />
            )}
            <ul className="list-group">
              {articleList.map((article) => (
                <li key={article.id} className="list-group-item">
                  <div>
                    <h5>{article.title}</h5>
                    <p>{article.preview}</p>
                  </div>
                  <div>
                    <button
                      className="btn-warning"
                      onClick={() => handleEditArticle(article.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDeleteArticle(article.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

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
              />
            )}

            <ul className="list-group">
              {exerciseList.map((exercise) => (
                <li key={exercise.id} className="list-group-item">
                  <div className="item-details">
                    <h5>{exercise.title}</h5>
                    <p>Kalori: {exercise.calories}</p>
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
                      onClick={() => handleDeleteExercise(exercise.id)}
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
