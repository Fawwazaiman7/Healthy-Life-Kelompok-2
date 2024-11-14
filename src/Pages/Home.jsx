import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import FeatureCards from '../components/FeatureCards/FeatureCards';
import articles from '../data/articleData';
import AOS from 'aos';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import 'aos/dist/aos.css';
import './Home.css';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
          duration: 1500,
          offset: 200,
          easing: 'ease-in-out',
          once: true,
        });

        // Check login status from localStorage
        const loggedIn = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedIn === 'true');
    }, []);

    // Function to handle button click
    const handleButtonClick = () => {
        if (isLoggedIn) {
            navigate('/olahraga'); // Navigate to Olahraga page if logged in
        } else {
            navigate('/sign-up'); // Navigate to Get Started (sign-up) page if not logged in
        }
    };

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
                        {/* Conditional text and link based on login status */}
                        <button className="hero-button" onClick={handleButtonClick}>
                            {isLoggedIn ? 'Mulai Olahraga' : 'Get Started'}
                        </button>
                    </div>
                </div>
            </section>

            {/* Feature Cards Section */}
            <FeatureCards />

            {/* Articles Section */}
            <section className="articles-section">
                {articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        title={article.title}
                        description={article.preview}
                        imageUrl={article.imageUrl}
                        link={`/article/${article.id}`}
                    />
                ))}
            </section>
        </main>
    );
}
