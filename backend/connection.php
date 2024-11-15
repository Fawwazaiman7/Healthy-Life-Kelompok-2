<?php
// Konfigurasi database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "healthy_life";

// Membuat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
