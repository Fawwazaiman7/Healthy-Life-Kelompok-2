import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminFoodForm.css";

const AdminFoodForm = ({ currentFood, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    judul: "",
    kalori: "",
    gambar: "",
    resep: [],
    cara_pembuatan: [],
  });
  const [currentIngredient, setCurrentIngredient] = useState(""); // Untuk menambah satu bahan ke array
  const [currentInstruction, setCurrentInstruction] = useState(""); // Untuk menambah satu langkah pembuatan ke array

  useEffect(() => {
    if (currentFood) {
      setFormData({
        judul: currentFood.title || "",
        kalori: currentFood.calories || "",
        gambar: currentFood.image || "",
        resep: Array.isArray(currentFood.ingredients)
          ? currentFood.ingredients
          : [], // Validasi
        cara_pembuatan: Array.isArray(currentFood.tutorial)
          ? currentFood.tutorial
          : [], // Validasi
      });
    }
  }, [currentFood]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddIngredient = () => {
    if (currentIngredient.trim() !== "") {
      setFormData({
        ...formData,
        resep: [...formData.resep, currentIngredient.trim()],
      });
      setCurrentIngredient(""); // Reset input bahan
    }
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = formData.resep.filter((_, i) => i !== index);
    setFormData({ ...formData, resep: updatedIngredients });
  };

  const handleAddInstruction = () => {
    if (currentInstruction.trim() !== "") {
      setFormData({
        ...formData,
        cara_pembuatan: [...formData.cara_pembuatan, currentInstruction.trim()],
      });
      setCurrentInstruction(""); // Reset input langkah pembuatan
    }
  };

  const handleDeleteInstruction = (index) => {
    const updatedInstructions = formData.cara_pembuatan.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, cara_pembuatan: updatedInstructions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.judul || !formData.kalori) {
      alert("Please fill in all required fields");
      return;
    }

    const method = currentFood ? "put" : "post";
    const url = "http://localhost/healty_life/backend/adminFood.php";
    console.log("Data yang akan dikirim:", formData);


    axios({
      method,
      url,
      data: {
        ...formData,
        resep: JSON.stringify(formData.resep), // Kirim sebagai JSON string
        cara_pembuatan: JSON.stringify(formData.cara_pembuatan), // Kirim sebagai JSON string
        id: currentFood?.id,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.data.success) {
          alert(
            currentFood
              ? "Food updated successfully!"
              : "Food added successfully!"
          );
          onSave();
        } else {
          alert("Failed to save food: " + response.data.message);
        }
      })
      .catch((error) => {
        console.error(
          "Error saving food:",
          error.response?.data || error.message
        );
        alert("Failed to save food");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-food-form">
      <h3>{currentFood ? "Edit Food" : "Add Food"}</h3>

      <div className="form-group">
        <label htmlFor="judul">Title*</label>
        <input
          type="text"
          id="judul"
          name="judul"
          value={formData.judul}
          onChange={handleChange}
          placeholder="Enter food title"
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <label htmlFor="kalori">Calories*</label>
        <input
          type="number"
          id="kalori"
          name="kalori"
          value={formData.kalori}
          onChange={handleChange}
          placeholder="Enter calories"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label htmlFor="gambar">Image URL</label>
        <input
          type="text"
          id="gambar"
          name="gambar"
          value={formData.gambar}
          onChange={handleChange}
          placeholder="Enter image URL"
          maxLength={755}
        />
      </div>

      <div className="form-group">
        <label>Ingredients</label>
        <div className="ingredient-list">
          {formData.resep.map((ingredient, index) => (
            <div key={index} className="ingredient-item">
              <span>{ingredient}</span>
              <button
                type="button"
                onClick={() => handleDeleteIngredient(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          placeholder="Add an ingredient"
          maxLength={4000}
        />
        <button type="button" onClick={handleAddIngredient}>
          Add
        </button>
      </div>

      <div className="form-group">
        <label>Instructions</label>
        <div className="instruction-list">
          {formData.cara_pembuatan.map((instruction, index) => (
            <div key={index} className="instruction-item">
              <span>{instruction}</span>
              <button
                type="button"
                onClick={() => handleDeleteInstruction(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={currentInstruction}
          onChange={(e) => setCurrentInstruction(e.target.value)}
          placeholder="Add an instruction"
          maxLength={725}
        />
        <button type="button" onClick={handleAddInstruction}>
          Add
        </button>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-success">
          {currentFood ? "Save Changes" : "Add Food"}
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AdminFoodForm;
