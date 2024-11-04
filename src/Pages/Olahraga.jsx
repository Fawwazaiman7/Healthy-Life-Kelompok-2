import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import TutorOlahraga from './TutorOlahraga';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Olahraga.css';

const Olahraga = () => {
    const exercises = [
        { title: 'Plank', imageUrl: '/assets/images/plank.jpg', duration: '10 Minutes', calories: '25 Kal', tutorial: 'Plank membantu memperkuat otot inti dan meningkatkan stabilitas tubuh.', youtubeLink: 'https://www.youtube.com/watch?v=PlankLink' },
        { title: 'Bicycle Crunch', imageUrl: '/assets/images/bicycle-crunch.jpg', duration: '10 Minutes', calories: '20 Kal', tutorial: 'Bicycle Crunch efektif untuk melatih otot perut dan meningkatkan keseimbangan.', youtubeLink: 'https://www.youtube.com/watch?v=BicycleCrunchLink' },
        { title: 'Mountain Climber', imageUrl: '/assets/images/mountain-climber.jpg', duration: '10 Minutes', calories: '30 Kal', tutorial: 'Mountain Climber adalah latihan kardio yang memperkuat otot kaki dan inti.', youtubeLink: 'https://www.youtube.com/watch?v=MountainClimberLink' },
        { title: 'Push-Up', imageUrl: '/assets/images/push-up.jpg', duration: '10 Minutes', calories: '15 Kal', tutorial: 'Push-Up adalah latihan dasar yang menguatkan otot dada, bahu, dan lengan.', youtubeLink: 'https://www.youtube.com/watch?v=PushUpLink' },
        { title: 'Sit-Up', imageUrl: '/assets/images/sit-up.jpg', duration: '10 Minutes', calories: '10 Kal', tutorial: 'Sit-Up membantu melatih otot perut dan meningkatkan fleksibilitas tubuh bagian atas.', youtubeLink: 'https://www.youtube.com/watch?v=SitUpLink' },
        { title: 'Squat', imageUrl: '/assets/images/squat.jpg', duration: '10 Minutes', calories: '25 Kal', tutorial: 'Squat meningkatkan kekuatan otot kaki, terutama paha dan glute.', youtubeLink: 'https://www.youtube.com/watch?v=SquatLink' },
        { title: 'Lunges', imageUrl: '/assets/images/lunges.jpg', duration: '10 Minutes', calories: '20 Kal', tutorial: 'Lunges bermanfaat untuk melatih keseimbangan, kekuatan kaki, dan stabilitas panggul.', youtubeLink: 'https://www.youtube.com/watch?v=LungesLink' },
        { title: 'Burpee', imageUrl: '/assets/images/burpee.jpg', duration: '10 Minutes', calories: '30 Kal', tutorial: 'Burpee adalah latihan full-body yang meningkatkan daya tahan dan kekuatan tubuh.', youtubeLink: 'https://www.youtube.com/watch?v=BurpeeLink' },
        { title: 'Jump Rope', imageUrl: '/assets/images/jump-rope.jpg', duration: '10 Minutes', calories: '50 Kal', tutorial: 'Jump Rope atau lompat tali sangat baik untuk kardio dan koordinasi tubuh.', youtubeLink: 'https://www.youtube.com/watch?v=JumpRopeLink' },
        { title: 'High Knees', imageUrl: '/assets/images/high-knees.jpg', duration: '10 Minutes', calories: '20 Kal', tutorial: 'High Knees meningkatkan kelincahan dan kekuatan kaki serta meningkatkan detak jantung.', youtubeLink: 'https://www.youtube.com/watch?v=HighKneesLink' },
        { title: 'Russian Twist', imageUrl: '/assets/images/russian-twist.jpg', duration: '10 Minutes', calories: '15 Kal', tutorial: 'Russian Twist memperkuat otot perut dan melatih rotasi tubuh.', youtubeLink: 'https://www.youtube.com/watch?v=RussianTwistLink' },
        { title: 'Plank to Push-Up', imageUrl: '/assets/images/plank-push-up.jpg', duration: '10 Minutes', calories: '25 Kal', tutorial: 'Plank to Push-Up adalah kombinasi plank dan push-up untuk melatih kekuatan otot inti dan lengan.', youtubeLink: 'https://www.youtube.com/watch?v=PlankPushUpLink' },
        { title: 'Side Plank', imageUrl: '/assets/images/side-plank.jpg', duration: '10 Minutes', calories: '20 Kal', tutorial: 'Side Plank fokus pada otot inti samping dan stabilitas tubuh.', youtubeLink: 'https://www.youtube.com/watch?v=SidePlankLink' },
        { title: 'Jumping Jack', imageUrl: '/assets/images/jumping-jack.jpg', duration: '10 Minutes', calories: '25 Kal', tutorial: 'Jumping Jack adalah latihan kardio yang meningkatkan daya tahan dan kelincahan.', youtubeLink: 'https://www.youtube.com/watch?v=JumpingJackLink' },
        { title: 'Deadlift', imageUrl: '/assets/images/deadlift.jpg', duration: '10 Minutes', calories: '40 Kal', tutorial: 'Deadlift meningkatkan kekuatan otot punggung bawah dan glute.', youtubeLink: 'https://www.youtube.com/watch?v=DeadliftLink' },
    ];

    const [showPopup, setShowPopup] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);

    // Inisialisasi AOS dengan once: true dan delay lebih cepat
    useEffect(() => {
        AOS.init({ duration: 500, once: true });
    }, []);

    const handlePlayClick = (exercise) => {
        setSelectedExercise(exercise);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedExercise(null);
    };

    return (
        <>
            <Navbar />
            
            <div className="olahraga-page">
                <h1 className="olahraga-title" data-aos="zoom-in" data-aos-delay="100">
                    Rekomendasi Olahraga
                </h1>

                {/* Weekly Challenge Section */}
                <div className="weekly-challenge">
                    <h2 className="challenge-title" data-aos="zoom-in" data-aos-delay="100">
                        <span>Weekly</span><br />
                        <span>Challenge</span>
                    </h2>
                    <div className="challenge-grid">
                        {exercises.slice(0, 2).map((exercise, index) => (
                            <div 
                                className="challenge-card" 
                                key={index} 
                                data-aos="zoom-in" 
                                data-aos-delay={index * 100} // Delay lebih cepat
                            >
                                <img src={exercise.imageUrl} alt={exercise.title} className="challenge-image" />
                                <h3 className="challenge-exercise-title">{exercise.title}</h3>
                                <p className="challenge-exercise-info">{exercise.duration} | {exercise.calories}</p>
                                <button className="play-button" onClick={() => handlePlayClick(exercise)}>Play</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grid untuk Latihan */}
                <div className="olahraga-grid">
                    {exercises.map((exercise, index) => (
                        <div 
                            className="exercise-card" 
                            key={index} 
                            data-aos="zoom-in" 
                            data-aos-delay={index * 50} // Delay lebih cepat
                        >
                            <img src={exercise.imageUrl} alt={exercise.title} className="exercise-image" />
                            <h3 className="exercise-title">{exercise.title}</h3>
                            <p className="exercise-info">{exercise.duration} | {exercise.calories}</p>
                            <button className="play-button" onClick={() => handlePlayClick(exercise)}>Play</button>
                        </div>
                    ))}
                </div>

                {/* Popup untuk Tutorial */}
                {showPopup && selectedExercise && (
                    <TutorOlahraga 
                        exercise={selectedExercise} 
                        closePopup={closePopup}
                    />
                )}
            </div>
        </>
    );
};

export default Olahraga;
