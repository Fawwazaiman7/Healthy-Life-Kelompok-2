<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

include_once 'connection.php';

function safeJsonDecode($data) {
    $decoded = json_decode($data, true);
    return (json_last_error() === JSON_ERROR_NONE) ? $decoded : [];
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id_pengguna = $_GET['id_pengguna'] ?? null;

    if ($id_pengguna) {
        $stmt = $conn->prepare("SELECT id_tracker, kalori_masuk, kalori_keluar, target_kalori, status_kalori, tanggal, makanan_tracker, olahraga_tracker FROM tracker WHERE id_pengguna = ? ORDER BY tanggal DESC");
        $stmt->bind_param("i", $id_pengguna);
        $stmt->execute();
        $result = $stmt->get_result();

        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = [
                "id_tracker" => $row['id_tracker'],
                "kalori_masuk" => $row['kalori_masuk'],
                "kalori_keluar" => $row['kalori_keluar'],
                "target_kalori" => $row['target_kalori'],
                "status_kalori" => $row['status_kalori'],
                "tanggal" => $row['tanggal'],
                "makanan_tracker" => safeJsonDecode($row['makanan_tracker']),
                "olahraga_tracker" => safeJsonDecode($row['olahraga_tracker'])
            ];
        }

        echo json_encode(["success" => true, "data" => $data], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["success" => false, "message" => "ID pengguna tidak disertakan"]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (
        isset($data['id_tracker']) &&
        isset($data['kalori_masuk']) &&
        isset($data['kalori_keluar']) &&
        isset($data['target_kalori']) &&
        isset($data['tanggal']) &&
        isset($data['id_pengguna']) &&
        isset($data['status_kalori'])
    ) {
        $stmt = $conn->prepare("INSERT INTO tracker (id_tracker, kalori_masuk, kalori_keluar, target_kalori, status_kalori, tanggal, id_pengguna, makanan_tracker, olahraga_tracker)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $makananTracker = json_encode($data['makanan_tracker'] ?? []);
        $olahragaTracker = json_encode($data['olahraga_tracker'] ?? []);
        $stmt->bind_param(
            "siiississ",
            $data['id_tracker'],
            $data['kalori_masuk'],
            $data['kalori_keluar'],
            $data['target_kalori'],
            $data['status_kalori'],
            $data['tanggal'],
            $data['id_pengguna'],
            $makananTracker,
            $olahragaTracker
        );

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Data berhasil disimpan"]);
        } else {
            echo json_encode(["success" => false, "message" => "Gagal menyimpan data"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Data tidak lengkap"]);
    }
}
?>
