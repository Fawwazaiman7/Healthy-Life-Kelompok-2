import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import './RecipeDetail.css';
import Navbar from '../components/Navbar/Navbar';
import { foodItems } from '../data/foodData'; // Pastikan path sesuai dengan struktur direktori Anda

const RecipeDetail = () => {
  const { id } = useParams(); // Mengambil parameter ID dari URL
  const recipe = foodItems.find((item) => item.id === id); // Menemukan resep berdasarkan ID
  const navigate = useNavigate(); // Inisialisasi useNavigate untuk navigasi

  if (!recipe) {
    return <p>Recipe not found</p>; // Menampilkan pesan jika resep tidak ditemukan
  }

  const handleClose = () => {
    navigate(-1); // Mengarahkan pengguna kembali ke halaman sebelumnya
  };

  return (
    <main>
      <Navbar />
      <div className="recipeDetail">
        <button className="close-btn" onClick={handleClose}>X</button> {/* Tombol X */}
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
