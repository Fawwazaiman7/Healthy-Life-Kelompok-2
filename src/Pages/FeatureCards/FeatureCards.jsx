import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeatureCards.css';

const FeatureCards = () => {
  const navigate = useNavigate();

  // **JANGAN pakai basename di link, cukup path saja**
  const features = [
    { title: "Tracker", description: "Pantau dan kelola asupan gizi harian Anda dengan mudah.", link: "/exerciseandfoodtracker" },
    { title: "Rekomendasi Olahraga", description: "Olahraga yang tepat untuk anda", link: "/olahraga" },
    { title: "Resep Makanan Diet", description: "Gizi seimbang untuk diet sehat", link: "/makanan" },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleCardClick = (index) => {
    setActiveIndex(index);
    setTimeout(() => {
      navigate(features[index].link); // hanya path relatif
    }, 300);
  };

  return (
    <div className="feature-cards">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`feature-card ${activeIndex === index ? 'bubble' : ''}`}
          onClick={() => handleCardClick(index)}
          style={{ cursor: 'pointer' }}
        >
          <h2>{feature.title}</h2>
          <p>{feature.description}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(feature.link);
            }}
            type="button"
          >
            See More
          </button>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
