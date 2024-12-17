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
import Pagination from "../../components/Pagination/Pagination"; // Import Pagination

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [articles, setArticles] = useState([]); // State untuk artikel
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman aktif
  const articlesPerPage = 5; // Jumlah artikel per halaman
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

    // Initialize Swiper after the component mounts
    const slides = document.querySelectorAll(".swiper-slide");
    let currentIndex = 0;

    // Function to show the current slide
    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? "flex" : "none";
      });
    };

    // Show the first slide
    showSlide(currentIndex);

    // Next and Previous buttons
    const nextButton = document.querySelector(".swiper-button-next");
    const prevButton = document.querySelector(".swiper-button-prev");

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });

    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });
  }, []);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter articles based on current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Function to handle button click
  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate("/olahraga"); // Navigate to Olahraga page if logged in
    } else {
      navigate("/sign-up"); // Navigate to Get Started (sign-up) page if not logged in
    }
  };

  // Function to handle "Buat Makanan" click
  const handleBuatMakananClick = () => {
    navigate("/makanan"); // Navigate to the /makanan page
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
              style={{ backgroundImage: `url('/images/Homebg.png')` }}
            >
              <div className="hero-content">
                <h1 className="typing-container">
                  <span className="typing-effect-line">
                    Berani coba fitur olahraga kami?
                  </span>
                  <br />
                  <span className="typing-effect-line">
                    Mulai sekarang, jadi yang terkuat!
                  </span>
                </h1>
                <div className="hero-button-container">
                  <button className="hero-button" onClick={handleButtonClick}>
                    {isLoggedIn ? "Mulai Olahraga" : "Get Started"}
                  </button>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              style={{ backgroundImage: `url('/images/Images1.jpg')` }}
            >
              <div className="hero-content">
                <h1 className="typing-container">
                  <span className="typing-effect-line">
                    Nikmati makanan sehat setiap hari!
                  </span>
                  <br />
                  <span className="typing-effect-line">
                    Mulai perjalanan sehatmu bersama kami!
                  </span>
                </h1>
                <div className="hero-button-container">
                  <button
                    className="hero-button"
                    onClick={handleBuatMakananClick}
                  >
                    {isLoggedIn ? "Buat Makanan" : "Get Started"}
                  </button>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              style={{ backgroundImage: `url('/images/Images2.jpg')` }}
            >
              <div className="hero-content">
                <h1 className="typing-container">
                  <span className="typing-effect-line">
                    Ayo, mulai pola hidup sehat sekarang!
                  </span>
                  <br />
                  <span className="typing-effect-line">
                    Jadilah versi terbaik dari dirimu!
                  </span>
                </h1>
                <div className="hero-button-container">
                  <button className="hero-button" onClick={handleButtonClick}>
                    {isLoggedIn ? "Anda sudah login" : "Anda sudah login"}
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
        {currentArticles.length > 0 ? (
          currentArticles.map((article) => (
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
        {/* Pagination */}

      </section>
      <Footer />
    </main>
  );
}
