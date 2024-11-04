// src/Pages/TutorOlahraga.jsx

import React from 'react';
import './TutorOlahraga.css';

const TutorOlahraga = ({ exercise, closePopup }) => {
    return (
        <div className="popup">
            <div className="popup-content" data-aos="zoom-in" data-aos-duration="500">
                <button className="close-icon" onClick={closePopup}>✕</button>
                <h2>{exercise.title}</h2>
                <p>{exercise.tutorial}</p>
                <p>Berikut ini adalah tutorial singkat mengenai latihan {exercise.title}. Silakan tonton video ini untuk memahami teknik yang benar!</p>
                <a href={exercise.youtubeLink} target="_blank" rel="noopener noreferrer" className="youtube-link">Watch on YouTube</a>
            </div>
        </div>
    );
};

export default TutorOlahraga;


