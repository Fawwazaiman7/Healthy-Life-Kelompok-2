// Home.jsx
import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ArticleCard from '../ArticleCard/ArticleCard';
import FeatureCards from '../FeatureCards/FeatureCards'; // Import FeatureCards
import articles from '../../data/articleData';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';

export default function Home() {
    useEffect(() => {
        AOS.init({
          duration: 1500,
          offset: 200,
          easing: 'ease-in-out',
          once: true,
        });
    }, []);

    return (
        <main>
            <Navbar />

            {/* Hero Section */}
            <section className="hero-section" style={{ backgroundImage: `url('/images/homebg.png')` }}>
                <div className="hero-content">
                    <h1 className="typing-container">
                        <span className="typing-effect-line">"Berani coba fitur olahraga kami?"</span>
                        <br />
                        <span className="typing-effect-line">"Mulai sekarang, jadi yang terkuat!"</span>
                    </h1>
                    <div className="hero-button-container">
                        <button className="hero-button">Mulai Olahraga</button>
                    </div>
                </div>
            </section>

            {/* Feature Cards Section */}
            <FeatureCards /> {/* Use the FeatureCards component here */}

            {/* Articles Section */}
            <section className="articles-section">
                {articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        title={article.title}
                        description={article.preview} // Use preview text here
                        imageUrl={article.imageUrl}
                        link={`/article/${article.id}`} // Link to full article page
                    />
                ))}
            </section>
        </main>
    );
}
