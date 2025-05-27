import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminExerciseForm.css";

const AdminExerciseForm = ({
  currentExercise,
  onSave,
  onCancel,
  onFetchExercises,
}) => {
  const [formData, setFormData] = useState({
    judul: "",
    estimasi_waktu: "",
    kalori_per_set: "",
    gambar: "",
    link_video: "",
  });

  useEffect(() => {
    if (currentExercise) {
      setFormData({
        judul: currentExercise.nama_olahraga || "",
        estimasi_waktu: currentExercise.estimasi_waktu || "",
        kalori_per_set: currentExercise.kalori_per_set || "",
        gambar: currentExercise.gambar || "",
        link_video: currentExercise.link_video || "",
      });
    }
  }, [currentExercise]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const method = currentExercise ? "put" : "post";
    const url = "http://localhost/healty_life/backend/adminExercise.php";

    // Log data sebelum dikirim
    console.log("Data yang akan dikirim ke backend:", formData);

    if (!formData.judul || !formData.kalori_per_set) {
      alert("Please fill in all required fields");
      return;
    }

    axios({
      method,
      url,
      data: {
        ...formData,
        id: currentExercise?.id_olahraga, // <-- WAJIB agar bisa edit
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.data.success) {
          alert(
            currentExercise
              ? "Exercise updated successfully!"
              : "Exercise added successfully!"
          );
          onSave(); // Memperbarui data di UI
          onFetchExercises(); // Fetch ulang data olahraga
          onCancel(); // Menutup form setelah berhasil disimpan
        }
      })

      .catch((error) => {
        console.error(
          "Error saving exercise:",
          error.response?.data || error.message
        );
        alert(
          "Failed to save exercise: " +
            (error.response?.data?.message || error.message)
        );
      });

    console.log("Final Data sent to backend:", formData);
  };

  return (
    <form className="admin-exercise-form" onSubmit={handleSave}>
      <h3>{currentExercise ? "Edit Exercise" : "Add Exercise"}</h3>

      <div className="form-group">
        <label htmlFor="judul">Exercise Name*</label>
        <input
          type="text"
          id="judul"
          name="judul"
          value={formData.judul || ""}
          onChange={handleChange}
          placeholder={currentExercise?.judul || "Enter exercise name"}
          maxLength={100}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="estimasi_waktu">Duration*</label>
        <input
          type="text"
          id="estimasi_waktu"
          name="estimasi_waktu"
          value={formData.estimasi_waktu || ""}
          onChange={handleChange}
          placeholder={
            currentExercise?.estimasi_waktu ||
            "Enter duration (e.g., 30 Minutes)"
          }
          maxLength={25}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="kalori_per_set">Calories per Set*</label>
        <input
          type="number"
          id="kalori_per_set"
          name="kalori_per_set"
          value={formData.kalori_per_set || ""}
          onChange={handleChange}
          placeholder={
            currentExercise?.kalori_per_set || "Enter calories burned per set"
          }
          min="0"
          step="0.1"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="gambar">Image URL</label>
        <input
          type="text"
          id="gambar"
          name="gambar"
          value={formData.gambar || ""}
          onChange={handleChange}
          placeholder={currentExercise?.gambar || "Enter image URL"}
          maxLength={255}
        />
      </div>

      <div className="form-group">
        <label htmlFor="link_video">Video URL</label>
        <input
          type="text"
          id="link_video"
          name="link_video"
          value={formData.link_video || ""}
          onChange={handleChange}
          placeholder={currentExercise?.link_video || "Enter video URL"}
          maxLength={255}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-success">
          {currentExercise ? "Save Changes" : "Add Exercise"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>

      <div className="form-note">
        <small>* Required fields</small>
      </div>
    </form>
  );
};

export default AdminExerciseForm;
