// ArticleCard.jsx
import React from 'react';
import './ArticleCard.css';

export default function ArticleCard({ title, description, imageUrl, link }) {
  return (
    <div className="article-card" data-aos="fade-up"> {/* Tambahkan data-aos */}
      <div className="article-content">
        <h3 className="article-title">{title}</h3>
        <p className="article-description">{description}</p>
        <a href={link} className="article-link">See more &rarr;</a>
      </div>
      <img src={imageUrl} alt={title} className="article-image" />
    </div>
  );
}

