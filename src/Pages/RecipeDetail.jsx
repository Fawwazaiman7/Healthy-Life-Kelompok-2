import React from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetail.css';
import Navbar from '../components/Navbar/Navbar';

const recipes = [
    {
        id: '1',
        title: 'Oseng Oseng Salmon',
        time: '35 Minutes',
        calories: '350 Cal',
        image: '/images/salmon.png',
        ingredients: [
          '200g salmon fillet',
          '1 tbsp olive oil',
          'Salt and pepper to taste',
          '1 clove garlic, minced',
          '1/2 onion, sliced',
          'Vegetables for garnish (green beans, carrots)',
        ],
        tutorial: 'Pan-fry the salmon with olive oil, garlic, and onions until golden brown. Add vegetables and cook until tender. Serve warm.',
      },
      {
        id: '2',
        title: 'Ayam Bakar Madu',
        time: '45 Minutes',
        calories: '400 Cal',
        image: '/images/ayam_bakar.png',
        ingredients: [
          '500g chicken thighs',
          '2 tbsp honey',
          '1 tbsp soy sauce',
          '1 tbsp oyster sauce',
          '1 clove garlic, minced',
          'Salt and pepper to taste',
        ],
        tutorial: 'Marinate chicken with honey, soy sauce, oyster sauce, and garlic. Grill until fully cooked and caramelized. Serve with rice and vegetables.',
      },
      {
        id: '3',
        title: 'Gado-Gado',
        time: '25 Minutes',
        calories: '250 Cal',
        image: '/images/gado_gado.png',
        ingredients: [
          '1 cucumber, sliced',
          '1 carrot, sliced',
          '1 potato, boiled and diced',
          'A handful of bean sprouts',
          '2 hard-boiled eggs',
          '200g tofu, fried and diced',
          'Peanut sauce for serving',
        ],
        tutorial: 'Arrange all ingredients on a plate and drizzle with peanut sauce. Serve fresh with rice cakes or fried crackers.',
      },
      {
        id: '4',
        title: 'Soto Ayam',
        time: '30 Minutes',
        calories: '300 Cal',
        image: '/images/soto_ayam.png',
        ingredients: [
          '500g chicken breast, boiled and shredded',
          '1 stalk lemongrass',
          '3 kaffir lime leaves',
          '1 tbsp turmeric powder',
          '1 clove garlic, minced',
          'Salt and pepper to taste',
        ],
        tutorial: 'Boil chicken with lemongrass, lime leaves, and turmeric until tender. Serve with rice, boiled eggs, and fried shallots.',
      },
      {
        id: '5',
        title: 'Nasi Goreng Kampung',
        time: '20 Minutes',
        calories: '450 Cal',
        image: '/images/nasi_goreng.png',
        ingredients: [
          '2 cups cooked rice',
          '1 clove garlic, minced',
          '1 tbsp soy sauce',
          '1 tbsp sweet soy sauce',
          'Salt and pepper to taste',
          '1 egg, fried',
          'Vegetables (optional)',
        ],
        tutorial: 'Stir-fry garlic until fragrant. Add rice, soy sauce, and sweet soy sauce, and mix well. Serve with a fried egg and garnish.',
      },
      {
        id: '6',
        title: 'Sate Ayam',
        time: '40 Minutes',
        calories: '360 Cal',
        image: '/images/sate_ayam.png',
        ingredients: [
          '500g chicken breast, diced',
          '1 tbsp soy sauce',
          '1 tbsp sweet soy sauce',
          '1 clove garlic, minced',
          'Salt and pepper to taste',
          'Peanut sauce for serving',
        ],
        tutorial: 'Marinate chicken with soy sauce, sweet soy sauce, and garlic. Grill on skewers until cooked through and serve with peanut sauce.',
      },
      {
        id: '7',
        title: 'Mie Goreng Spesial',
        time: '15 Minutes',
        calories: '500 Cal',
        image: '/images/mie_goreng.png',
        ingredients: [
          '1 pack instant noodles',
          '1 egg, fried',
          'Vegetables (carrots, cabbage)',
          '1 tbsp soy sauce',
          '1 tbsp sweet soy sauce',
          'Fried shallots for garnish',
        ],
        tutorial: 'Boil noodles until half-cooked. Stir-fry with vegetables, soy sauce, and sweet soy sauce. Top with a fried egg and fried shallots.',
      },
      {
        id: '8',
        title: 'Pecel Lele',
        time: '35 Minutes',
        calories: '380 Cal',
        image: '/images/pecel_lele.png',
        ingredients: [
          '1 whole catfish, cleaned',
          '1 tbsp turmeric powder',
          '1 clove garlic, minced',
          'Salt to taste',
          'Vegetables (cabbage, cucumber, basil leaves) for serving',
          'Chili sauce for dipping',
        ],
        tutorial: 'Rub catfish with turmeric, garlic, and salt. Deep-fry until crispy. Serve with fresh vegetables and chili sauce.',
      },
  ];
  
const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.id === id);

  if (!recipe) return <p>Recipe not found</p>;

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
