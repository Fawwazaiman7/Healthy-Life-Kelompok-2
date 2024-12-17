import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Makanan.css";
import FoodRecommendation from "../RecomOfTheDay/FoodRecommendation";
import FoodCard from "../FoodCard/FoodCard";
import Footer from "../../components/Footer/Footer";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Makanan = () => {
  const [foodItems, setFoodItems] = useState([]); // Semua data makanan
  const [filteredFoodItems, setFilteredFoodItems] = useState([]); // Data makanan setelah filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const location = useLocation();

  // Fetch awal data makanan
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/healthy_life_api/backend/adminfood.php"
        );
        setFoodItems(response.data); // Set data awal untuk semua item
        setFilteredFoodItems(response.data); // Default, tampilkan semua item
        console.log("All food items:", response.data); // Debug: Log data setelah fetch
        setLoading(false);
      } catch (err) {
        console.error("Error fetching food items:", err);
        setError("Failed to fetch food items. Please try again later.");
        setLoading(false);
      }
    };
    fetchFoodItems();
  }, []);

  // Update filteredFoodItems berdasarkan query parameter
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query) {
      // Jika ada query, filter berdasarkan judul
      const filtered = foodItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFoodItems(filtered);
      setCurrentPage(1); // Reset ke halaman pertama
      console.log("Filtered items for query:", query, filtered); // Debug: Log hasil filter
    } else {
      // Jika tidak ada query, tampilkan semua item
      setFilteredFoodItems(foodItems);
    }
  }, [location.search, foodItems]);

  // Logika pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFoodItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    console.log("Current items on this page:", currentItems); // Debug: Log current items
  }, [currentItems]);

  if (loading) return <p>Loading food items...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <Navbar />
      <FoodRecommendation />
      <div className="makanan-grid">
        {currentItems.length === 0 ? (
          <p>Data tidak ditemukan untuk pencarian ini.</p>
        ) : (
          currentItems.map((food) => (
            <FoodCard
              key={food.id}
              id={food.id}
              title={food.title}
              calories={food.calories}
              image={food.image}
            />
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={filteredFoodItems.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <Footer />
    </main>
  );
};

export default Makanan;
