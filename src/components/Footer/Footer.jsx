// components/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Kontak</h3>
                    <p>0819-6035-555</p>
                    <p>Jl. Sehat No.19, Jakarta Pusat</p>
                </div>
                <div className="footer-section">
                    <h3>Tentang Kami</h3>
                    <p><Link to="/about">Tentang Healthy Life</Link></p>
                </div>
                <div className="footer-section">
                    <h3>Terhubung</h3>
                    <p>Media sosial:</p>
                    <div className="social-icons">
                        <a href="https://facebook.com">
                            <img src="/images/fb.png" alt="Facebook" />
                        </a>
                        <a href="https://instagram.com">
                            <img src="/images/ig.png" alt="Instagram" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Jelajahi makanan sehat dan pola olahraga yang tepat!</p>
                <p>&copy; {new Date().getFullYear()}, Healthy Life</p>
            </div>
        </footer>
    );
};

export default Footer;
