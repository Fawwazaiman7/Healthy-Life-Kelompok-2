// src/pages/AdminManagement.jsx
import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar';
import AdminFoodForm from "../AdminFoodForm/AdminFoodForm";
import AdminExerciseForm from "../AdminExerciseForm/AdminExerciseForm";
import AdminArticleForm from "../AdminArticleForm/AdminArticleForm"; // Import Form Artikel
import { useNavigate } from "react-router-dom";
import { foodItems } from "../../data/foodData"; // Data makanan
import exercises from "../../data/exerciseData"; // Data olahraga
import articles from "../../data/articleData"; // Data artikel
import "./AdminManagement.css";

const AdminManagement = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState(foodItems);
  const [exerciseList, setExerciseList] = useState(exercises);
  const [articleList, setArticleList] = useState(articles); // State untuk artikel
  const [isEditingFood, setIsEditingFood] = useState(false);
  const [isEditingExercise, setIsEditingExercise] = useState(false);
  const [isEditingArticle, setIsEditingArticle] = useState(false); // State untuk artikel
  const [currentFood, setCurrentFood] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(null); // State untuk artikel yang sedang diedit

  useEffect(() => {
    // Proteksi akses halaman admin
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Access Denied");
      navigate("/login");
    }
  }, [navigate]);

  // Fungsi untuk menangani simpan data makanan
  const handleSaveFood = (food) => {
    if (currentFood) {
      setFoods(foods.map((f) => (f.id === food.id ? food : f)));
    } else {
      setFoods([...foods, { ...food, id: Date.now().toString() }]);
    }
    setIsEditingFood(false);
    setCurrentFood(null);
  };

  // Fungsi untuk menangani simpan data olahraga
  const handleSaveExercise = (exercise) => {
    if (currentExercise) {
      setExerciseList(
        exerciseList.map((e) => (e.id === exercise.id ? exercise : e))
      );
    } else {
      setExerciseList([
        ...exerciseList,
        { ...exercise, id: Date.now().toString() },
      ]);
    }
    setIsEditingExercise(false);
    setCurrentExercise(null);
  };

  // Fungsi untuk menangani simpan data artikel
  const handleSaveArticle = (article) => {
    if (currentArticle) {
      setArticleList(
        articleList.map((a) => (a.id === article.id ? article : a))
      );
    } else {
      setArticleList([
        ...articleList,
        { ...article, id: Date.now().toString() },
      ]);
    }
    setIsEditingArticle(false);
    setCurrentArticle(null);
  };

  // Fungsi untuk menghapus artikel
  const handleDeleteArticle = (id) => {
    setArticleList(articleList.filter((article) => article.id !== id));
  };

  // Fungsi untuk menghapus makanan
  const handleDeleteFood = (id) => {
    setFoods(foods.filter((food) => food.id !== id));
  };

  // Fungsi untuk menghapus olahraga
  const handleDeleteExercise = (id) => {
    setExerciseList(exerciseList.filter((exercise) => exercise.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="admin-management">
        <h1>Admin Management</h1>
        <div className="admin-columns">
          {/* Kolom Manage Foods */}
          <div className="admin-column">
            <h2>Manage Foods</h2>
            <button
              className="add-button"
              onClick={() => {
                setIsEditingFood(true);
                setCurrentFood(null);
              }}
            >
              Add New Food
            </button>
            {isEditingFood && (
              <AdminFoodForm
                currentFood={currentFood}
                onSave={handleSaveFood}
                onCancel={() => setIsEditingFood(false)}
              />
            )}
            <ul className="list-group">
              {foods.map((food) => (
                <li key={food.id} className="list-group-item">
                  <div>
                    <h5>{food.title}</h5>
                    <p>Time: {food.time}</p>
                    <p>Calories: {food.calories}</p>
                  </div>
                  <div>
                    <button
                      className="btn-warning"
                      onClick={() => {
                        setIsEditingFood(true);
                        setCurrentFood(food);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDeleteFood(food.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom Manage Exercises */}
          <div className="admin-column">
            <h2>Manage Exercises</h2>
            <button
              className="add-button"
              onClick={() => {
                setIsEditingExercise(true);
                setCurrentExercise(null);
              }}
            >
              Add New Exercise
            </button>
            {isEditingExercise && (
              <AdminExerciseForm
                currentExercise={currentExercise}
                onSave={handleSaveExercise}
                onCancel={() => setIsEditingExercise(false)}
              />
            )}
            <ul className="list-group">
              {exerciseList.map((exercise) => (
                <li key={exercise.id} className="list-group-item">
                  <div>
                    <h5>{exercise.title}</h5>
                    <p>Time: {exercise.time}</p>
                    <p>Calories: {exercise.calories}</p>
                  </div>
                  <div>
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
                      Delete
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
                      onClick={() => {
                        setIsEditingArticle(true);
                        setCurrentArticle(article);
                      }}
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
        </div>
      </div>
    </>
  );
};

export default AdminManagement;
