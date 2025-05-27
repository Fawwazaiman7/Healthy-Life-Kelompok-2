-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 27 Bulan Mei 2025 pada 06.46
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
(50, 'Diet Atkins', '<p>Diet Atkins adalah salah satu metode diet rendah karbohidrat yang paling populer di dunia. Diperkenalkan oleh Dr. Robert Atkins pada tahun 1972, diet ini bertujuan untuk membantu individu menurunkan berat badan dengan cara mengubah cara tubuh membakar energi, dari pembakaran karbohidrat menjadi pembakaran lemak.</p>\n<h3>Bagaimana Cara Kerja Diet Atkins?</h3>\n<p>Dalam kondisi normal, tubuh menggunakan karbohidrat sebagai sumber energi utama. Namun, ketika asupan karbohidrat dibatasi secara drastis seperti pada Diet Atkins, tubuh akan mulai membakar lemak sebagai sumber energi alternatif. Proses ini disebut ketosis. Saat tubuh masuk ke dalam fase ketosis, lemak tubuh akan lebih mudah terbakar, sehingga membantu penurunan berat badan secara efektif.</p>\n<h3>Tahapan Diet Atkins</h3>\n<ol>\n<li><strong>Fase 1 &ndash; Induksi:</strong> Asupan karbohidrat dibatasi hanya 20 gram per hari. Fokus pada protein tinggi, lemak sehat, dan sayuran rendah karbohidrat seperti bayam dan brokoli.</li>\n<li><strong>Fase 2 &ndash; Penurunan Berat Badan Berkelanjutan:</strong> Karbohidrat ditingkatkan perlahan-lahan hingga 25&ndash;50 gram/hari. Mulai tambahkan buah beri, kacang, dan yogurt rendah karbo.</li>\n<li><strong>Fase 3 &ndash; Pra-pemeliharaan:</strong> Karbohidrat dinaikkan hingga 50&ndash;70 gram/hari. Mulai eksplorasi berbagai sumber karbohidrat sehat.</li>\n<li><strong>Fase 4 &ndash; Pemeliharaan:</strong> Menentukan batas karbohidrat ideal yang tidak menyebabkan kenaikan berat badan kembali. Cocok untuk jangka panjang.</li>\n</ol>\n<h3>Manfaat Diet Atkins</h3>\n<ul>\n<li><strong>Penurunan Berat Badan yang Cepat:</strong> Fase induksi sangat ketat dan sering memberikan hasil signifikan dalam waktu singkat.</li>\n<li><strong>Kontrol Gula Darah Lebih Baik:</strong> Bermanfaat bagi penderita diabetes tipe 2 karena membantu mengatur kadar glukosa.</li>\n<li><strong>Meningkatkan Rasa Kenyang:</strong> Asupan tinggi protein dan lemak membuat kenyang lebih lama, mengurangi keinginan ngemil.</li>\n</ul>\n<h3>Potensi Risiko dan Hal yang Perlu Diwaspadai</h3>\n<ul>\n<li><strong>Keto Flu:</strong> Gejala seperti lemas, sakit kepala, dan sulit fokus sering muncul pada minggu pertama saat tubuh menyesuaikan diri.</li>\n<li><strong>Kekurangan Nutrisi:</strong> Jika tidak direncanakan dengan baik, Diet Atkins bisa menyebabkan kekurangan vitamin dan mineral tertentu.</li>\n<li><strong>Efek Samping Jangka Panjang:</strong> Beberapa penelitian menyebutkan bahwa diet rendah karbohidrat ekstrem dalam jangka panjang bisa berdampak negatif pada kesehatan jantung dan ginjal, jika dilakukan tanpa pengawasan medis.</li>\n</ul>\n<h3>Contoh Menu Diet Atkins (Fase Induksi)</h3>\n<ul>\n<li>Sarapan: Telur orak-arik dengan keju dan bayam</li>\n<li>Makan siang: Salad ayam dengan alpukat dan minyak zaitun</li>\n<li>Makan malam: Daging sapi panggang dengan brokoli kukus</li>\n<li>Camilan: Kacang almond atau telur rebus</li>\n</ul>\n<h3>Kesimpulan</h3>\n<p>Diet Atkins bisa menjadi solusi efektif untuk menurunkan berat badan dalam waktu singkat, terutama bagi mereka yang mengalami resistensi insulin atau kelebihan berat badan. Namun, seperti semua pola makan ekstrem, diet ini harus dilakukan dengan perencanaan matang dan disesuaikan dengan kondisi kesehatan masing-masing individu. Konsultasikan terlebih dahulu dengan ahli gizi atau dokter sebelum memulai Diet Atkins secara penuh.</p>', 1, 'https://ashefagriyapusaka.co.id/wp-content/uploads/2023/11/diet-atkins-1.jpg'),
(51, 'Diet Vegetarian', '<p>\nDiet vegetarian bukan hanya tentang menghindari konsumsi daging, tapi merupakan pilihan gaya hidup yang menyehatkan tubuh dan juga ramah lingkungan. Dalam pola makan ini, seseorang mengonsumsi makanan nabati seperti sayuran, buah-buahan, biji-bijian, kacang-kacangan, dan produk turunan susu atau telur (tergantung jenis vegetarian yang dianut).\n</p>\n\n<h3>Jenis-Jenis Diet Vegetarian</h3>\n<ul>\n  <li><strong>Lacto-ovo vegetarian:</strong> Mengonsumsi produk susu dan telur, namun tidak makan daging, unggas, dan ikan.</li>\n  <li><strong>Lacto vegetarian:</strong> Hanya mengonsumsi produk susu, tanpa telur dan daging.</li>\n  <li><strong>Ovo vegetarian:</strong> Hanya mengonsumsi telur, tanpa susu dan daging.</li>\n  <li><strong>Vegan:</strong> Tidak mengonsumsi produk hewani sama sekali, termasuk madu.</li>\n</ul>\n\n<h3>Manfaat Diet Vegetarian</h3>\n<ul>\n  <li><strong>Menurunkan risiko penyakit kronis:</strong> Seperti penyakit jantung, tekanan darah tinggi, diabetes tipe 2, dan kanker tertentu.</li>\n  <li><strong>Membantu menjaga berat badan:</strong> Diet ini rendah lemak jenuh dan tinggi serat, membantu tubuh kenyang lebih lama.</li>\n  <li><strong>Meningkatkan kesehatan pencernaan:</strong> Kandungan serat dari makanan nabati sangat baik untuk usus.</li>\n  <li><strong>Lebih ramah lingkungan:</strong> Mengurangi jejak karbon karena produksi tanaman memerlukan lebih sedikit air dan lahan dibanding peternakan.</li>\n</ul>\n\n<h3>Tantangan yang Perlu Diperhatikan</h3>\n<p>\nDiet vegetarian perlu direncanakan dengan baik agar tidak kekurangan nutrisi penting seperti protein, zat besi, vitamin B12, omega-3, dan kalsium. Konsultasi dengan ahli gizi sangat disarankan jika kamu ingin mulai menjalani diet ini secara optimal.\n</p>\n\n<h3>Tips Memulai Diet Vegetarian</h3>\n<ol>\n  <li>Mulai perlahan, misalnya dengan menerapkan hari tanpa daging seminggu sekali.</li>\n  <li>Eksplorasi resep vegetarian agar tidak bosan dengan menu yang itu-itu saja.</li>\n  <li>Perhatikan label makanan kemasan, karena beberapa produk olahan tetap mengandung bahan hewani tersembunyi.</li>\n  <li>Pastikan kebutuhan nutrisi harianmu tercukupi, bisa dengan bantuan suplemen bila diperlukan.</li>\n</ol>\n\n<p>\nDiet vegetarian adalah pilihan yang cerdas, asalkan dilakukan dengan seimbang dan penuh kesadaran. Bukan hanya untuk kesehatan tubuh, tapi juga untuk bumi yang lebih lestari. 🌱\n</p>\n', 1, 'https://zakatsukses.org/wp-content/uploads/2024/02/nabila6.jpg'),
(52, 'Diet Mediterania', '<p>\nDiet Mediterania adalah salah satu pola makan paling sehat dan berkelanjutan yang telah terbukti secara ilmiah mampu menurunkan risiko berbagai penyakit kronis. Pola makan ini diadaptasi dari gaya hidup masyarakat di wilayah Laut Tengah seperti Italia, Yunani, dan Spanyol yang memiliki tingkat kesehatan jantung yang tinggi dan angka harapan hidup yang panjang.\n</p>\n\n<h3>Apa Itu Diet Mediterania?</h3>\n<p>\nSecara umum, diet ini menekankan pada konsumsi tinggi sayuran segar, buah-buahan, kacang-kacangan, biji-bijian utuh, ikan, dan lemak sehat seperti minyak zaitun. Daging merah, gula tambahan, dan makanan olahan dikonsumsi dalam jumlah sangat sedikit atau bahkan dihindari.\n</p>\n\n<h3>Manfaat Kesehatan</h3>\n<ul>\n  <li><strong>Menurunkan Risiko Penyakit Jantung:</strong> Kandungan lemak sehat dan antioksidan membantu menjaga tekanan darah dan kadar kolesterol.</li>\n  <li><strong>Mendukung Fungsi Otak:</strong> Nutrisi dari ikan dan minyak zaitun terbukti baik untuk memori dan mencegah Alzheimer.</li>\n  <li><strong>Menurunkan Risiko Kanker dan Diabetes:</strong> Konsumsi makanan alami yang tinggi serat dan rendah indeks glikemik sangat bermanfaat.</li>\n</ul>\n\n<h3>Tips Memulai</h3>\n<p>\nMulailah secara bertahap dengan mengganti mentega ke minyak zaitun, perbanyak sayuran dalam setiap porsi makan, dan ganti camilan dengan buah atau kacang. Untuk hasil optimal, kombinasikan dengan aktivitas fisik dan tidur yang cukup.\n</p>', 1, 'https://froyonion.sgp1.digitaloceanspaces.com/images/blogdetail/c2fb1ec6f851472dc96e29a414848b193801ec7f.jpg'),
(53, 'Diet Paleo', '<p>\nDiet Paleo adalah pendekatan makan yang meniru pola makan manusia prasejarah. Prinsip dasarnya adalah bahwa tubuh manusia paling cocok dengan makanan yang tersedia sebelum adanya pertanian modern seperti daging liar, ikan, sayuran, buah, dan kacang-kacangan.\n</p>\n\n<h3>Prinsip Diet Paleo</h3>\n<p>\nDiet ini menghindari semua makanan olahan, gula tambahan, produk susu, biji-bijian, dan kacang yang telah diproses. Fokus utamanya adalah mengonsumsi makanan yang dapat diperoleh dari alam tanpa intervensi industri.\n</p>\n\n<h3>Keuntungan</h3>\n<ul>\n  <li><strong>Penurunan Berat Badan:</strong> Karena tinggi protein dan rendah karbohidrat olahan.</li>\n  <li><strong>Stabilitas Energi:</strong> Gula darah lebih stabil karena tidak mengonsumsi gula rafinasi.</li>\n  <li><strong>Kesehatan Jantung dan Usus:</strong> Diet ini kaya nutrisi alami yang mendukung kesehatan tubuh secara menyeluruh.</li>\n</ul>\n\n<h3>Catatan</h3>\n<p>\nDiet ini tidak cocok untuk semua orang, terutama mereka yang membutuhkan karbohidrat kompleks tinggi seperti atlet. Konsultasikan dengan ahli gizi sebelum memulai secara ketat.\n</p>', 1, 'https://assets.kompasiana.com/items/album/2016/05/28/paleo2-5748ed3dd17a61e204eb2736.jpeg?t=o&v=770'),
(54, 'Diet Ultra Rendah Lemak', '<p>\nDiet ultra rendah lemak adalah jenis diet yang membatasi asupan lemak harian hingga kurang dari 10% dari total kalori. Biasanya dianjurkan untuk penderita penyakit jantung atau kolesterol tinggi. Diet ini sangat menekankan konsumsi makanan nabati dan menghindari semua jenis lemak, bahkan yang tergolong sehat.\n</p>\n\n<h3>Tujuan Utama</h3>\n<p>\nUntuk membersihkan pembuluh darah dari plak kolesterol dan mengembalikan fungsi jantung yang optimal. Diet ini mengandalkan sayur, buah, biji-bijian utuh, dan protein nabati seperti tahu dan tempe.\n</p>\n\n<h3>Efektivitas</h3>\n<ul>\n  <li><strong>Mengurangi Risiko Penyakit Jantung:</strong> Banyak pasien mengalami perbaikan signifikan dalam tekanan darah dan kolesterol setelah beberapa bulan menjalani diet ini.</li>\n  <li><strong>Penurunan Berat Badan:</strong> Karena makanan rendah lemak cenderung lebih rendah kalori.</li>\n</ul>\n\n<h3>Risiko</h3>\n<p>\nKarena pembatasan lemak yang ekstrem, beberapa nutrisi seperti vitamin A, D, E, dan K bisa sulit diserap. Oleh karena itu, diet ini perlu diawasi ketat oleh tenaga medis.\n</p>', 1, 'https://d1bpj0tv6vfxyp.cloudfront.net/articles/829760_12-11-2020_5-12-27.jpeg'),
(61, 'Pentingnya Tidur yang Cukup', '<p>\nTidur yang cukup dan berkualitas bukan hanya penting untuk istirahat, tetapi juga berperan besar dalam menjaga keseimbangan hormon, memperkuat sistem imun, dan meningkatkan produktivitas. Sayangnya, banyak orang mengabaikan tidur demi pekerjaan atau hiburan hingga larut malam.\n</p>\n\n<h3>Dampak Buruk Kurang Tidur</h3>\n<ul>\n  <li>Penurunan fungsi kognitif dan daya ingat</li>\n  <li>Peningkatan risiko obesitas, diabetes, dan tekanan darah tinggi</li>\n  <li>Suasana hati mudah terganggu dan rentan terhadap stres</li>\n</ul>\n\n<h3>Tips Tidur Berkualitas</h3>\n<p>\nBuat rutinitas tidur yang konsisten, hindari konsumsi kafein di sore hari, matikan perangkat elektronik 1 jam sebelum tidur, dan pastikan kamar tidur nyaman dan gelap. Orang dewasa idealnya tidur 7–9 jam setiap malam.\n</p>', 1, 'https://lpmneraca.com/wp-content/uploads/2024/05/file_2024-05-22_13.49.29.png');

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
(1, 'Salad Sayur', 9.00, 'https://img-global.cpcdn.com/recipes/9de63605e81a59df/640x640sq70/photo.webp', '[\"2 lembar daun selada segar\",\"1\\/2 buah tomat merah, iris tipis\",\"1\\/4 buah paprika merah, iris tipis\",\"1\\/4 mentimun, iris tipis\",\"1 sdm olive oil\",\"1 sdt air perasan lemon\",\"Sedikit garam & lada hitam\"]', '[\"Cuci bersih semua sayuran lalu tiriskan.\",\"Potong-potong tomat, paprika, dan mentimun sesuai selera.\",\"Campurkan semua sayuran ke dalam satu mangkuk besar.\",\"Tuang olive oil dan air perasan lemon ke dalam mangkuk.\",\"Tambahkan garam dan lada hitam, lalu aduk rata.\",\"Sajikan segera dalam keadaan segar.\"]', 1),
(2, 'Overnight Oat', 307.00, 'https://img-global.cpcdn.com/steps/3b0ea78cf1fd5e33/640x640sq70/photo.webp', '[\"Secukupnya Oatmeal\",\"Secukupnya susu kedelai (aku pakai VSoy)\",\"1-2 buah strawberry yg sudah dicuci\",\"Sedikit chia seed\",\"Sedikit granola\"]', '[\"Tuang oatmeal ke wadah kaca atau kotak makan\",\"Disusul dengan menuangkan susu kedelai...\",\"Taburkan chia seed sesuai selera\",\"Diamkan dalam wadah tertutup dalam lemari es semalaman...\",\"Voila! Santap sebagai snack...\"]', 1),
(3, 'Tumis kangkung', 77.00, 'https://assets.unileversolutions.com/recipes-v3/230520-default.jpg?im=AspectCrop=(720,459);Resize=(720,459)', '[\"1 ikat kangkung, siangi dan cuci bersih\", \"2 siung bawang putih, iris tipis\", \"3 buah cabai merah, iris serong\", \"1 sdm saus tiram\", \"2 sdm minyak goreng\", \"Sedikit garam dan penyedap\"]', '[\"Panaskan minyak goreng di atas wajan.\", \"Tumis bawang putih hingga harum dan sedikit kecoklatan.\", \"Masukkan irisan cabai, tumis sebentar.\", \"Masukkan kangkung, aduk cepat agar tidak layu berlebihan.\", \"Tambahkan saus tiram, garam, dan penyedap.\", \"Masak kurang lebih 1-2 menit, sajikan selagi hangat.\"]', 1);

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
  MODIFY `id_artikel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT untuk tabel `data_olahraga`
--
ALTER TABLE `data_olahraga`
  MODIFY `id_olahraga` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT untuk tabel `makanan`
--
ALTER TABLE `makanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
