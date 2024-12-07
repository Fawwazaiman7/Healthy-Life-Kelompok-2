import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ArticleCard from '../ArticleCard/ArticleCard';
import FeatureCards from '../FeatureCards/FeatureCards';
import Footer from '../../components/Footer/Footer'; // Impor Footer
import articles from '../../data/articleData';
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

        // Initialize Swiper after the component mounts
        const swiperContainer = document.querySelector('.swiper-container');
        new window.Swiper(swiperContainer, {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            spaceBetween: 30,
            slidesPerView: 1,
        });
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

            {/* Hero Section with Swiper */}
            <section className="hero-section">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide" style={{ backgroundImage: `url('/images/homebg.png')` }}>
                            <div className="hero-content">
                                <h1 className="typing-container">
                                    <span className="typing-effect-line">"Berani coba fitur olahraga kami?"</span>
                                    <br />
                                    <span className="typing-effect-line">"Mulai sekarang, jadi yang terkuat!"</span>
                                </h1>
                                <div className="hero-button-container">
                                    <button className="hero-button" onClick={handleButtonClick}>
                                        {isLoggedIn ? 'Mulai Olahraga' : 'Get Started'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide" style={{ backgroundImage: `url('/images/Images1.jpg')` }}>
                            <div className="hero-content">
                                <h1 className="typing-container">
                                    <span className="typing-effect-line">"Nikmati makanan sehat setiap hari!"</span>
                                    <br />
                                    <span className="typing-effect-line">"Mulai perjalanan sehatmu bersama kami!"</span>
                                </h1>
                                <div className="hero-button-container">
                                    <button className="hero-button" onClick={handleButtonClick}>
                                        {isLoggedIn ? 'Mulai Olahraga' : 'Get Started'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide" style={{ backgroundImage: `url('/images/Images2.jpg')` }}>
                            <div className="hero-content">
                                <h1 className="typing-container">
                                    <span className="typing-effect-line">"Ayo, mulai pola hidup sehat sekarang!"</span>
                                    <br />
                                    <span className="typing-effect-line">"Jadilah versi terbaik dari dirimu!"</span>
                                </h1>
                                <div className="hero-button-container">
                                    <button className="hero-button" onClick={handleButtonClick}>
                                        {isLoggedIn ? 'Mulai Olahraga' : 'Get Started'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Navigasi Swiper */}
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
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

            <Footer /> {/* Menambahkan Footer di sini */}
        </main>
    );
}
