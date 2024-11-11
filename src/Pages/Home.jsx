// Home.jsx
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import './Home.css';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
            <section
                className="hero-section"
                style={{ backgroundImage: `url('/images/homebg.png')` }}
            >
                <div className="hero-content">
                    <h1 className="typing-container">
                    <span className="typing-effect-line">"Berani coba fitur olahraga kami?"</span>
                    <br />
                    <span className="typing-effect-line">"Mulai sekarang, jadi yang terkuat!"</span>
                </h1>

                    <div className="hero-button-container">
                        <button className="hero-button">Get Started</button>
                    </div>
                </div>
            </section>

            {/* Fitur Cards */}
            <section className="features-section">
                <div className="feature-card">
                    <h3>Kalkulator Berat Ideal</h3>
                    <p>(Gimmick penjelasan fitur)</p>
                    <a href="kalkulator">Lihat selengkapnya &rarr;</a>
                </div>
                <div className="feature-card">
                    <h3>Rekomendasi Olahraga</h3>
                    <p>(Gimmick penjelasan fitur)</p>
                    <a href="olahraga">Lihat selengkapnya &rarr;</a>
                </div>
                <div className="feature-card">
                    <h3>Resep Makanan Diet</h3>
                    <p>(Gimmick penjelasan fitur)</p>
                    <a href="makanan">Lihat selengkapnya &rarr;</a>
                </div>
            </section>

            {/* Artikel Section */}
            <section className="articles-section">
                <ArticleCard
                    title="(CONTOH ARTIKEL)"
                    description="Ini adalah deskripsi singkat dari artikel pertama yang menjelaskan konten artikel..."
                    imageUrl="/images/artikel1.png"
                    link="#"
                />
                <ArticleCard
                    title="(CONTOH ARTIKEL)"
                    description="Deskripsi singkat dari artikel kedua yang memberikan gambaran konten artikel..."
                    imageUrl="/images/artikel2.png"
                    link="#"
                />
                <ArticleCard
                    title="(CONTOH ARTIKEL)"
                    description="Ini adalah deskripsi singkat dari artikel pertama yang menjelaskan konten artikel..."
                    imageUrl="/images/artikel1.png"
                    link="#"
                />
                <ArticleCard
                    title="(CONTOH ARTIKEL)"
                    description="Deskripsi singkat dari artikel kedua yang memberikan gambaran konten artikel..."
                    imageUrl="/images/artikel2.png"
                    link="#"
                />
            </section>
        </main>
    );
}
