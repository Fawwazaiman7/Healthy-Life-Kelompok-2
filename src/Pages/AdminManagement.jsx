import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar/Navbar';
import AdminFoodForm from "../components/AdminFoodForm";
import AdminExerciseForm from "../components/AdminExerciseForm";
import { useNavigate } from "react-router-dom";
import { foodItems } from "../data/foodData"; // Import data makanan
import exercises from "../data/exerciseData"; // Import data olahraga
import "./AdminManagement.css";

const AdminManagement = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState(foodItems); // Gunakan data makanan dari foodData.js
  const [exerciseList, setExerciseList] = useState(exercises); // Gunakan data olahraga dari exerciseData.js
  const [isEditingFood, setIsEditingFood] = useState(false);
  const [isEditingExercise, setIsEditingExercise] = useState(false);
  const [currentFood, setCurrentFood] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(null);

  useEffect(() => {
    // Proteksi akses halaman admin
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Access Denied");
      navigate("/login");
    }
  }, [navigate]);

  // Simpan data ke localStorage setiap kali foods atau exercises berubah
  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(foods));
  }, [foods]);

  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exerciseList));
  }, [exerciseList]);

  // Fungsi CRUD untuk makanan
  const handleDeleteFood = (id) => setFoods(foods.filter((food) => food.id !== id));
  const handleSaveFood = (food) => {
    if (currentFood) {
      setFoods(foods.map((f) => (f.id === food.id ? food : f)));
    } else {
      setFoods([...foods, { ...food, id: Date.now().toString() }]);
    }
    setIsEditingFood(false);
    setCurrentFood(null);
  };

  // Fungsi CRUD untuk olahraga
  const handleDeleteExercise = (id) =>
    setExerciseList(exerciseList.filter((exercise) => exercise.id !== id));
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
      </div>
    </div>
    </>
  );
};

export default AdminManagement;
