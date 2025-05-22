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
        console.log("API Response:", response.data); // Log respons API

        if (response.data && response.data.id) {
          // Parsing jika data berbentuk string JSON
          const parsedIngredients = JSON.parse(
            response.data.ingredients || "[]"
          );
          const parsedTutorial = JSON.parse(response.data.tutorial || "[]");

          setRecipe({
            ...response.data,
            ingredients: parsedIngredients,
            tutorial: parsedTutorial,
          });
        } else {
          setError("Resep tidak ditemukan");
        }
      } catch (err) {
        console.error("Error fetching recipe:", err); // Log error untuk debugging
        setError("Gagal memuat data resep");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <p>Memuat data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Resep tidak ditemukan.</p>;
  }

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
            {Array.isArray(recipe.ingredients) &&
              recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
          </ul>
          <h3>Cara Pembuatan</h3>
          <ol>
            {Array.isArray(recipe.tutorial) &&
              recipe.tutorial.map((step, index) => <li key={index}>{step}</li>)}
          </ol>
        </div>
      </div>
    </main>
  );
};

export default RecipeDetail;
