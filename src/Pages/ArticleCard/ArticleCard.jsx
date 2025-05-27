// src/components/ArticleCard/ArticleCard.jsx
import React from "react";
import "./ArticleCard.css";
import { Link } from "react-router-dom";

export default function ArticleCard({ title, description, imageUrl, link }) {
  return (
    <div className="article-card" data-aos="fade-up">
      <div className="article-content">
        <h3 className="article-title">{title}</h3>
        <p className="article-description">{description}</p>
        <Link
          to={link}
          onClick={() => console.log("Navigating to:", link)}
          className="article-link"
        >
          Baca Artikel &rarr;
        </Link>
      </div>
      <img src={imageUrl} alt={title} className="article-image" />
    </div>
  );
}

export const ArticleList = ({ articles }) => {
  console.table(articles); // Debug semua artikel

  return (
    <div className="article-container">
      {articles
        .filter((article) => article.id_artikel) // Filter yang id-nya valid
        .map((article) => (
          <ArticleCard
            key={article.id_artikel}
            title={article.judul}
            description={
              article.konten
                ? article.konten.replace(/<[^>]+>/g, "").substring(0, 80) + "..."
                : "Tidak ada konten"
            }
            imageUrl={article.gambar || "/placeholder.jpg"}
            link={`/article/${article.id_artikel}`}
          />
        ))}
    </div>
  );
};
