<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include_once 'connection.php';

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $stmt = $conn->prepare("SELECT * FROM artikel WHERE id_artikel = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $article = $result->fetch_assoc();

        if ($article) {
            echo json_encode(['success' => true, 'data' => $article]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Data tidak ditemukan']);
        }
    } else {
        $result = $conn->query("SELECT * FROM artikel");
        $articles = [];
        while ($row = $result->fetch_assoc()) {
            $articles[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $articles]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['judul']) || empty($data['konten'])) {
        echo json_encode(['success' => false, 'message' => 'Judul dan konten wajib diisi']);
        exit;
    }

    $judul = $data['judul'];
    $konten = $data['konten'];
    $gambar = $data['gambar'] ?? '';
    $admin_id = 1;

    $stmt = $conn->prepare("INSERT INTO artikel (judul, konten, gambar, admin_id_admin) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $judul, $konten, $gambar, $admin_id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Artikel berhasil ditambahkan']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menambahkan artikel']);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['id']) || empty($data['judul']) || empty($data['konten']) || empty($data['gambar'])) {
        echo json_encode(['success' => false, 'message' => 'Data tidak lengkap']);
        exit;
    }

    $stmt = $conn->prepare("UPDATE artikel SET judul = ?, konten = ?, gambar = ? WHERE id_artikel = ?");
    $stmt->bind_param("sssi", $data['judul'], $data['konten'], $data['gambar'], $data['id']);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Artikel berhasil diperbarui']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal memperbarui artikel']);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id_artikel'] ?? null;

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'ID artikel tidak diberikan']);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM artikel WHERE id_artikel = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Artikel berhasil dihapus']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menghapus artikel']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Metode HTTP tidak didukung']);
?>
