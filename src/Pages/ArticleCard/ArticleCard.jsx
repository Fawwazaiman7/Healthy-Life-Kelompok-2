import React from 'react';
import './ArticleCard.css';

export default function ArticleCard({ title, description, imageUrl, link }) {
  return (
    <div className="article-card" data-aos="fade-up">
      <div className="article-content">
        <h3 className="article-title">{title}</h3>
        <p className="article-description">{description}</p>
        <a href={link} className="article-link">Baca Artikel &rarr;</a> {/* Link to the full article */}
      </div>
      <img src={imageUrl} alt={title} className="article-image" />
    </div>
  );
}

// Komponen untuk menampilkan daftar artikel
export const ArticleList = ({ articles }) => {
  return (
    <div className="article-container"> {/* Kontainer untuk menyusun kartu secara horizontal */}
      {articles.map((article, index) => (
        <ArticleCard
          key={index}
          title={article.title}
          description={article.description}
          imageUrl={article.imageUrl}
          link={article.link}
        />
      ))}
    </div>
  );
};
