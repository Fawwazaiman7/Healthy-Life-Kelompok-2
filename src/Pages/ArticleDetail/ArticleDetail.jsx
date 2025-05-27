import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import './ArticleDetail.css';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || id === "undefined") {
      console.warn("ID artikel tidak valid:", id);
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost/healty_life/backend/articles.php?id=${id}`);
        console.log("Response data:", response.data);

        if (response.data.success && response.data.data) {
          setArticle(response.data.data);
        } else {
          console.warn("Data tidak valid atau artikel tidak ditemukan.");
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil artikel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!article) return <p>Article not found</p>;

  return (
    <main>
      <Navbar />
      <section className="article-detail">
        <button className="close-button" onClick={() => window.history.back()}>
          X
        </button>
        <h1>{article.judul}</h1>
        <img src={article.gambar} alt={article.judul} />
        <div
          className="article-content"
          dangerouslySetInnerHTML={{
            __html: article.konten || "<p>Konten belum tersedia.</p>"
          }}
        />
      </section>
    </main>
  );
}
