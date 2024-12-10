import React, { useState } from 'react';
import './FeatureCards.css';

const FeatureCards = () => {
    const features = [
        { title: "Tracker", description: "Pantau dan kelola asupan gizi harian Anda dengan easily.", link: "/exerciseandfoodtracker" },
        { title: "Rekomendasi Olahraga", description: "Olahraga yang tepat untuk anda", link: "/olahraga" },
        { title: "Resep Makanan Diet", description: "Gizi seimbang untuk diet sehat", link: "/makanan" },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const handleCardClick = (index) => {
        setActiveIndex(index);
        // Redirect to the link after a short delay
        setTimeout(() => {
            window.location.href = features[index].link;
        }, 300); // Delay to allow the bubble effect to show
    };

    return (
        <div className="feature-cards">
            {features.map((feature, index) => (
                <div 
                    key={index} 
                    className={`feature-card ${activeIndex === index ? 'bubble' : ''}`} 
                    onClick={() => handleCardClick(index)} // Handle click event
                >
                    <h2>{feature.title}</h2>
                    <p>{feature.description}</p>
                    <a href={feature.link}>See More</a>
                </div>
            ))}
        </div>
    );
};

export default FeatureCards;
