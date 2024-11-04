import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './FoodDetailModal.css';

const FoodDetailModal = ({ food, onClose }) => {
    useEffect(() => {
        AOS.init({ duration: 500, once: true });
    }, []);

    if (!food) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                data-aos="zoom-in"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="close-button" onClick={onClose}>X</button>
                <h2 className="modal-title" data-aos="fade-down" data-aos-delay="200">
                    {food.title}
                </h2>
                <p className="modal-info" data-aos="fade-up" data-aos-delay="400">
                    {food.duration} | {food.calories}
                </p>
                
                <img src={food.imageUrl} alt={food.title} className="modal-image" data-aos="zoom-in" data-aos-delay="600" />

                <div className="modal-section" data-aos="fade-right" data-aos-delay="800">
                    <h3>Ingredients</h3>
                    <ul>
                        {food.ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="modal-section" data-aos="fade-left" data-aos-delay="1000">
                    <h3>Tutorial</h3>
                    <p>{food.tutorial}</p>
                </div>
            </div>
        </div>
    );
};

export default FoodDetailModal;
