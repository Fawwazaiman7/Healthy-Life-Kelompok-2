import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Article.css';

const Article = ({ title, content, imageUrl, link }) => {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    return (
        <div className="article" data-aos="flip-up">
            <img src={imageUrl} alt={title} className="article-image" />
            <div className="article-content">
                <h3>{title}</h3>
                <p>{content}</p>
                <a href={link}>See More</a>
            </div>
        </div>
    );
};

export default Article;
