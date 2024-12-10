import React, { useEffect, useState } from "react";
import "./FoodRecommendation.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function FoodRecommendation() {
  const [recommendedFood, setRecommendedFood] = useState(null);

  // Fetch food data from the backend
  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/healthy_life_api/backend/adminfood.php"
        );
        const foods = response.data;

        if (foods && foods.length > 0) {
          // Randomly select one food item
          const randomFood = foods[Math.floor(Math.random() * foods.length)];
          setRecommendedFood(randomFood);
        }
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchFoodData();
  }, []);

  if (!recommendedFood) {
    return <p>Loading recommendation...</p>; // Show a loading message while fetching data
  }

  return (
    <div className="container">
      {/* Title */}
      <h2 className="title">
        Rekomendasi
        <br />
        Makanan
        <br />
        Hari Ini
      </h2>

      {/* Featured Food Section */}
      <Link to={`/recipe/${recommendedFood.id}`} className="foodContainer">
        {/* Image */}
        <img
          src={recommendedFood.image}
          alt={recommendedFood.title}
          className="image"
        />

        {/* Recommendation Label */}
        <div className="label">Rekomendasi Makanan Hari Ini</div>

        {/* Text Content */}
        <div className="overlay">
          <h3 className="foodTitle">{recommendedFood.title}</h3>
          <div className="details">
            <span className="detailItem">
              🔥 {recommendedFood.calories} kalori
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
