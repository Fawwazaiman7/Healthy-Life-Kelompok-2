// File: src/Pages/Kalkulator.jsx
import React, { useState } from 'react';
import './Kalkulator.css';
import Navbar from '../components/Navbar/Navbar';

function Kalkulator() {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [bmiCategory, setBmiCategory] = useState('');
    const [idealWeightRange, setIdealWeightRange] = useState('');
    const [showResult, setShowResult] = useState(false);

    const calculateBMI = () => {
        if (height && weight) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
            setBmi(bmiValue);
            determineBMICategory(bmiValue);
            setShowResult(true);
        }
    };

    const determineBMICategory = (bmiValue) => {
        let category = '';
        let weightRange = '';

        if (bmiValue < 18.5) {
            category = 'Kurus';
            weightRange = 'Berat ideal kamu antara 45 - 60 kg';
        } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
            category = 'Normal';
            weightRange = 'Berat ideal kamu antara 59 - 80 kg';
        } else if (bmiValue >= 25 && bmiValue <= 29.9) {
            category = 'Gemuk';
            weightRange = 'Berat ideal kamu antara 65 - 90 kg';
        } else if (bmiValue >= 30 && bmiValue <= 34.9) {
            category = 'Obesitas 1';
            weightRange = 'Berat ideal kamu antara 70 - 100 kg';
        } else {
            category = 'Obesitas 2';
            weightRange = 'Berat ideal kamu antara 80 - 120 kg';
        }

        setBmiCategory(category);
        setIdealWeightRange(weightRange);
    };

    const handleCalculate = (e) => {
        e.preventDefault();
        calculateBMI();
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
