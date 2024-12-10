import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react"; // Import TinyMCE editor
import "./AdminArticleForm.css";

const AdminArticleForm = ({ currentArticle, onSave, onCancel }) => {
  const [formdata, setFormData] = useState({
    judul: "",
    konten: "",
    gambar: "",
  });

  // Mengisi data jika sedang dalam mode edit
  useEffect(() => {
    if (currentArticle) {
      setFormData({
        judul: currentArticle.title || "",
        konten: currentArticle.content || "",
        gambar: currentArticle.image || "",
      });
    }
  }, [currentArticle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formdata, konten: content });
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
        <Editor
          apiKey="t823htr1whgddn0v9ily7k5ntj0b1au0f7w7rx0kzvl7mnfk" // Ganti dengan API Key TinyMCE Anda
          initialValue={formdata.konten}
          init={{
            height: 400,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar: [
              "undo redo | formatselect | bold italic backcolor",
              "alignleft aligncenter alignright alignjustify",
              "bullist numlist outdent indent | removeformat | help",
            ].join(" | "),
          }}
          onEditorChange={handleEditorChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="gambar">Gambar*</label>
        <textarea
          id="gambar"
          name="gambar"
          value={formdata.gambar}
          onChange={handleChange}
          placeholder="Masukkan link gambar"
          maxLength={5000}
        />
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
