<?php
// Header CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

include_once 'connection.php';

// Helper untuk decode JSON aman
function safe_json_decode($data, $context) {
    if (is_string($data)) {
        $decoded = json_decode($data, true);
        if (json_last_error() === JSON_ERROR_NONE) {
            return $decoded;
        } else {
            error_log("JSON decode error ($context): " . json_last_error_msg());
        }
    }
    return null;
}

// Ambil semua data makanan
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $sql = "SELECT * FROM makanan WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
    } else {
        $sql = "SELECT * FROM makanan";
        $stmt = $conn->prepare($sql);
    }

    if (!$stmt->execute()) {
        echo json_encode(['success' => false, 'message' => 'Gagal mengambil data']);
        http_response_code(500);
        exit;
    }

    $result = $stmt->get_result();
    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = [
            'id' => $row['id'],
            'title' => $row['judul'],
            'calories' => $row['kalori'],
            'image' => $row['gambar'],
            'ingredients' => safe_json_decode($row['resep'], 'list ingredients'),
            'tutorial' => safe_json_decode($row['cara_pembuatan'], 'list tutorial')
        ];
    }

    echo json_encode($data);
    http_response_code(200);
    exit;
}

// Tambah makanan baru
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input || !isset($input['judul'], $input['kalori'], $input['gambar'], $input['resep'], $input['cara_pembuatan'])) {
        echo json_encode(['success' => false, 'message' => 'Data tidak lengkap']);
        http_response_code(400);
        exit;
    }

    $judul = $input['judul'];
    $kalori = $input['kalori'];
    $gambar = $input['gambar'];
    $resep = json_encode($input['resep']);
    $cara_pembuatan = json_encode($input['cara_pembuatan']);
    $admin_id = 1;

    $stmt = $conn->prepare("INSERT INTO makanan (judul, kalori, gambar, resep, cara_pembuatan, admin_id_admin)
                            VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sdsssi", $judul, $kalori, $gambar, $resep, $cara_pembuatan, $admin_id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Makanan berhasil ditambahkan']);
        http_response_code(201);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menambahkan makanan']);
        http_response_code(500);
    }
    exit;
}

// DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'] ?? null;

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'ID tidak ditemukan']);
        http_response_code(400);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM makanan WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Makanan berhasil dihapus']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menghapus makanan']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Metode tidak didukung']);
?>
