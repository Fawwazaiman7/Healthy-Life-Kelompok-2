// File: src/Pages/Kalkulator.jsx
import React, { useState } from 'react';
import './Kalkulator.css';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios'; // Import Axios untuk HTTP request

function Kalkulator() {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [bmiCategory, setBmiCategory] = useState('');
    const [idealWeightRange, setIdealWeightRange] = useState('');
    const [showResult, setShowResult] = useState(false);

    // Fungsi untuk menghitung BMI dengan backend
    const calculateBMIWithBackend = async () => {
        try {
            // Kirim data ke backend
            const response = await axios.post('http://localhost/healthy_life_api/kalkulator.php', {
                age,
                gender,
                height,
                weight,
            });

            // Tangani respons dari backend
            if (response.data.success) {
                setBmi(response.data.bmi);
                setBmiCategory(response.data.bmiCategory);
                setIdealWeightRange(response.data.idealWeightRange);
                setShowResult(true);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error calculating BMI:', error);
            alert('Terjadi kesalahan saat menghitung BMI.');
        }
    };

    const handleCalculate = (e) => {
        e.preventDefault();
        calculateBMIWithBackend(); // Gunakan backend untuk kalkulasi
    };

    const resetForm = () => {
        setAge('');
        setGender('male');
        setHeight('');
        setWeight('');
        setBmi(null);
        setBmiCategory('');
        setIdealWeightRange('');
        setShowResult(false);
    };

    return (
        <div className="page-background">
            <Navbar />
            <div className="kalkulator-container">
                {showResult ? (
                    <div className="result-section">
                        <h2>BMI Kamu <span className="bmi-value">{bmi}</span></h2>
                        <p className="bmi-category">{bmiCategory}</p>
                        <div className="bmi-chart">
                            {/* Gambar kategori BMI */}
                            <img src="path_to_bmi_chart_image" alt="BMI Chart" />
                        </div>
                        <p className="ideal-weight-range">{idealWeightRange}</p>
                        <ul className="advice-list">
                            <li>Pertahankan pola makan sehat dan seimbang.</li>
                            <li>Lakukan aktivitas fisik minimal 3 kali seminggu.</li>
                        </ul>
                        <button className="reset-button" onClick={resetForm}>Cek Ulang</button>
                    </div>
                ) : (
                    <>
                        <h2>Kalkulator BMI (IMT)</h2>
                        <p>Kalkulator BMI digunakan untuk menghitung Indeks Massa Tubuh (IMT) dan mengecek seberapa ideal berat badanmu.</p>
                        <div className="gender-selection">
                            <div
                                className={`gender-option ${gender === 'male' ? 'selected' : ''}`}
                                onClick={() => setGender('male')}
                            >
                                <img src="path_to_male_icon" alt="Laki-laki" />
                                <span>Laki-laki</span>
                            </div>
                            <div
                                className={`gender-option ${gender === 'female' ? 'selected' : ''}`}
                                onClick={() => setGender('female')}
                            >
                                <img src="path_to_female_icon" alt="Perempuan" />
                                <span>Perempuan</span>
                            </div>
                        </div>

                        <div className="input-section">
                            <label>Berapa Usia Kamu</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="Berapa Usia Kamu"
                            />
                        </div>

                        <div className="input-section">
                            <label>Berapa Tinggi Kamu</label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="Berapa Tinggi Kamu"
                            />
                        </div>

                        <div className="input-section">
                            <label>Berapa Berat Badan Kamu</label>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="Berapa Berat Badan Kamu"
                            />
                        </div>

                        <button className="calculate-button" onClick={handleCalculate}>
                            Lanjutkan
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Kalkulator;
