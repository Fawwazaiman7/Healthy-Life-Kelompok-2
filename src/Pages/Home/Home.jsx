import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ArticleCard from "../ArticleCard/ArticleCard";
import FeatureCards from "../FeatureCards/FeatureCards";
import Footer from "../../components/Footer/Footer"; // Impor Footer
import axios from "axios"; // Impor axios untuk fetch data
import AOS from "aos";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "aos/dist/aos.css";
import "./Home.css";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [articles, setArticles] = useState([]); // State untuk artikel
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1500,
      offset: 200,
      easing: "ease-in-out",
      once: true,
    });

    // Check login status from localStorage
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");

    // Fetch articles from backend
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/healthy_life_api/backend/articles.php"
        );
        if (response.data.success) {
          setArticles(response.data.data); // Simpan data artikel ke state
        } else {
          console.error("Gagal mendapatkan artikel:", response.data.message);
        }
      } catch (error) {
        console.error("Error saat fetch artikel:", error);
      }
    };

    fetchArticles();
  }, []);

  // Function to handle button click
  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate("/olahraga"); // Navigate to Olahraga page if logged in
    } else {
      navigate("/sign-up"); // Navigate to Get Started (sign-up) page if not logged in
    }
  };

  return (
    <main>
      <Navbar />
      {/* Hero Section with Swiper */}
      <section className="hero-section">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <div
              className="swiper-slide"
              style={{ backgroundImage: `url('/images/homebg.png')` }}
            >
              <div className="hero-content">
                <h1 className="typing-container">
                  <span className="typing-effect-line">
                    "Berani coba fitur olahraga kami?"
                  </span>
                  <br />
                  <span className="typing-effect-line">
                    "Mulai sekarang, jadi yang terkuat!"
                  </span>
                </h1>
                <div className="hero-button-container">
                  <button className="hero-button" onClick={handleButtonClick}>
                    {isLoggedIn ? "Mulai Olahraga" : "Get Started"}
                  </button>
                </div>
              </div>
            </div>
            {/* Slide lainnya */}
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
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              imageUrl={article.image}
              link={`/article/${article.id}`}
            />
          ))
        ) : (
          <p>Tidak ada artikel yang tersedia.</p>
        )}
      </section>
      <Footer /> {/* Menambahkan Footer di sini */}
    </main>
  );
}
