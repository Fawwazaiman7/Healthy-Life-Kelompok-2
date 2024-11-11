import './FoodRecommendation.css';
import { Link } from 'react-router-dom';
import { foodItems } from '../../data/foodData'; // Pastikan path sesuai dengan struktur direktori Anda

export default function FoodRecommendation() {
  // Pilih satu makanan tertentu (misalnya, item pertama dalam array)
  const recommendedFood = foodItems[Math.floor(Math.random() * foodItems.length)];

  return (
    <div className="container">
      {/* Title */}
      <h2 className="title">
        Food
        <br />
        Recommendation
        <br />
        Of The Day
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
        <div className="label">
          Recommendation Of The Day
        </div>

        {/* Text Content */}
        <div className="overlay">
          <h3 className="foodTitle">{recommendedFood.title}</h3>
          <div className="details">
            <span className="detailItem">
              ⏱ {recommendedFood.time}
            </span>
            <span className="detailItem">
              🔥 {recommendedFood.calories}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}



  