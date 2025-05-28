import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetail.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost/healty_life/backend/adminFood.php?id=${id}`
        );

        console.log("API Response:", response.data);

        // === FIX START ===
        if (response.data && typeof response.data === "object") {
          const item = response.data;

          // Parsing ingredients
          let parsedIngredients = [];
          if (typeof item.ingredients === "string") {
            try {
              parsedIngredients = JSON.parse(item.ingredients);
            } catch {
              parsedIngredients = [item.ingredients];
            }
          } else if (Array.isArray(item.ingredients)) {
            parsedIngredients = item.ingredients;
          }

          // Parsing tutorial
          let parsedTutorial = [];
          if (typeof item.tutorial === "string") {
            try {
              parsedTutorial = JSON.parse(item.tutorial);
            } catch {
              parsedTutorial = [item.tutorial];
            }
          } else if (Array.isArray(item.tutorial)) {
            parsedTutorial = item.tutorial;
          }

          setRecipe({
            ...item,
            ingredients: parsedIngredients,
            tutorial: parsedTutorial,
          });
        } else {
          console.warn("Data tidak ditemukan atau format tidak sesuai:", response.data);
          setError("Resep tidak ditemukan");
        }
        // === FIX END ===

      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Gagal memuat data resep");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p>Memuat data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <Navbar />
      <div className="recipeDetail">
        <button className="class-icon" onClick={() => window.history.back()}>
          X
        </button>
        <h2>{recipe.title}</h2>
        <div className="recipeInfo">
          <p>{recipe.calories} kalori</p>
        </div>
        <div className="recipeImage">
          <img src={recipe.image} alt={recipe.title} />
        </div>
        <div className="recipeContent">
          <h3>Resep</h3>
          <ul>
            {(recipe.ingredients || []).map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Cara Pembuatan</h3>
          <ol>
            {(recipe.tutorial || []).map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
};

export default RecipeDetail;
