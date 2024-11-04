// File: src/Pages/Kalkulator.jsx
import React, { useState } from 'react';
import './Kalkulator.css';
import Navbar from '../components/Navbar/Navbar'; // Mengimpor Navbar

function Kalkulator() {
    const [age, setAge] = useState(20);
    const [job, setJob] = useState('Lainnya');
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activity, setActivity] = useState('aktif');

    const activityLevels = [
        { label: 'Tidak Aktif', value: 'tidak_aktif', image: 'path_to_image' },
        { label: 'Kurang Aktif', value: 'kurang_aktif', image: 'path_to_image' },
        { label: 'Aktif', value: 'aktif', image: 'path_to_image' },
        { label: 'Sangat Aktif', value: 'sangat_aktif', image: 'path_to_image' },
    ];

    const handleCalculate = () => {
        alert(`Usia: ${age}, Pekerjaan: ${job}, Gender: ${gender}, Tinggi Badan: ${height}, Berat Badan: ${weight}, Aktivitas: ${activity}`);
    };

    return (
        <div className="page-background"> {/* Membungkus seluruh halaman dalam page-background */}
            <Navbar /> {/* Menempatkan Navbar di dalam page-background */}
            <div className="kalkulator-container">
                <div className="input-section">
                    <label>Usia</label>
                    <input
                        type="range"
                        min="10"
                        max="80"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <span>{age}</span>
                </div>
                <div className="input-section">
                    <label>Pekerjaan</label>
                    <select value={job} onChange={(e) => setJob(e.target.value)}>
                        <option value="Lainnya">Lainnya</option>
                        <option value="Pekerja Kantoran">Pekerja Kantoran</option>
                        <option value="Pekerja Lapangan">Pekerja Lapangan</option>
                    </select>
                </div>
                <div className="input-section">
                    <label>Jenis Kelamin</label>
                    <div className="gender-selection">
                        {/* Gender Laki-laki */}
                        <div
                            className={`gender-option ${gender === 'male' ? 'selected' : ''}`}
                            onClick={() => setGender('male')}
                        >
                            <img src="path_to_male_icon" alt="Laki-laki" />
                            <span>Laki-laki</span>
                        </div>

                        {/* Gender Perempuan */}
                        <div
                            className={`gender-option ${gender === 'female' ? 'selected' : ''}`}
                            onClick={() => setGender('female')}
                        >
                            <img src="path_to_female_icon" alt="Perempuan" />
                            <span>Perempuan</span>
                        </div>
                    </div>
                </div>
                <div className="input-section">
                    <label>Tinggi Badan</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Masukkan tinggi badan"
                    />
                </div>
                <div className="input-section">
                    <label>Berat Badan</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Masukkan berat badan"
                    />
                </div>
                <div className="input-section">
                    <label>Tingkat Aktivitas</label>
                    <div className="activity-levels">
                        {activityLevels.map((level) => (
                            <div
                                key={level.value}
                                className={`activity-option ${activity === level.value ? 'active' : ''}`}
                                onClick={() => setActivity(level.value)}
                            >
                                <img src={level.image} alt={level.label} />
                                <span>{level.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="calculate-button" onClick={handleCalculate}>
                    Hitung
                </button>
            </div>
        </div>
    );
}

export default Kalkulator;
