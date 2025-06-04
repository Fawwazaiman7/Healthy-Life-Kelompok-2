// File location: src/Pages/Kalkulator/KalkulatorAKG.jsx
import React, { useState } from 'react';
import './KalkulatorAKG.css'; // Pastikan Anda membuat file ini
import Navbar from '../../components/Navbar/Navbar'; // Pastikan jalur ini benar

const KalkulatorAKG = () => {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState(1.2); // Default ke "Sangat jarang berolahraga"
    const [calories, setCalories] = useState(null);
    const [protein, setProtein] = useState(null);
    const [carbs, setCarbs] = useState(null);
    const [fats, setFats] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // State untuk pesan kesalahan

    const calculateCalories = () => {
        let bmr;

        // Hitung BMR berdasarkan jenis kelamin
        if (gender === 'male') {
            bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
        } else {
            bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
        }

        // Kalori total berdasarkan aktivitas
        const totalCalories = Math.round(bmr * activityLevel);
        setCalories(totalCalories);

        // Hitung kebutuhan gizi
        const proteinCalories = totalCalories * 0.15; // 15% dari total kalori
        const carbsCalories = totalCalories * 0.60; // 60% dari total kalori
        const fatsCalories = totalCalories * 0.25; // 25% dari total kalori

        setProtein(Math.round(proteinCalories / 4)); // 1 gram protein = 4 kalori
        setCarbs(Math.round(carbsCalories / 4)); // 1 gram karbohidrat = 4 kalori
        setFats(Math.round(fatsCalories / 9)); // 1 gram lemak = 9 kalori

        setShowResult(true);
        setErrorMessage(''); // Reset pesan kesalahan
    };

    const handleCalculate = (e) => {
        e.preventDefault();

        // Validasi input usia
        if (age < 0 || age === '') {
            setErrorMessage('Usia tidak boleh negatif atau kosong.');
            return;
        }

        calculateCalories();
    };

    const handleAgeChange = (e) => {
        const value = e.target.value;

        // Hanya izinkan angka
        if (/^\d*$/.test(value)) {
            setAge(value);
        }
    };

    const resetForm = () => {
        setAge('');
        setGender('male');
        setHeight('');
        setWeight('');
        setActivityLevel(1.2);
        setCalories(null);
        setProtein(null);
        setCarbs(null);
        setFats(null);
        setShowResult(false);
        setErrorMessage(''); // Reset pesan kesalahan
    };

    return (
        <div className="page-background">
            <Navbar />
            <div className="kalkulator-container">
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Tampilkan pesan kesalahan */}
                {showResult ? (
                    <div className="result-section">
                        <h2>Kebutuhan Kalori Harian Anda: <span className="calories-value">{calories} kalori</span></h2>
                        <h3>Kebutuhan Gizi Anda:</h3>
                        <p className="nutrition-output">Protein: {protein} gram</p>
                        <p className="nutrition-output">Karbohidrat: {carbs} gram</p>
                        <p className="nutrition-output">Lemak: {fats} gram</p>
                        <button className="reset-button" onClick={resetForm}>Cek Ulang</button>
                    </div>
                ) : (
                    <>
                        <h2>Kalkulator Angka Kecukupan Gizi (AKG)</h2>
                        <div className="input-section">
                            <label>Usia (tahun)</label>
                            <input 
                                type="text" 
                                value={age} 
                                onChange={handleAgeChange} 
                                placeholder="Usia Anda" 
                            />
                        </div>
                        <div className="gender-selection">
                            <label>Jenis Kelamin</label>
                            <div>
                                <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
                                <label htmlFor="male"> Laki-laki</label>
                            </div>
                            <div>
                                <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
                                <label htmlFor="female"> Perempuan</label>
                            </div>
                        </div>
                        <div className="input-section">
                            <label>Tinggi Badan (cm)</label>
                            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Tinggi Badan Anda" />
                        </div>
                        <div className="input-section">
                            <label>Berat Badan (kg)</label>
                            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Berat Badan Anda" />
                        </div>
                        <div className="input-section">
                            <label>Level Aktivitas</label>
                            <select value={activityLevel} onChange={(e) => setActivityLevel(parseFloat(e.target.value))}>
                                <option value={1.2}>Sangat jarang berolahraga</option>
                                <option value={1.375}>Jarang olahraga (1-3 kali per minggu)</option>
                                <option value={1.55}>Cukup olahraga (3-5 kali per minggu)</option>
                                <option value={1.725}>Sering olahraga (6-7 kali per minggu)</option>
                                <option value={1.9}>Sangat sering olahraga (sekitar 2 kali dalam sehari)</option>
                            </select>
                        </div>
                        <button className="calculate-button" onClick={handleCalculate}>Hitung Kebutuhan Kalori</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default KalkulatorAKG;
