# Healthy Life

*Healthy Life* adalah aplikasi berbasis web yang membantu pengguna dalam menurunkan berat badan dan menjaga pola hidup sehat. Aplikasi ini menyediakan fitur-fitur seperti tutorial olahraga, estimasi kalori yang terbakar, dan fitur berbagi progres ke media sosial. Healthy Life dirancang untuk memberikan pengalaman yang mudah dan menyenangkan dalam mencapai target kesehatan pengguna.

---

## Fitur Utama

### 1. *Beranda*
   - Menampilkan artikel gratis tentang makanan sehat dan tips hidup sehat.
   - Terdapat tombol *Login* dan *Sign Up* di pojok kanan atas.
   - Pengguna yang tidak login tetap dapat melihat informasi form penghitungan kalori.

### 2. *Login & Registrasi*
   - Sistem login custom tanpa menggunakan JWT atau provider eksternal.
   - Data login dikelola secara penuh dalam database.

### 3. *Kalkulator Kalori*
   - Menghitung total kalori secara implisit di backend berdasarkan form yang diisi pengguna.
   - Pengguna yang baru login pertama kali diwajibkan mengisi form biodata untuk menghitung target kalori mereka.

### 4. *Tracking Olahraga*
   - Memungkinkan pengguna memilih jenis olahraga, jumlah repetisi, dan target kalori yang ingin dicapai.
   - Progress disesuaikan dengan latihan yang telah selesai dan berat badan yang diperbarui pengguna.

### 5. *Rekomendasi Makanan Sehat*
   - Fitur rekomendasi makanan sehat berbasis kalori yang dapat membantu pengguna memenuhi kebutuhan gizi.

### 6. *Artikel Edukasi*
   - Artikel edukasi tentang pola makan sehat, manfaat olahraga, dan tips menjaga kesehatan tubuh.

### 7. *Resep Makanan Sehat*
   - Resep makanan sehat hanya dapat diakses oleh pengguna yang sudah menggunakan kalkulator kalori.

### 8. *Notifikasi Firebase*
   - Memberikan pengingat atau informasi penting kepada pengguna langsung melalui browser mereka.

---

## Arsitektur Aplikasi

Healthy Life menggunakan arsitektur *3-Tier Client-Server*:
1. *Client Layer*:
   - Frontend dibangun menggunakan React dengan Next.js.
   - Artikel ditampilkan menggunakan dangerouslySetInnerHTML.

2. *Application Server Layer*:
   - Backend menggunakan PHP Native.
   - Form untuk artikel menggunakan TinyMCE editor.

3. *Database Server Layer*:
   - Menggunakan *MySQL* untuk menyimpan data pengguna, artikel, riwayat olahraga, dan target kalori.

---

## Teknologi yang Digunakan

- *Frontend*: React.js + Next.js
- *Backend*: PHP Native
- *Database*: MySQL
- *Hosting*: Windows Server
- *Notifikasi*: Firebase Cloud Messaging

---

## Instalasi dan Penggunaan

### 1. *Prasyarat*
   - Install PHP (versi minimal 7.4)
   - MySQL Database (contoh: XAMPP) yang sudah dikonfigurasi
   - Node.js untuk menjalankan frontend Next.js

### 2. *Clone Repository*
```bash
git clone https://github.com/username/healthy-life.git
cd healthy-life
```

### 3. *Import Database*
   - Buat database `healthy_life` di MySQL.
   - Import file `healthy_life (3).sql` ke dalam database tersebut.
   - Sesuaikan kredensial di `backend/connection.php` jika diperlukan.

### 4. *Jalankan Aplikasi*
   - Jalankan server PHP di direktori `backend` (contoh: XAMPP).
   - Pada root proyek, install dependensi dan jalankan frontend:
   ```bash
   npm install
   npm start
   ```
