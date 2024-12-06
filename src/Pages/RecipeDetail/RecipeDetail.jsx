import React from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetail.css';
import Navbar from '../../components/Navbar/Navbar';
import { foodItems } from '../../data/foodData';

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = foodItems.find((item) => item.id === id);

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <main>
      <Navbar />
      <div className="recipeDetail">
        <button className="class-icon" onClick={() => window.history.back()}>
          X
        </button> {/* Tombol silang */}
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
