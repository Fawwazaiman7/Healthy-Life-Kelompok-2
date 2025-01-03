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
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (currentFood) {
      console.log("Loading currentFood data:", currentFood); // Debugging data yang diterima
      setFormData({
        judul: currentFood.title || "",
        kalori: currentFood.calories || "",
        gambar: currentFood.image || "",
        resep: Array.isArray(currentFood.ingredients)
          ? currentFood.ingredients
          : [],
        cara_pembuatan: Array.isArray(currentFood.tutorial)
          ? currentFood.tutorial
          : [],
      });
    }
  }, [currentFood]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(`Updated field "${name}":`, value); // Debug perubahan field
  };

  const handleAddIngredient = () => {
    if (currentIngredient.trim() !== "") {
      setFormData({
        ...formData,
        resep: [...formData.resep, currentIngredient.trim()],
      });
      console.log("Added ingredient:", currentIngredient); // Debugging ingredient
      setCurrentIngredient(""); // Reset input bahan
    }
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = formData.resep.filter((_, i) => i !== index);
    console.log("Deleted ingredient at index:", index); // Debugging penghapusan ingredient
    setFormData({ ...formData, resep: updatedIngredients });
  };

  const handleAddInstruction = () => {
    if (currentInstruction.trim() !== "") {
      setFormData({
        ...formData,
        cara_pembuatan: [...formData.cara_pembuatan, currentInstruction.trim()],
      });
      console.log("Added instruction:", currentInstruction); // Debugging instruction
      setCurrentInstruction(""); // Reset input langkah pembuatan
    }
  };

  const handleDeleteInstruction = (index) => {
    const updatedInstructions = formData.cara_pembuatan.filter(
      (_, i) => i !== index
    );
    console.log("Deleted instruction at index:", index); // Debugging penghapusan instruction
    setFormData({ ...formData, cara_pembuatan: updatedInstructions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) {
      console.log("Pengiriman sedang berlangsung, abaikan submit ulang.");
      return; // Mencegah submit ulang
    }

    setIsSubmitting(true); // Mengatur state untuk menandai submit sedang berlangsung

    // Validasi data
    if (!formData.judul.trim()) {
      alert("Judul tidak boleh kosong");
      setIsSubmitting(false); // Reset state jika validasi gagal
      return;
    }
    if (!formData.kalori || isNaN(formData.kalori)) {
      alert("Kalori harus berupa angka dan tidak boleh kosong");
      setIsSubmitting(false); // Reset state jika validasi gagal
      return;
    }

    const method = currentFood ? "put" : "post";
    const url = "http://localhost:80/healthy_life_api/backend/adminFood.php";

    console.log("Final data sent to backend:", {
      ...formData,
      resep: formData.resep,
      cara_pembuatan: formData.cara_pembuatan,
    });

    axios({
      method,
      url,
      data: {
        ...formData,
        resep: formData.resep,
        cara_pembuatan: formData.cara_pembuatan,
        id: currentFood?.id,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Response dari backend:", response.data); // Debugging respons backend
        if (response.data.success) {
          alert(
            currentFood
              ? "Food updated successfully!"
              : "Food added successfully!"
          );
          // onSave(formData); // Pastikan data dikirim ke fungsi onSave
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
      })
      .finally(() => {
        setIsSubmitting(false); // Reset state setelah selesai
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
        <button type="submit" className="btn-success" disabled={isSubmitting}>
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
