import React, { useState } from "react";
import { foodItems } from "../data/foodData";
import AdminFoodForm from "../components/AdminFoodForm"; // Import komponen form

const AdminFood = () => {
  const [foods, setFoods] = useState(foodItems); // State untuk data makanan
  const [isEditing, setIsEditing] = useState(false); // State untuk menentukan mode tambah/edit
  const [currentFood, setCurrentFood] = useState(null); // State untuk data makanan yang sedang diedit

  // Fungsi untuk menghapus makanan
  const handleDelete = (id) => {
    setFoods(foods.filter((food) => food.id !== id));
  };

  // Fungsi untuk memulai mode edit
  const handleEdit = (food) => {
    setIsEditing(true);
    setCurrentFood(food);
  };

  // Fungsi untuk menyimpan makanan (tambah atau update)
  const handleSave = (food) => {
    if (isEditing) {
      // Update makanan yang sudah ada
      setFoods(
        foods.map((f) => (f.id === food.id ? food : f))
      );
    } else {
      // Tambahkan makanan baru
      setFoods([...foods, { ...food, id: Date.now().toString() }]);
    }
    setIsEditing(false);
    setCurrentFood(null);
  };

  return (
    <div className="container mt-4">
      <h1>Admin Food Management</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          setIsEditing(false);
          setCurrentFood(null);
        }}
      >
        Add New Food
      </button>

      {/* Form tambah/edit */}
      {currentFood || !isEditing ? (
        <AdminFoodForm
          currentFood={currentFood}
          onSave={handleSave}
          onCancel={() => setCurrentFood(null)}
        />
      ) : null}

      {/* Daftar makanan */}
      <ul className="list-group">
        {foods.map((food) => (
          <li key={food.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{food.title}</h5>
                <p>Time: {food.time}</p>
                <p>Calories: {food.calories}</p>
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(food)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(food.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminFood;
