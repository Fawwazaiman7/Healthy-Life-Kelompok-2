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

        // Periksa status login dari localStorage
        const loggedIn = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedIn === 'true');
    }, []);

    // Fungsi untuk menangani klik tombol
    const handleButtonClick = () => {
        if (isLoggedIn) {
            navigate('/olahraga'); // Arahkan ke halaman Olahraga jika sudah login
        } else {
            navigate('/sign-up'); // Arahkan ke halaman Get Started (sign-up) jika belum login
        }
    };

    return (
        <main>
            <Navbar /> {/* Menampilkan Navbar */}

            {/* Hero Section */}
            <section className="hero-section" style={{ backgroundImage: `url('/images/homebg.png')` }}>
                <div className="hero-content">
                    <h1 className="typing-container">
                        <span className="typing-effect-line">"Berani coba fitur olahraga kami?"</span>
                        <br />
                        <span className="typing-effect-line">"Mulai sekarang, jadi yang terkuat!"</span>
                    </h1>
                    <div className="hero-button-container">
                        {/* Teks dan tombol berubah berdasarkan status login */}
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
