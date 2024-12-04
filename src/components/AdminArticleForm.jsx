// src/components/AdminArticleForm.jsx
import React, { useState, useEffect } from 'react';
import './AdminArticleForm.css'; // Gaya tambahan untuk form artikel

const AdminArticleForm = ({ currentArticle, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    preview: '',
    content: '',
    imageUrl: '',
  });

  // Mengisi data artikel jika sedang dalam mode edit
  useEffect(() => {
    if (currentArticle) {
      setFormData(currentArticle);
    }
  }, [currentArticle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData.title || !formData.preview || !formData.content) {
      alert('Please fill out all fields!');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="admin-article-form">
      <h3>{currentArticle ? 'Edit Article' : 'Add Article'}</h3>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="preview">Preview</label>
        <input
          type="text"
          id="preview"
          name="preview"
          className="form-control"
          value={formData.preview}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className="form-control"
          value={formData.content}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          className="form-control"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </div>
      <div className="form-actions">
        <button className="btn btn-success" onClick={handleSave}>
          {currentArticle ? 'Save Changes' : 'Add Article'}
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default AdminArticleForm;
