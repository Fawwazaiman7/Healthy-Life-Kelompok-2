import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminFoodForm.css";

const AdminFoodForm = ({ currentFood, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    judul: "",
    kalori: "",
    gambar: "",
    resep: "",
    cara_pembuatan: "",
  });

  useEffect(() => {
    if (currentFood) {
        console.log("currentFood diterima di AdminFoodForm:", currentFood);
      setFormData({
      judul: currentFood.title || "", // Ubah sesuai dengan field `title` dari backend
      kalori: currentFood.calories || "", // Ubah sesuai dengan field `calories` dari backend
      gambar: currentFood.image || "", // Ubah sesuai dengan field `image` dari backend
      resep: currentFood.ingredients || "", // Ubah sesuai dengan field `ingredients` dari backend
      cara_pembuatan: currentFood.tutorial || "", // Jika field ada
      });
    }
  }, [currentFood]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      console.log("handleSave dipanggil");


    if (!formData.judul || !formData.kalori) {
      alert("Please fill in all required fields");
      return;
    }

    const method = currentFood ? "put" : "post";
    const url = "http://localhost:80/healthy_life_api/backend/adminFood.php";

    axios({
      method,
      url,
      data: {
        ...formData,
        id: currentFood?.id,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.data.success) {
          alert(currentFood ? "Food updated successfully!" : "Food added successfully!");
          onSave();
        } else {
          alert("Failed to save food: " + response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error saving food:", error.response?.data || error.message);
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
          placeholder={currentFood?.judul || "Masukkan judul makanan"} // Placeholder diisi dari currentFood
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
          placeholder={currentFood?.kalori || "Masukkan jumlah kalori"} // Placeholder diisi dari currentFood
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
          placeholder={currentFood?.gambar || "Masukkan URL gambar"} // Placeholder diisi dari currentFood
          maxLength={255}
        />
      </div>

      <div className="form-group">
        <label htmlFor="resep">Recipe</label>
        <textarea
          id="resep"
          name="resep"
          value={formData.resep}
          onChange={handleChange}
          placeholder={currentFood?.resep || "Masukkan resep makanan"} // Placeholder diisi dari currentFood
          maxLength={255}
        />
      </div>

      <div className="form-group">
        <label htmlFor="cara_pembuatan">Instructions</label>
        <textarea
          id="cara_pembuatan"
          name="cara_pembuatan"
          value={formData.cara_pembuatan}
          onChange={handleChange}
          placeholder={currentFood?.cara_pembuatan || "Masukkan instruksi pembuatan"} // Placeholder diisi dari currentFood
          maxLength={255}
        />
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
