-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 24 Bulan Mei 2025 pada 04.00
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `healthy_life`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `nama_pengguna` varchar(100) NOT NULL,
  `kata_sandi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id_admin`, `nama_pengguna`, `kata_sandi`) VALUES
(1, 'admin', '$2y$10$dGfmSIHkkNXfkT4UtjQo0.U77bprgzB8gUBJ.QwQ5ziHLbmVwZhgK');

-- --------------------------------------------------------

--
-- Struktur dari tabel `artikel`
--

CREATE TABLE `artikel` (
  `id_artikel` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `konten` text DEFAULT NULL,
  `admin_id_admin` int(11) NOT NULL,
  `gambar` varchar(3000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `artikel`
--

INSERT INTO `artikel` (`id_artikel`, `judul`, `konten`, `admin_id_admin`, `gambar`) VALUES
(50, 'Diet Atkins', NULL, 1, 'https://ashefagriyapusaka.co.id/wp-content/uploads/2023/11/diet-atkins-1.jpg'),
(51, 'Diet Vegetarian', NULL, 1, 'https://zakatsukses.org/wp-content/uploads/2024/02/nabila6.jpg'),
(52, 'Diet Mediterania', NULL, 1, 'https://froyonion.sgp1.digitaloceanspaces.com/images/blogdetail/c2fb1ec6f851472dc96e29a414848b193801ec7f.jpg'),
(53, 'Diet Paleo', NULL, 1, 'https://assets.kompasiana.com/items/album/2016/05/28/paleo2-5748ed3dd17a61e204eb2736.jpeg?t=o&v=770'),
(54, 'Diet Ultra Rendah Lemak', NULL, 1, 'https://blogger.googleusercontent.com/.../Diet_Rendah_Lemak_Atau_Karbo.jpg'),
(61, 'Pentingnya Tidur yang Cukup', NULL, 1, 'https://asset.kompas.com/.../641ffd77880e8.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_olahraga`
--

CREATE TABLE `data_olahraga` (
  `id_olahraga` int(11) NOT NULL,
  `nama_olahraga` varchar(100) NOT NULL,
  `kalori_per_set` float DEFAULT NULL CHECK (`kalori_per_set` >= 0),
  `admin_id_admin` int(11) NOT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `link_video` varchar(255) DEFAULT NULL,
  `estimasi_waktu` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `data_olahraga`
--

INSERT INTO `data_olahraga` (`id_olahraga`, `nama_olahraga`, `kalori_per_set`, `admin_id_admin`, `gambar`, `link_video`, `estimasi_waktu`) VALUES
(1, 'Lompat Tali', 10, 1, 'https://blog.bioritmo.com.br/.../shutterstock_722394541-1.jpg', 'https://www.youtube.com/watch?v=N2NNUcABCME', '1 menit'),
(81, 'High Knees', 10, 1, 'https://cdn.maskulin.com.my/.../229945-28_21_296910.jpeg', 'https://www.youtube.com/watch?v=FvjmPRU3zn4', '30 detik');

-- --------------------------------------------------------

--
-- Struktur dari tabel `makanan`
--

CREATE TABLE `makanan` (
  `id` int(11) NOT NULL,
  `judul` varchar(100) DEFAULT NULL,
  `kalori` decimal(10,2) DEFAULT NULL,
  `gambar` varchar(4000) DEFAULT NULL,
  `resep` text DEFAULT NULL,
  `cara_pembuatan` text DEFAULT NULL,
  `admin_id_admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `makanan`
--

INSERT INTO `makanan` (`id`, `judul`, `kalori`, `gambar`, `resep`, `cara_pembuatan`, `admin_id_admin`) VALUES
(1, 'Salad Sayur', 9.00, 'https://img-global.cpcdn.com/recipes/9de63605e81a59df/640x640sq70/photo.webp', '[\"Secukupnya selada hijau\",\"Secukupnya selada merah\",\"Secukupnya tomat ceri\",\"1/2 buah paprika\",\"1 buah telur\",\"3 buah jamur\",\"1 buah lemon peras\",\"1 jumput himsalt\",\"1 jumput lada bubuk\",\"2 sdm thousand island\",\"2 lembar smoked beef\",\"1 sdt olive oil\"]', '[\"Siapkan semua bahan.\",\"Tata selada, paprika, dan tomat dalam mangkok besar. Taburkan himsalt dan lada bubuk, lalu kucurkan perasan lemon.\",\"Panaskan wajan, tuang olive oil, masukkan irisan jamur dan smoked beef, aduk-aduk sebentar. Masukkan kocokan telur, orak-arik sampai matang. Tuang di atas mangkok berisi sayuran, tambahkan dressing thousand island.\",\"Salad siap disajikan.\"]', 1),
(2, 'Overnight Oat', 307.00, 'https://img-global.cpcdn.com/steps/3b0ea78cf1fd5e33/640x640sq70/photo.webp', '[\"Secukupnya Oatmeal\",\"Secukupnya susu kedelai (aku pakai VSoy)\",\"1-2 buah strawberry yg sudah dicuci\",\"Sedikit chia seed\",\"Sedikit granola\"]', '[\"Tuang oatmeal ke wadah kaca atau kotak makan\",\"Disusul dengan menuangkan susu kedelai...\",\"Taburkan chia seed sesuai selera\",\"Diamkan dalam wadah tertutup dalam lemari es semalaman...\",\"Voila! Santap sebagai snack...\"]', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengguna`
--

CREATE TABLE `pengguna` (
  `id_pengguna` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `kata_sandi` varchar(255) NOT NULL,
  `usia` int(11) NOT NULL CHECK (`usia` > 0),
  `jenis_kelamin` char(1) NOT NULL CHECK (`jenis_kelamin` in ('L','P')),
  `berat_badan` float NOT NULL CHECK (`berat_badan` > 0),
  `tinggi_badan` float NOT NULL CHECK (`tinggi_badan` > 0),
  `admin_id_admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pengguna`
--

INSERT INTO `pengguna` (`id_pengguna`, `nama`, `email`, `kata_sandi`, `usia`, `jenis_kelamin`, `berat_badan`, `tinggi_badan`, `admin_id_admin`) VALUES
(150, 'cuklis', 'cuklis@gmail.com', '$2y$10$aVPwavZU3cUuF2fxYJwZxeM23ld02haLU2G6ewTVJz275uDPzvUqa', 18, 'L', 60, 170, 1),
(442, 'fawwazonk', '123@email.com', '$2y$10$9mQxXZF.TdorQC48znOjOuw9MTwtY9sNu3ZTQkLkgX4QJmjH/2rWq', 76, 'P', 40, 167, 1),
(443, 'Andi', 'andi@gmail.com', '$2y$10$4PBcgPVIaBzTsSs6WIpyXeKZeutmF7Xs1KE7DI8DIGpSIVZw/53Cm', 25, 'L', 70, 170, 1),
(454, 'tes', 'fewfew@gmail.com', '$2y$10$miB4Ue6liVMJlWXn9Bcn6.CRAoiboqa44XYH2Hss2Q4DfHOF4vTc6', 19, 'L', 46, 145, 1),
(455, 'tes', 'tes@gmail.com', '$2y$10$RFvWIhPVJ8.X5.m4TZQPNORHUVpKwVdrKXg7kZLCT/9./LILRbeaS', 31, 'L', 68, 170, 1),
(456, 'bud', 'budii@gmail.com', '$2y$10$CCvp2Z33gA6N6.PxpkQ3YeUM6C0pyhzPGZrSYB54v.w/CC.Ji08Da', 18, 'L', 60, 170, 1),
(487, 'testuser1', 'fawwaz@mail.com', '$2y$10$1/56vm2riYhzVEsjaFSZgeWFe984adenW7B8XXhnvCMi6zHeZLNU6', 18, 'L', 60, 170, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tracker`
--

CREATE TABLE `tracker` (
  `id_tracker` varchar(20) NOT NULL,
  `tanggal` datetime NOT NULL,
  `kalori_masuk` int(11) DEFAULT NULL,
  `kalori_keluar` int(11) DEFAULT NULL,
  `id_pengguna` int(11) DEFAULT NULL,
  `makanan_tracker` text DEFAULT NULL,
  `olahraga_tracker` text DEFAULT NULL,
  `target_kalori` int(11) DEFAULT NULL,
  `status_kalori` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tracker`
--

INSERT INTO `tracker` (`id_tracker`, `tanggal`, `kalori_masuk`, `kalori_keluar`, `id_pengguna`, `makanan_tracker`, `olahraga_tracker`, `target_kalori`, `status_kalori`) VALUES
('TRK1234567890', '2025-05-18 15:30:00', 12, 33, 442, '[{\"name\":\"tempe bacem\",\"calories\":12}]', '[{\"name\":\"senam\",\"calories\":33}]', 3000, 'Surplus Kalori'),
('TRK1747956066843', '2025-05-22 06:21:06', 20, 20, 442, '[{\"name\":\"kacang\",\"calories\":20}]', '[{\"name\":\"senam\",\"calories\":20}]', 2000, 'Seimbang'),
('TRK1748049203549', '2025-05-24 08:13:23', 150, 300, 455, '[{\"name\":\"Apel-1\",\"calories\":150}]', '[{\"name\":\"Lari-1\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049213032', '2025-05-24 08:13:33', 150, 300, 455, '[{\"name\":\"Apel-2\",\"calories\":150}]', '[{\"name\":\"Lari-2\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049222375', '2025-05-24 08:13:42', 150, 300, 455, '[{\"name\":\"Apel-3\",\"calories\":150}]', '[{\"name\":\"Lari-3\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049231698', '2025-05-24 08:13:51', 150, 300, 455, '[{\"name\":\"Apel-4\",\"calories\":150}]', '[{\"name\":\"Lari-4\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049240931', '2025-05-24 08:14:00', 150, 300, 455, '[{\"name\":\"Apel-5\",\"calories\":150}]', '[{\"name\":\"Lari-5\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049250222', '2025-05-24 08:14:10', 150, 300, 455, '[{\"name\":\"Apel-6\",\"calories\":150}]', '[{\"name\":\"Lari-6\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049259446', '2025-05-24 08:14:19', 150, 300, 455, '[{\"name\":\"Apel-7\",\"calories\":150}]', '[{\"name\":\"Lari-7\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049268178', '2025-05-24 08:14:28', 150, 300, 455, '[{\"name\":\"Apel-8\",\"calories\":150}]', '[{\"name\":\"Lari-8\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049277305', '2025-05-24 08:14:37', 150, 300, 455, '[{\"name\":\"Apel-9\",\"calories\":150}]', '[{\"name\":\"Lari-9\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049286491', '2025-05-24 08:14:46', 150, 300, 455, '[{\"name\":\"Apel-10\",\"calories\":150}]', '[{\"name\":\"Lari-10\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049295656', '2025-05-24 08:14:55', 150, 300, 455, '[{\"name\":\"Apel-11\",\"calories\":150}]', '[{\"name\":\"Lari-11\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049304787', '2025-05-24 08:15:04', 150, 300, 455, '[{\"name\":\"Apel-12\",\"calories\":150}]', '[{\"name\":\"Lari-12\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049314019', '2025-05-24 08:15:14', 150, 300, 455, '[{\"name\":\"Apel-13\",\"calories\":150}]', '[{\"name\":\"Lari-13\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049323135', '2025-05-24 08:15:23', 150, 300, 455, '[{\"name\":\"Apel-14\",\"calories\":150}]', '[{\"name\":\"Lari-14\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049332227', '2025-05-24 08:15:32', 150, 300, 455, '[{\"name\":\"Apel-15\",\"calories\":150}]', '[{\"name\":\"Lari-15\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049341340', '2025-05-24 08:15:41', 150, 300, 455, '[{\"name\":\"Apel-16\",\"calories\":150}]', '[{\"name\":\"Lari-16\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049350474', '2025-05-24 08:15:50', 150, 300, 455, '[{\"name\":\"Apel-17\",\"calories\":150}]', '[{\"name\":\"Lari-17\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049359589', '2025-05-24 08:15:59', 150, 300, 455, '[{\"name\":\"Apel-18\",\"calories\":150}]', '[{\"name\":\"Lari-18\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049368721', '2025-05-24 08:16:08', 150, 300, 455, '[{\"name\":\"Apel-19\",\"calories\":150}]', '[{\"name\":\"Lari-19\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049377893', '2025-05-24 08:16:17', 150, 300, 455, '[{\"name\":\"Apel-20\",\"calories\":150}]', '[{\"name\":\"Lari-20\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049387010', '2025-05-24 08:16:27', 150, 300, 455, '[{\"name\":\"Apel-21\",\"calories\":150}]', '[{\"name\":\"Lari-21\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049398429', '2025-05-24 08:16:38', 150, 300, 455, '[{\"name\":\"Apel-22\",\"calories\":150}]', '[{\"name\":\"Lari-22\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049410223', '2025-05-24 08:16:50', 150, 300, 455, '[{\"name\":\"Apel-23\",\"calories\":150}]', '[{\"name\":\"Lari-23\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049426391', '2025-05-24 08:17:06', 150, 300, 455, '[{\"name\":\"Apel-24\",\"calories\":150}]', '[{\"name\":\"Lari-24\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049438134', '2025-05-24 08:17:18', 150, 300, 455, '[{\"name\":\"Apel-25\",\"calories\":150}]', '[{\"name\":\"Lari-25\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049454164', '2025-05-24 08:17:34', 150, 300, 455, '[{\"name\":\"Apel-26\",\"calories\":150}]', '[{\"name\":\"Lari-26\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049467093', '2025-05-24 08:17:47', 150, 300, 455, '[{\"name\":\"Apel-27\",\"calories\":150}]', '[{\"name\":\"Lari-27\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049485689', '2025-05-24 08:18:05', 150, 300, 455, '[{\"name\":\"Apel-28\",\"calories\":150}]', '[{\"name\":\"Lari-28\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049499791', '2025-05-24 08:18:19', 150, 300, 455, '[{\"name\":\"Apel-29\",\"calories\":150}]', '[{\"name\":\"Lari-29\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049517487', '2025-05-24 08:18:37', 150, 300, 455, '[{\"name\":\"Apel-30\",\"calories\":150}]', '[{\"name\":\"Lari-30\",\"calories\":300}]', 2000, 'Defisit Kalori'),
('TRK1748049673192', '2025-05-24 08:21:13', 12, 20, 455, '[{\"name\":\"jahe\",\"calories\":12}]', '[{\"name\":\"lari\",\"calories\":20}]', -100, 'Defisit Kalori'),
('TRK1748050886112', '2025-05-24 08:41:26', 150, 300, 455, '[{\"name\":\"Apel-1\",\"calories\":150}]', '[{\"name\":\"Lari-1\",\"calories\":300}]', 2000, 'Defisit Kalori');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `nama_pengguna` (`nama_pengguna`);

--
-- Indeks untuk tabel `artikel`
--
ALTER TABLE `artikel`
  ADD PRIMARY KEY (`id_artikel`),
  ADD KEY `admin_id_admin` (`admin_id_admin`);

--
-- Indeks untuk tabel `data_olahraga`
--
ALTER TABLE `data_olahraga`
  ADD PRIMARY KEY (`id_olahraga`),
  ADD KEY `admin_id_admin` (`admin_id_admin`);

--
-- Indeks untuk tabel `makanan`
--
ALTER TABLE `makanan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id_admin` (`admin_id_admin`);

--
-- Indeks untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id_pengguna`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `admin_id_admin` (`admin_id_admin`);

--
-- Indeks untuk tabel `tracker`
--
ALTER TABLE `tracker`
  ADD PRIMARY KEY (`id_tracker`),
  ADD KEY `id_pengguna` (`id_pengguna`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `artikel`
--
ALTER TABLE `artikel`
  MODIFY `id_artikel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT untuk tabel `data_olahraga`
--
ALTER TABLE `data_olahraga`
  MODIFY `id_olahraga` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT untuk tabel `makanan`
--
ALTER TABLE `makanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id_pengguna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=488;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `artikel`
--
ALTER TABLE `artikel`
  ADD CONSTRAINT `artikel_ibfk_1` FOREIGN KEY (`admin_id_admin`) REFERENCES `admin` (`id_admin`);

--
-- Ketidakleluasaan untuk tabel `data_olahraga`
--
ALTER TABLE `data_olahraga`
  ADD CONSTRAINT `data_olahraga_ibfk_1` FOREIGN KEY (`admin_id_admin`) REFERENCES `admin` (`id_admin`);

--
-- Ketidakleluasaan untuk tabel `makanan`
--
ALTER TABLE `makanan`
  ADD CONSTRAINT `makanan_ibfk_1` FOREIGN KEY (`admin_id_admin`) REFERENCES `admin` (`id_admin`);

--
-- Ketidakleluasaan untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  ADD CONSTRAINT `pengguna_ibfk_1` FOREIGN KEY (`admin_id_admin`) REFERENCES `admin` (`id_admin`);

--
-- Ketidakleluasaan untuk tabel `tracker`
--
ALTER TABLE `tracker`
  ADD CONSTRAINT `tracker_ibfk_1` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna` (`id_pengguna`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
