<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include_once 'connection.php';

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Koneksi database gagal']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// =================== GET ===================
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $stmt = $conn->prepare("SELECT * FROM data_olahraga WHERE id_olahraga = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $exercise = $result->fetch_assoc();

        if ($exercise) {
            echo json_encode(['success' => true, 'data' => $exercise]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Data tidak ditemukan']);
        }
    } else {
        $result = $conn->query("SELECT * FROM data_olahraga");
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $data]);
    }
    exit;
}

// =================== POST ===================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (empty($data['judul']) || empty($data['kalori_per_set']) || empty($data['estimasi_waktu'])) {
        echo json_encode(['success' => false, 'message' => 'Data tidak lengkap']);
        exit;
    }

    $stmt = $conn->prepare("SELECT COUNT(*) AS count FROM data_olahraga WHERE nama_olahraga = ?");
    $stmt->bind_param("s", $data['judul']);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    if ($count > 0) {
        echo json_encode(['success' => false, 'message' => 'Olahraga sudah ada']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO data_olahraga (nama_olahraga, kalori_per_set, estimasi_waktu, gambar, link_video, admin_id_admin) VALUES (?, ?, ?, ?, ?, 1)");
    $stmt->bind_param("sdsss", $data['judul'], $data['kalori_per_set'], $data['estimasi_waktu'], $data['gambar'], $data['link_video']);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Data berhasil ditambahkan']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menambahkan data']);
    }
    exit;
}

// =================== PUT ===================
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (empty($data['id']) || empty($data['judul']) || empty($data['kalori_per_set']) || empty($data['estimasi_waktu'])) {
        echo json_encode(['success' => false, 'message' => 'Data tidak lengkap']);
        exit;
    }

    $stmt = $conn->prepare("UPDATE data_olahraga SET nama_olahraga = ?, kalori_per_set = ?, estimasi_waktu = ?, gambar = ?, link_video = ? WHERE id_olahraga = ?");
    $stmt->bind_param("sdsssi", $data['judul'], $data['kalori_per_set'], $data['estimasi_waktu'], $data['gambar'], $data['link_video'], $data['id']);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Data berhasil diperbarui']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal memperbarui data']);
    }
    exit;
}

// =================== DELETE ===================
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? null;

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'ID tidak ditemukan']);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM data_olahraga WHERE id_olahraga = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Data berhasil dihapus']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menghapus data']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Metode HTTP tidak didukung']);
?>
