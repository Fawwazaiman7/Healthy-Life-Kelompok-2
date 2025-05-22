<?php
// Konfigurasi koneksi database MySQL (XAMPP)
$host = 'localhost';
$user = 'root';
$password = ''; // Kosongkan jika default XAMPP
$database = 'healthy_life'; // Sesuaikan dengan nama DB kamu

// Membuat koneksi
$conn = new mysqli($host, $user, $password, $database);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Header CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
?>
