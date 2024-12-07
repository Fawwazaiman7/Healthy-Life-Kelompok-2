// src/Pages/ArticleDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import articles from '../../data/articleData';
import Navbar from '../../components/Navbar/Navbar';
import './ArticleDetail.css';

export default function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find((article) => article.id === parseInt(id));

  if (!article) return <p>Article not found</p>;

  return (
    <main>
      <Navbar />
      <section className="article-detail">
        <button className="close-button" onClick={() => window.history.back()}>
          X
        </button>
        <h1>{article.title}</h1>
        <img src={article.imageUrl} alt={article.title} />
        <p>{article.content}</p>
      </section>
    </main>
  );
}
