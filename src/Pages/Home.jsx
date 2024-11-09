// Home.jsx
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar'; // pastikan path sudah benar
import './Home.css';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
    useEffect(() => {
        AOS.init({
          duration: 1500, // Durasi animasi dalam milidetik
          offset: 200, // Offset untuk memulai animasi
          easing: 'ease-in-out', // Jenis easing animasi
          once: true, // Animasi hanya terjadi sekali saat scroll
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
        <h1>
        "Berani coba fitur olahraga kami? <br />
        Mulai sekarang, jadi yang terkuat!"
        </h1>
        <button className="hero-button">Mulai Olahraga</button>
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
