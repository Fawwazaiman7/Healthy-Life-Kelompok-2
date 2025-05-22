import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Riwayat.css";
import Navbar from "../../components/Navbar/Navbar";

function Riwayat() {
  const [riwayatData, setRiwayatData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("12");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User data dari LocalStorage:", user);

    const idPengguna = user ? user.id : null;

    if (!idPengguna) {
      alert("ID pengguna tidak ditemukan. Silakan login ulang.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost/healty_life/backend/tracker.php",
          { params: { id_pengguna: idPengguna } }
        );

        console.log("Response dari backend:", response.data);

        if (response.data.success) {
          console.log("Data berhasil diambil:", response.data.data);
          setRiwayatData(response.data.data);
        } else {
          console.error("Gagal mengambil data riwayat:", response.data.message);
        }
      } catch (error) {
        console.error("Error saat mengambil data riwayat:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // Fungsi untuk menghasilkan tahun saat ini dan tahun berikutnya
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return [currentYear, currentYear + 1];
  };

  // Bulan dalam bahasa Indonesia
  const months = [
    "01:Januari",
    "02:Februari",
    "03:Maret",
    "04:April",
    "05:Mei",
    "06:Juni",
    "07:Juli",
    "08:Agustus",
    "09:September",
    "10:Oktober",
    "11:November",
    "12:Desember",
  ];

  // Filter data berdasarkan bulan dan tahun yang dipilih
  const filteredData = riwayatData.filter(
    (item) =>
      item.tanggal.substring(0, 4) === selectedYear.toString() &&
      item.tanggal.substring(5, 7) === selectedMonth
  );

  return (
    <div className="riwayat-container">
      <Navbar />
      <h1>Riwayat Tracker</h1>

      {/* Filter Bulan dan Tahun */}
      <div className="filter-bulan-tahun">
        <label htmlFor="month">Pilih Bulan: </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month, idx) => {
            const [value, name] = month.split(":");
            return (
              <option key={idx} value={value}>
                {name}
              </option>
            );
          })}
        </select>

        <label htmlFor="year">Pilih Tahun: </label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {generateYears().map((year, idx) => (
            <option key={idx} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Tampilkan Data */}
      {loading ? (
        <p>Memuat data...</p>
      ) : filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div className="riwayat-card" key={index}>
            <h2>{item.tanggal.split(" ")[0]}</h2>

            <h3>Olahraga:</h3>
            <ul>
              {item.olahraga_tracker && Array.isArray(item.olahraga_tracker) ? (
                item.olahraga_tracker.map((exercise, idx) => (
                  <li key={idx}>
                    {exercise.name}: {exercise.calories} Kalori
                  </li>
                ))
              ) : (
                <li>Tidak ada data olahraga</li>
              )}
            </ul>

            <h3>Makanan:</h3>
            <ul>
              {item.makanan_tracker && Array.isArray(item.makanan_tracker) ? (
                item.makanan_tracker.map((food, idx) => (
                  <li key={idx}>
                    {food.name}: {food.calories} Kalori
                  </li>
                ))
              ) : (
                <li>Tidak ada data makanan</li>
              )}
            </ul>
            <h4>Status Kalori: {item.status_kalori || "Tidak tersedia"}</h4>
            <h4>Total Kalori Masuk: {item.kalori_masuk || 0} Kcal</h4>
            <h4>Total Kalori Keluar: {item.kalori_keluar || 0} Kcal</h4>
            <h4>Target Kalori Harian: {item.target_kalori || 0} Kcal</h4>
          </div>
        ))
      ) : (
        <p>Tidak ada riwayat untuk bulan dan tahun ini.</p>
      )}
    </div>
  );
}

export default Riwayat;
