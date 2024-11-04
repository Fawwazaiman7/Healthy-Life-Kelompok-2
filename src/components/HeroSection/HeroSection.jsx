import React from 'react';
import { Carousel } from 'react-bootstrap';
import './HeroSection.css';
import heroImage1 from '../../assets/Images/HeroSection1.jpg';
import heroImage2 from '../../assets/Images/HeroSection2.jpg';
import heroImage3 from '../../assets/Images/HeroSection3.png';

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1>Berani coba fitur olahraga kami? <br /> Mulai sekarang, jadi yang terkuat!</h1>
                <a href="/getstarted" className="hero-btn">Gabung Sekarang</a>
            </div>
            <div className="hero-image">
                <Carousel indicators={false} controls={true}>
                    <Carousel.Item>
                        <img src={heroImage1} alt="Hero 1" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={heroImage2} alt="Hero 2" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={heroImage3} alt="Hero 3" />
                    </Carousel.Item>
                </Carousel>
            </div>
        </section>
    );
};

export default HeroSection;
