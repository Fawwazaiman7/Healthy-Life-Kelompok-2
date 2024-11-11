import React from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetail.css';
import Navbar from '../components/Navbar/Navbar';
import { foodItems } from '../data/foodData'; // Pastikan path sesuai dengan struktur direktori Anda

const RecipeDetail = () => {
  const { id } = useParams(); // Mengambil parameter ID dari URL
  const recipe = foodItems.find((item) => item.id === id); // Menemukan resep berdasarkan ID

  if (!recipe) {
    return <p>Recipe not found</p>; // Menampilkan pesan jika resep tidak ditemukan
  }

  return (
    <main>
      <Navbar />
      <div className="recipeDetail">
        <h2>{recipe.title}</h2>
        <div className="recipeInfo">
          <p>{recipe.time} | {recipe.calories}</p>
        </div>
        <div className="recipeImage">
          <img src={recipe.image} alt={recipe.title} />
        </div>
        <div className="recipeContent">
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Tutorial</h3>
          <p>{recipe.tutorial}</p>
        </div>
      </div>
    </main>
  );
};

export default RecipeDetail;


