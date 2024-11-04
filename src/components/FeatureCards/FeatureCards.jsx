import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './FeatureCards.css';

const FeatureCards = () => {
    const features = [
        { title: "Kalkulator Berat Ideal", description: "Optimalkan perhitungan berat anda", link: "/kalkulator" },
        { title: "Rekomendasi Olahraga", description: "Olahraga yang tepat untuk anda", link: "/olahraga" },
        { title: "Resep Makanan Diet", description: "Gizi seimbang untuk diet sehat", link: "/makanan" },
    ];

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className="feature-cards">
            {features.map((feature, index) => (
                <div 
                    key={index} 
                    className="feature-card" 
                    data-aos="zoom-in" 
                    data-aos-delay={index * 100}
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
