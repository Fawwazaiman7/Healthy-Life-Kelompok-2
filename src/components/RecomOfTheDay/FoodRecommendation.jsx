import './FoodRecommendation.css';

export default function FoodRecommendation() {
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
      <div className="foodContainer">
        
        {/* Image */}
        <img
          src="/images/juswortel.png"  // Replace with your image path
          alt="Jus Wortel Susu Mantap"
          className="image"
        />

        {/* Recommendation Label */}
        <div className="label">
          Recommendation Of The Day
        </div>
        
        {/* Text Content */}
        <div className="overlay">
          <h3 className="foodTitle">Jus Wortel Susu Mantap</h3>
          <div className="details">
            <span className="detailItem">
              ⏱ 10 Minutes
            </span>
            <span className="detailItem">
              🔥 70 Cal
            </span>
          </div>
        </div>

        
      </div>
    </div>
  );
}

  