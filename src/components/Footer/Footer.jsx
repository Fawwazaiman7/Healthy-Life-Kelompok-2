// components/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Mengimpor Link dari react-router-dom
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Kontak</h3>
                    <p>Healthy Life 0819-6035-555</p>
                    <p>Jl. Sehat No.19, RT.9/RW.7, Petojo Utara,</p>
                    <p>Kecamatan Gambir, Kota Jakarta Pusat,</p>
                    <p>Daerah Khusus Ibukota Jakarta 10130</p>
                </div>
                <div className="footer-section">
                    <h3>Tentang Kami</h3>
                    <p><Link to="/about">Tentang Healthy Life</Link></p> {/* Menggunakan Link */}
                </div>
                <div className="footer-section">
                    <h3>Terhubung</h3>
                    <p>Ikuti kami di media sosial:</p>
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
                <p>Jelajahi dunia makanan sehat, temukan pola olahraga yang tepat, dan pantau AKG Anda dengan mudah!</p>
                <p>Bergabunglah dengan kami untuk mendapatkan tips dan informasi terkini demi hidup yang lebih sehat.</p>
                <p>&copy; {new Date().getFullYear()}, Healthy Life</p>
            </div>
        </footer>
    );
};

export default Footer;
