import React, { useState, useEffect } from "react";
import "./AdminArticleForm.css";

const AdminArticleForm = ({ currentArticle, onSave, onCancel }) => {
  const [formdata, setFormData] = useState({
    judul: "",
    konten: "",
    kategori_artikel: "",
    kategori_bmi_artikel: "",
  });

  // Mengisi data jika sedang dalam mode edit
  useEffect(() => {
    if (currentArticle) {
      console.log(
        "currentArticle diterima di AdminArticleForm:",
        currentArticle
      );
      setFormData({
        judul: currentArticle.title || "",
        konten: currentArticle.content || "",
        kategori_artikel: currentArticle.category || "",
        kategori_bmi_artikel: currentArticle.bmi_category || "",
      });
    }
  }, [currentArticle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Data yang akan dikirim ke backend:", formdata);

    // Gunakan fungsi onSave yang dikirim dari parent
    onSave({
      ...formdata,
      id: currentArticle?.id, // Tambahkan ID jika sedang mengedit
    });
    
  };

  return (
    <form onSubmit={handleSubmit} className="admin-article-form">
      <h3>{currentArticle ? "Edit Artikel" : "Tambah Artikel"}</h3>
      <div className="form-group">
        <label htmlFor="judul">Judul*</label>
        <input
          type="text"
          id="judul"
          name="judul"
          value={formdata.judul}
          onChange={handleChange}
          placeholder="Masukkan judul artikel"
          maxLength={100}
        />
      </div>
      <div className="form-group">
        <label htmlFor="konten">Konten*</label>
        <textarea
          id="konten"
          name="konten"
          value={formdata.konten}
          onChange={handleChange}
          placeholder="Masukkan konten artikel"
          maxLength={5000}
        />
      </div>
      <div className="form-group">
        <label htmlFor="kategori_artikel">Kategori Artikel*</label>
        <select
          id="kategori_artikel"
          name="kategori_artikel"
          value={formdata.kategori_artikel}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">-- Pilih Kategori Artikel --</option>
          <option value="Informasi Umum">Informasi Umum</option>
          <option value="Olahraga">Olahraga</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="kategori_bmi_artikel">Kategori BMI (Opsional)</label>
        <select
          id="kategori_bmi_artikel"
          name="kategori_bmi_artikel"
          value={formdata.kategori_bmi_artikel}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">-- Pilih Kategori BMI --</option>
          <option value="Gemuk">Gemuk</option>
          <option value="Ideal">Ideal</option>
          <option value="Kurus">Kurus</option>
          <option value="Obesitas Tingkat 1">Obesitas Tingkat 1</option>
          <option value="Obesitas Tingkat 2">Obesitas Tingkat 2</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-success">
          {currentArticle ? "Simpan Perubahan" : "Tambah Artikel"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Batal
        </button>
      </div>
      <div className="form-note">
        <small>* Required fields</small>
      </div>
    </form>
  );
};

export default AdminArticleForm;
