// History.jsx
import React from 'react';
import Navbar from '../../components/Navbar/Navbar'; // Pastikan path ini sesuai dengan lokasi Navbar
import './History.css'; // Pastikan CSS diimpor

const History = () => {
  return (
    <div>
      <Navbar /> {/* Menambahkan Navbar di sini */}
      <div className="history-container">
        <h1>History Page</h1>
        <p>Ini adalah halaman histori.</p>
        <p>Konten ini seharusnya terlihat.</p>
      </div>
    </div>
  );
};

export default History;
