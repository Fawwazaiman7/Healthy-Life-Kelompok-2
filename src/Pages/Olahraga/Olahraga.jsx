// src/Pages/Olahraga.jsx
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import 'aos/dist/aos.css';
import './Olahraga.css';
import WeeklyChallenge from '../WeeklyChallenge/WeeklyChallenge';
import ExerciseCard from '../ExerciseCard/ExerciseCard'; 
import exercises from '../../data/exerciseData'; // Import exercise data
import Footer from '../../components/Footer/Footer'; // Impor Footer

const Olahraga = () => {
    return (
        <main>
            <Navbar />
            <WeeklyChallenge />

            {/* Section for Exercise Cards */}
            <section className="exercise-section">
                <h2 className="olahraga-title">Exercise Recommendation</h2>
                <div className="exercise-cards">
                    {exercises.map((exercise) => (
                        <ExerciseCard
                            key={exercise.id}
                            title={exercise.title}
                            time={exercise.time}
                            calories={exercise.calories}
                            image={exercise.image}
                        />
                    ))}
                </div>
            </section>

            {/* Tambahkan Footer di sini */}
            <Footer />
        </main>
    );
};

export default Olahraga;
