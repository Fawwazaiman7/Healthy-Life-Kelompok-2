// src/Pages/About.jsx
import React from 'react';
import './About.css'; // Mengimpor CSS
import Navbar from '../../components/Navbar/Navbar'; // Impor Navbar
import Footer from '../../components/Footer/Footer'; // Impor Footer
import Logo from '../../assets/Images/Logo.jpg'; // Pastikan jalur ini benar

const About = () => {
    return (
        <>
            <Navbar /> {/* Menambahkan Navbar di atas konten */}
            <div className="about-container">
                <div className="about-content">
                    <h1>Selamat datang di Healthy Life!</h1>
                    <p>
                        Di Healthy Life, kami percaya bahwa kesehatan adalah fondasi dari kebahagiaan dan kesuksesan. 
                    </p>
                    <p>
                        Kami hadir untuk membantu Anda menjalani gaya hidup yang lebih sehat dan aktif dengan berbagai pilihan makanan bergizi yang lezat.
                    </p>
                    <p>
                        Temukan program olahraga yang dirancang khusus untuk memenuhi kebutuhan Anda, dari pemula hingga yang berpengalaman.
                    </p>
                    <p>
                        Dengan fitur pemantauan AKG harian, Anda dapat dengan mudah melacak asupan nutrisi dan kalori, sehingga setiap langkah menuju kesehatan lebih terarah.
                    </p>
                    <p>
                        Bergabunglah dengan komunitas kami dan jadikan perjalanan kesehatan Anda lebih menyenangkan dan inspiratif!
                    </p>
                    <p>Let’s #GetHealthyWithUs dan capai potensi terbaik Anda!</p>
                </div>
                <div className="about-image">
                    <img src={Logo} alt="Healthy Life" /> {/* Menggunakan variabel Logo */}
                </div>
            </div>
            <Footer /> {/* Menambahkan Footer di bawah konten */}
        </>
    );
};

export default About;
