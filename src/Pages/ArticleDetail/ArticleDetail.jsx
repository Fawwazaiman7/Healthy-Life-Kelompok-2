// src/Pages/ArticleDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios untuk mengambil data artikel dari backend
import Navbar from '../../components/Navbar/Navbar';
import './ArticleDetail.css';

export default function ArticleDetail() {
  const { id } = useParams(); // Mendapatkan ID artikel dari URL
  const [article, setArticle] = useState(null); // State untuk artikel
  const [loading, setLoading] = useState(true); // State untuk loading

  useEffect(() => {
    // Fungsi untuk mengambil data artikel berdasarkan ID
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:80/healthy_life_api/backend/articles.php?id=${id}`);
        if (response.data.success) {
          setArticle(response.data.data); // Set data artikel ke state
        } else {
          console.error('Artikel tidak ditemukan');
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil artikel:', error);
      } finally {
        setLoading(false); // Set loading ke false setelah data diambil
      }
    };

    fetchArticle();
  }, [id]); // Efek ini dijalankan setiap kali ID artikel berubah

  if (loading) return <p>Loading...</p>; // Menampilkan loading jika data belum diambil
  if (!article) return <p>Article not found</p>; // Menampilkan pesan jika artikel tidak ditemukan

  return (
    <main>
      <Navbar />
      <section className="article-detail">
        <button className="close-button" onClick={() => window.history.back()}>
          X
        </button>
        <h1>{article.title}</h1>
        <img src={article.image} alt={article.title} />
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }} // Menampilkan konten dengan HTML
        />
      </section>
    </main>
  );
}
