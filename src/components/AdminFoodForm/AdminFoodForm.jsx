import React, { useState, useEffect } from "react";
import "./AdminFoodForm.css"; // Import file CSS khusus untuk AdminFoodForm

const AdminFoodForm = ({ currentFood, onSave, onCancel }) => {
  // State untuk data form
  const [formData, setFormData] = useState({
    title: "",
    time: "",
    calories: "",
    image: "",
    ingredients: [],
    tutorial: "",
  });

  // Mengisi data jika sedang dalam mode edit
  useEffect(() => {
    if (currentFood) {
      setFormData(currentFood);
    }
  }, [currentFood]);

  // Mengelola perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Menyimpan data form
  const handleSave = () => {
    // Validasi input
    if (!formData.title || !formData.time || !formData.calories) {
      alert("Please fill out all required fields!");
      return;
    }
    onSave({
      ...formData,
      ingredients: Array.isArray(formData.ingredients)
        ? formData.ingredients
        : formData.ingredients.split(",").map((item) => item.trim()), // Memastikan ingredients adalah array
    });
  };

  return (
    <div className="admin-food-form">
      <h3>{currentFood ? "Edit Food" : "Add Food"}</h3>
      {/* Title Input */}
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter food title"
        />
      </div>

      {/* Time Input */}
      <div className="form-group">
        <label htmlFor="time">Time</label>
        <input
          type="text"
          id="time"
          name="time"
          className="form-control"
          value={formData.time}
          onChange={handleChange}
          placeholder="Enter preparation time (e.g., 30 Minutes)"
        />
      </div>

      {/* Calories Input */}
      <div className="form-group">
        <label htmlFor="calories">Calories</label>
        <input
          type="text"
          id="calories"
          name="calories"
          className="form-control"
          value={formData.calories}
          onChange={handleChange}
          placeholder="Enter calorie count (e.g., 250 Cal)"
        />
      </div>

      {/* Image URL Input */}
      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          className="form-control"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter image URL"
        />
      </div>

      {/* Ingredients Input */}
      <div className="form-group">
        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          id="ingredients"
          name="ingredients"
          className="form-control"
          value={Array.isArray(formData.ingredients) ? formData.ingredients.join(", ") : formData.ingredients}
          onChange={handleChange}
          placeholder="Enter ingredients (comma-separated)"
        ></textarea>
      </div>

      {/* Tutorial Input */}
      <div className="form-group">
        <label htmlFor="tutorial">Tutorial</label>
        <textarea
          id="tutorial"
          name="tutorial"
          className="form-control"
          value={formData.tutorial}
          onChange={handleChange}
          placeholder="Enter step-by-step tutorial"
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="form-actions">
        <button className="btn btn-success" onClick={handleSave}>
          {currentFood ? "Save Changes" : "Add Food"}
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AdminFoodForm;
