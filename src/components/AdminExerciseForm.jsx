import React, { useState, useEffect } from "react";
import "./AdminExerciseForm.css"; 

const AdminExerciseForm = ({ currentExercise, onSave, onCancel }) => {
  // State untuk data form
  const [formData, setFormData] = useState({
    title: "",
    time: "",
    calories: "",
    image: "",
  });

  // Mengisi data jika sedang dalam mode edit
  useEffect(() => {
    if (currentExercise) {
      setFormData(currentExercise);
    }
  }, [currentExercise]);

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
    onSave(formData);
  };

  return (
    <div className="admin-exercise-form">
      <h3>{currentExercise ? "Edit Exercise" : "Add Exercise"}</h3>
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
          placeholder="Enter exercise title"
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
          placeholder="Enter duration (e.g., 10 Minutes)"
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
          placeholder="Enter calorie burn (e.g., 50 Cal)"
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

      {/* Buttons */}
      <div className="form-actions">
        <button className="btn btn-success" onClick={handleSave}>
          {currentExercise ? "Save Changes" : "Add Exercise"}
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AdminExerciseForm;
