<?php
// Tambahkan header CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Mengimpor koneksi database
include_once 'connection.php';

// Cek apakah request adalah POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Debug log data yang diterima
    error_log("Data diterima: " . print_r($data, true));

    if (
        isset($data['id_tracker']) &&
        isset($data['kalori_masuk']) &&
        isset($data['kalori_keluar']) &&
        isset($data['tanggal']) &&
        isset($data['id_pengguna']) // Validasi ID pengguna
    ) {
        $idTracker = $data['id_tracker'];
        $kaloriMasuk = $data['kalori_masuk'];
        $kaloriKeluar = $data['kalori_keluar'];
        $tanggal = $data['tanggal'];
        $idPengguna = $data['id_pengguna'];

        // Query untuk memasukkan data ke tabel tracker
        $sql = "INSERT INTO tracker (ID_TRACKER, KALORI_MASUK, KALORI_KELUAR, TANGGAL, ID_PENGGUNA) 
                VALUES (:id_tracker, :kalori_masuk, :kalori_keluar, TO_TIMESTAMP(:tanggal, 'YYYY-MM-DD HH24:MI:SS'), :id_pengguna)";

        $stmt = oci_parse($conn, $sql);
        oci_bind_by_name($stmt, ':id_tracker', $idTracker);
        oci_bind_by_name($stmt, ':kalori_masuk', $kaloriMasuk);
        oci_bind_by_name($stmt, ':kalori_keluar', $kaloriKeluar);
        oci_bind_by_name($stmt, ':tanggal', $tanggal);
        oci_bind_by_name($stmt, ':id_pengguna', $idPengguna);

        if (oci_execute($stmt)) {
            echo json_encode(["success" => true, "message" => "Data berhasil disimpan"]);
        } else {
            $error = oci_error($stmt);
            error_log("Error eksekusi query: " . print_r($error, true));
            echo json_encode(["success" => false, "message" => "Gagal menyimpan data", "error" => $error['message']]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Data tidak lengkap"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Metode HTTP tidak valid"]);
}
