<?php
// Tambahkan header CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

// Mengimpor koneksi database
include_once 'connection.php';

// Fungsi untuk debugging JSON
function safeJsonDecode($data)
{
    $decoded = json_decode($data, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        error_log("JSON Decode Error: " . json_last_error_msg());
        return [];
    }
    return $decoded;
}

// Cek apakah request adalah GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id_pengguna = isset($_GET['id_pengguna']) ? $_GET['id_pengguna'] : null;

    if ($id_pengguna) {
        error_log("ID Pengguna diterima: " . $id_pengguna);

        $sql = "SELECT ID_TRACKER, KALORI_MASUK, KALORI_KELUAR, TARGET_KALORI, STATUS_KALORI, TO_CHAR(TANGGAL, 'YYYY-MM-DD HH24:MI:SS') AS TANGGAL, MAKANAN_TRACKER, OLAHRAGA_TRACKER 
        FROM tracker WHERE ID_PENGGUNA = :id_pengguna ORDER BY TANGGAL DESC";

        $stmt = oci_parse($conn, $sql);
        oci_bind_by_name($stmt, ':id_pengguna', $id_pengguna);
        oci_execute($stmt);

        $results = [];
        while ($row = oci_fetch_assoc($stmt)) {
            $results[] = [
                "id_tracker" => $row['ID_TRACKER'],
                "kalori_masuk" => $row['KALORI_MASUK'],
                "kalori_keluar" => $row['KALORI_KELUAR'],
                "target_kalori" => $row['TARGET_KALORI'],
                "status_kalori" => $row['STATUS_KALORI'],
                "tanggal" => $row['TANGGAL'],
                "makanan_tracker" => safeJsonDecode($row['MAKANAN_TRACKER']),
                "olahraga_tracker" => safeJsonDecode($row['OLAHRAGA_TRACKER'])
            ];
        }
        echo json_encode(["success" => true, "data" => $results], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["success" => false, "message" => "ID pengguna tidak disertakan"]);
    }
}

// Cek apakah request adalah POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    error_log("Data diterima: " . print_r($data, true));

    if (
        isset($data['id_tracker']) &&
        isset($data['kalori_masuk']) &&
        isset($data['kalori_keluar']) &&
        isset($data['target_kalori']) &&
        isset($data['tanggal']) &&
        isset($data['id_pengguna']) &&
        isset($data['status_kalori'])
    ) {
        $idTracker = $data['id_tracker'];
        $kaloriMasuk = $data['kalori_masuk'];
        $kaloriKeluar = $data['kalori_keluar'];
        $targetKalori = $data['target_kalori'];
        $tanggal = $data['tanggal'];
        $idPengguna = $data['id_pengguna'];
        $statusKalori = $data['status_kalori']; // Status kalori
        $makananTracker = json_encode($data['makanan_tracker'] ?? []);
        $olahragaTracker = json_encode($data['olahraga_tracker'] ?? []);

        $sql = "INSERT INTO tracker (
                    ID_TRACKER, 
                    KALORI_MASUK, 
                    KALORI_KELUAR, 
                    TARGET_KALORI, 
                    STATUS_KALORI, 
                    TANGGAL, 
                    ID_PENGGUNA, 
                    MAKANAN_TRACKER, 
                    OLAHRAGA_TRACKER
                ) VALUES (
                    :id_tracker, 
                    :kalori_masuk, 
                    :kalori_keluar, 
                    :target_kalori, 
                    :status_kalori, 
                    TO_TIMESTAMP(:tanggal, 'YYYY-MM-DD HH24:MI:SS'), 
                    :id_pengguna, 
                    :makanan_tracker, 
                    :olahraga_tracker
                )";
        $stmt = oci_parse($conn, $sql);

        oci_bind_by_name($stmt, ':id_tracker', $idTracker);
        oci_bind_by_name($stmt, ':kalori_masuk', $kaloriMasuk);
        oci_bind_by_name($stmt, ':kalori_keluar', $kaloriKeluar);
        oci_bind_by_name($stmt, ':target_kalori', $targetKalori);
        oci_bind_by_name($stmt, ':status_kalori', $statusKalori); // Bind status kalori
        oci_bind_by_name($stmt, ':tanggal', $tanggal);
        oci_bind_by_name($stmt, ':id_pengguna', $idPengguna);
        oci_bind_by_name($stmt, ':makanan_tracker', $makananTracker);
        oci_bind_by_name($stmt, ':olahraga_tracker', $olahragaTracker);

        if (oci_execute($stmt)) {
            echo json_encode(["success" => true, "message" => "Data berhasil disimpan"]);
        } else {
            $error = oci_error($stmt);
            echo json_encode(["success" => false, "message" => $error['message']]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Data tidak lengkap"]);
    }
}
