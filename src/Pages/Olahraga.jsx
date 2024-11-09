import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import 'aos/dist/aos.css';
import './Olahraga.css';
import WeeklyChallenge from '../components/WeeklyChallenge/WeeklyChallenge';
import ExerciseCard from '../components/ExerciseCard/ExerciseCard'; 

const Olahraga = () => {
    // Inisialisasi daftar latihan
    const exercises = [
        {
            title: 'Plank',
            time: '10 Minutes',
            calories: '30 Cal',
            image: '/images/plank.png',
        },
        {
            title: 'Bicycle Crunch',
            time: '10 Minutes',
            calories: '35 Cal',
            image: '/images/bicycle-crunch.png', 
        },
        {
            title: 'Mountain Climber',
            time: '10 Minutes',
            calories: '50 Cal',
            image: '/images/mountain-climber.png', 
        },
        {
            title: 'Plank',
            time: '10 Minutes',
            calories: '30 Cal',
            image: '/images/plank.png',
        },
        {
            title: 'Bicycle Crunch',
            time: '10 Minutes',
            calories: '35 Cal',
            image: '/images/bicycle-crunch.png', 
        },
        {
            title: 'Mountain Climber',
            time: '10 Minutes',
            calories: '50 Cal',
            image: '/images/mountain-climber.png', 
        },
        {
            title: 'Plank',
            time: '10 Minutes',
            calories: '30 Cal',
            image: '/images/plank.png',
        },
        {
            title: 'Bicycle Crunch',
            time: '10 Minutes',
            calories: '35 Cal',
            image: '/images/bicycle-crunch.png', 
        },
        {
            title: 'Mountain Climber',
            time: '10 Minutes',
            calories: '50 Cal',
            image: '/images/mountain-climber.png', 
        },
        {
            title: 'Plank',
            time: '10 Minutes',
            calories: '30 Cal',
            image: '/images/plank.png',
        },
        {
            title: 'Bicycle Crunch',
            time: '10 Minutes',
            calories: '35 Cal',
            image: '/images/bicycle-crunch.png', 
        },
        {
            title: 'Mountain Climber',
            time: '10 Minutes',
            calories: '50 Cal',
            image: '/images/mountain-climber.png', 
        },
    ];

    return (
        <main>
            <Navbar />
            <WeeklyChallenge />

            {/* Section for Exercise Cards */}
            <section className="exercise-section">
                <h2 className="exercise-title">Exercise Recommendation</h2>
                <div className="exercise-cards">
                    {exercises.map((exercise, index) => (
                        <ExerciseCard
                            key={index}
                            title={exercise.title}
                            time={exercise.time}
                            calories={exercise.calories}
                            image={exercise.image}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Olahraga;

