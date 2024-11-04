import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../components/HeroSection/HeroSection';
import FeatureCards from '../components/FeatureCards/FeatureCards';
import Article from '../components/Article/Article';

const Home = () => {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <FeatureCards />
            <div className="articles-section">
                <Article 
                    title="Contoh Artikel 1"
                    content="Konten artikel pertama..."
                    imageUrl="/assets/images/article1.jpg"
                    link="/artikel1"
                />
                <Article 
                    title="Contoh Artikel 2"
                    content="Konten artikel kedua..."
                    imageUrl="/assets/images/article2.jpg"
                    link="/artikel2"
                />
            </div>
        </div>
    );
};

export default Home;
